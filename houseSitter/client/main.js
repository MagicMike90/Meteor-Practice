import {
    Template
} from 'meteor/templating';

import './main.html';


Tracker.autorun(function() {
    console.log("The selectedHouse ID is: " +
        Session.get("selectedHouseId")
    );
});

Template.selectHouse.helpers({
    housesNameId: function() {
        return HousesCollection.find({});
    },
    isSelected: function() {
        return Session.equals('selectedHouseId', this._id) ? 'selected' : '';
    }
});
Template.selectHouse.events = {
    'change #selectHouse': function(evt) {
        Session.set('selectedHouseId', evt.currentTarget.value);
    }
};


Template.showHouse.helpers({
    house: function() {
        return HousesCollection.findOne({
            _id: Session.get("selectedHouseId")
        });
    }
});



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
});
