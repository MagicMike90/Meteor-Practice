import {
    check
} from 'meteor/check';

Meteor.publish('profiles', function() {
    profiles = Meteor.wrapAsync(function(cb) {
        Meteor.setTimeout(function() {
          // Here the actual query to the MongoDB happens and the result is stored in the profiles variable.
            cb(null, ProfilesCollection.find({}, {
                limit: 10
            }));
        }, 1000);
    })();

    return profiles;
});

Meteor.publish('profile', function(_id) {
    check(_id, String);
    return ProfilesCollection.find({
        _id: _id
    });
});
