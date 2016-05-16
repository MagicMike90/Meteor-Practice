SimpleSchema.messages({
  source_destination_same: "[label] cannot be same as Starting point",
  destination_source_same: "[label] cannot be same as Destination point",
  endDateTime_lessthan_startDateTime: "[label] cannot be past to Arrival date",
  startDateTime_lessthan_endDateTime: "[label] cannot be past to Departure date"
});
Busservice = new Mongo.Collection('busservice');


if (Meteor.isServer) {
  Busservice.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Busservice.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
