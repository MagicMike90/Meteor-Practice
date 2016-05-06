import {
    Template
} from 'meteor/templating';


Session.setDefault('limit', 10);
Session.setDefault('sorting', -1);
DistanceByMonth = new Mongo.Collection('distanceByMonth');

// Subscriptions
Tracker.autorun(function(computation) {
    Meteor.subscribe('workouts', {
        limit: Session.get('limit'),
        sorting: Session.get('sorting')
    });
    Meteor.subscribe('distanceByMonth');
});

Template.workoutList.helpers({
    sortLabel: function() {
        switch (Session.get('sorting')) {
            case -1:
                return 'Showing newest first';
            case 1:
                return 'Showing oldest first';
            default:
                return 'unknown sort order'
        }
    },
    workouts: function() {
        return WorkoutsCollection.find({}, {
            sort: {
                workoutAt: Session.get('sorting')
            }
        });
    }
});

Template.workoutList.events({
    'click button.show-more': function(evt, tpl) {
        var newLimit = Session.get('limit') + 10;

        Session.set('limit', newLimit);
    },
    'click button.sort-order': function(evt, tpl) {
        (Session.get('sorting') === -1) ? Session.set('sorting', 1): Session.set('sorting', -1);

    }
});

monthLabels = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};

Template.distanceByMonth.helpers({
    month: function() {
        return DistanceByMonth.find({}, {
            sort: {
                // -1 or 1 to sort all documents in ascending or descending order
                _id: 1
            }
        });
    },
    translateMonth: function() {
        return monthLabels[this._id];
    }
});

Template.addWorkout.events({
    // Listen to the submit form event as usual.
    'submit form': function(evt, tpl) {
        // The default behavior of a form submit should be prevented because it would reload the page.
        evt.preventDefault();

        // Use jQuery to extract the data from the distance input field and make it an integer.
        var distance = parseInt(tpl.$('input[name="distance"]').val());

        // The method is called by its name and additional parameters.
        Meteor.call('CreateWorkout', {
            distance: distance
        }, function(error, result) {
            // The method has a callback that’s called if an error happens or a result was returned from the server.
            if (error) return alert('Error: ' + error.error);
        });
    }
});
