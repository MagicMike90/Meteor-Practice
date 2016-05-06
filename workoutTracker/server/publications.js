import {
    check
} from 'meteor/check';

Meteor.publish('workouts', function(options) {
    //  Make sure limit and sorting  is a number, not an arbitrary mongo selector object.
    check(options, {
        limit: Number,
        sorting: Number
    });
    // Query for all workouts that belong to the currently logged-in user
    var qry = {
        userId: this.userId
    };
    var qryOptions = {
        limit: options.limit,
        sort: {
            workoutAt: options.sorting
        }
    }

    return WorkoutsCollection.find(qry, qryOptions);
});

Meteor.publish('distanceByMonth', function() {
    var subscription = this;
    var initiated = false;
    //This object keeps track of all distances for each month.
    var distances = {};

    var userId = this.userId;
    // Because there’s no official support for aggregation from Meteor, use the core Mongo driver.
    var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

    // The aggregation settings create documents with the _id field equal to the month of the workoutAt field and the sum of all distances of this month.
    var pipeline = [{
        $match: {
            // The aggregation should only be done over documents that match the userId
            userId: userId
        }
    }, {
        $group: {
            _id: {
                $month: '$workoutAt'
            },
            distance: {
                $sum: '$distance'
            }
        }
    }];

    db.collection('workouts').aggregate(
        pipeline,
        // Because you can’t use asynchronous code in a publication, use Meteor.bindEnvironment.
        Meteor.bindEnvironment(
            function(err, result) {
                console.log('result', result);
                _.each(result, function(r) {
                    distances[r._id] = r.distance;
                    subscription.added('distanceByMonth', r._id, {
                        distance: r.distance
                    });
                })
            }
        )
    )

    var workoutHandle = WorkoutsCollection
        .find({
            // In this publication there should be only the documents with the logged-in userId observed.
            userId: userId
        })
        .observeChanges({
            added: function(id, fields) {
                if (!initiated) return;

                // Create the ID of the document. The +1 comes from the month starting at index 0
                idByMonth = new Date(fields.workoutAt).getMonth() + 1;

                // Update the distance for the month since a new workout was added
                distances[idByMonth] += fields.distance;

                //Inform the client that the subscription was changed.
                subscription.changed('distanceByMonth',
                    idByMonth, {
                        distance: distances[idByMonth]
                    }
                )
            }
        });

    initiated = true;
    // The subscription (or this) has an onStop callback that’s fired whenever the client subscription is closed.
    subscription.onStop(function() {
        // The handle that’s returned from the observerChanges() function is used to stop observing.
        workoutHandle.stop();
    });
    subscription.ready();
});
