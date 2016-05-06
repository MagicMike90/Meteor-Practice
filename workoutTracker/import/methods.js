// Creating a method follows the scheme of helpers: a method function that takes a key-value object as a parameter.
import {check} from "meteor/check";
Meteor.methods({
    // The key of the object is the name of the method.
    'CreateWorkout': function(data) {
        // Use check to make sure that only data is used in a method that you allow.
        check(data, {
            distance: Number
        });

        var distance = data.distance;
        if (distance <= 0 || distance > 45|| !distance) {
            // If the validation fails, throw a new Meteor.Error. It’s like a normal JavaScript error but is automatically populated to the client.
            throw new Meteor.Error('Invalid distance');
        }

        // The userId of the currently logged-in user is accessed via this in a method.
        if (!this.userId) {
            throw new Meteor.Error('You have to login');
        }

        data.workoutAt = new Date();
        data.type = 'jogging';
        data.userId = this.userId;

        return WorkoutsCollection.insert(data);
    }
});
