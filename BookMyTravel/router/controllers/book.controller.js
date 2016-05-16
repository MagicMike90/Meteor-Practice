BookingController = RouteController.extend({
  path: '/book/:_id',
  template: 'bookTravel',
  layoutTemplate: "createTravelLayout",
  waitOn: function() {
      Meteor.subscribe("BlockedSeats", this.params._id);
      Meteor.subscribe("Reservations", this.params._id);
  },
  data: function() {
      templateData = {
          _id: this.params._id,
          bus: BusServices.findOne({
              _id: this.params._id
          }),
          reservations: Reservations.find({
              bus: this.params._id
          }).fetch(),
          blockedSeats: BlockedSeats.find({
              bus: this.params._id
          }).fetch()
      };
      return templateData;
  }
});
