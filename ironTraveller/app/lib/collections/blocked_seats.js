BlockedSeats = new Mongo.Collection('blocked_seats');
BlockedSeats.attachSchema(
  new SimpleSchema({
    bus: {
      type: String,
      label: "Bus",
      max: 200
    },
    seat: {
      type: Number,
      label: "Blocked Seat"
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
  BlockedSeats.allow({
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

  BlockedSeats.deny({
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
