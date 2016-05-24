/*****************************************************************************/
/* BusServiceList: Event Handlers */
/*****************************************************************************/
Template.BusServiceList.events({});

/*****************************************************************************/
/* BusServiceList: Helpers */
/*****************************************************************************/
Template.BusServiceList.helpers({
    list: function() {
        Meteor.subscribe('busservice');
        return Busservice.find();
    },
    hasItem: function() {
        Meteor.subscribe('busservice');
        return Busservice.find().count();
    },
    humanReadableDate: function(date) {
        var m = moment(date);
        return m.format("MMM,DD YYYY HH:mm");
    }
});

/*****************************************************************************/
/* BusServiceList: Lifecycle Hooks */
/*****************************************************************************/
Template.BusServiceList.onCreated(function() {});

Template.BusServiceList.onRendered(function() {});

Template.BusServiceList.onDestroyed(function() {});
