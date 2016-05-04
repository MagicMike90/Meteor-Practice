import {
    Template
} from 'meteor/templating';

import './main.html';



LocalHouse = new Mongo.Collection(null);
var newHouse = {
    name: '',
    plants: [],
    lastsave: 'never',
    status: 'unsaved'
};
Session.setDefault('selectedHouseId', '');

Tracker.autorun(function() {
    console.log("The selectedHouse ID is: " +
        Session.get("selectedHouseId")
    );
});


//global helpers
Template.registerHelper('selectedHouse', function() {
    return LocalHouse.findOne(Session.get('selectedHouseId'));
});





Template.selectHouse.helpers({
    housesNameId: function() {
        return HousesCollection.find({});
    },
    isSelected: function() {
        return Session.equals('selectedHouseId', this._id) ? 'selected' : '';
    }
});
Template.selectHouse.events = ({
    'change #selectHouse': function(evt) {
        Session.set('selectedHouseId', evt.currentTarget.value);
    }
});


Template.showHouse.helpers({
    house: function() {
        return HousesCollection.findOne({
            _id: Session.get("selectedHouseId")
        });
    }
}); << << << < HEAD
    === === =

    >>> >>> > c787f5e9dcc0a2168d206bc05fbee65607dfa9fd
Template.showHouse.events({
    'click button#delete': function(evt) {
        var id = this._id;
        var deleteConfirmation = confirm('Really delete this house?');
        if (deleteConfirmation) {
            HousesCollection.remove(id);
        }
    }
}); << << << < HEAD

    === === = >>> >>> > c787f5e9dcc0a2168d206bc05fbee65607dfa9fd

Template.plantDetails.events({
    'click button.water': function(evt) {
        var plantId = $(evt.currentTarget).attr('data-id');
        Session.set(plantId, true);
        var lastvisit = new Date();
        HousesCollection.update({
            _id: Session.get('selectedHouseId')
        }, {
            $set: {
                lastvisit: lastvisit
            }
        });
    }
}); << << << < HEAD

Template.houseForm.events({
            'click button#saveHouse': function(evt) {
                    evt.preventDefault();
                    var houseName = $('input[id=house-name]').val();
                    var plantColor = $('input[id=plant-color]').val();
                    var plantInstructions = $('input[id=plant-instructions]').val();
                    Session.set('selectedHouseId', HousesCollection.insert({
                        name: houseName,
                        plants: [{
                            color: plantColor,
                            instructions: plantInstructions
                        }]
                    }));
                    //empty the form
                    $('input').val('');
                } === === =
                Template.houseForm.events({
                    'click button#saveHouse': function(evt) {
                        evt.preventDefault();
                        var houseName = $('input[id=house-name]').val();
                        var plantColor = $('input[id=plant-color]').val();
                        var plantInstructions = $('input[id=plant-instructions]').val();
                        Session.set('selectedHouseId', HousesCollection.insert({
                            name: houseName,
                            plants: [{
                                color: plantColor,
                                instructions: plantInstructions
                            }]
                        }));
                        // empty the form
                        $('input').val('');
                    } >>> >>> > c787f5e9dcc0a2168d206bc05fbee65607dfa9fd
                });
