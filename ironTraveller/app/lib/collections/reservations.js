Reservations = new Mongo.Collection('reservations');
Reservations.attachSchema(
  new SimpleSchema({
    bus: {
      type: String,
      label: "Bus",
      max: 200
    },
    seats_booked: {
      type: [Object],
      label: "Seats Booked",
      minCount: 1,
      maxCount: 10
    },
    "seats_booked.$.seat": {
      type: Number,
      optional: false
    },
    createdAt: {
      type: Date,
      label: "Created At",
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        }
      }
    },
    updatedAt: {
      type: Date,
      label: "Updated At",
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    },
    createdBy: {
      type: String,
      optional: true,
      autoValue: function() {
        return this.userId
      }
    }
  })
);

if (Meteor.isServer) {
  Reservations.allow({
    insert: function(userId, doc) {
      return false;
    },

    update: function(userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function(userId, doc) {
      return false;
    }
  });

  Reservations.deny({
    insert: function(userId, doc) {
      return true;
    },

    update: function(userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function(userId, doc) {
      return true;
    }
  });
}
