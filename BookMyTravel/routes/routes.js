// Router.configure({
//     notFoundTemplate: "notFound", //template with name notFound
//     loadingTemplate: "loading" //template with name loading
// });
// Router.onBeforeAction('loading'); //before every action call show loading template
//
//
// Router.route('/', {
//     name: 'home'
// });
// Router.route('createTravel', {
//     path: '/create-travel',
//     template: 'createTravel',
//     layoutTemplate: "createTravelLayout"
// });
// Router.route('book', {
//     path: '/book/:_id',
//     template: 'bookTravel',
//     layoutTemplate: "createTravelLayout",
//     waitOn: function() {
//         Meteor.subscribe("BlockedSeats", this.params._id);
//         Meteor.subscribe("Reservations", this.params._id);
//     },
//     data: function() {
//         templateData = {
//             _id: this.params._id,
//             bus: BusServices.findOne({
//                 _id: this.params._id
//             }),
//             reservations: Reservations.find({
//                 bus: this.params._id
//             }).fetch(),
//             blockedSeats: BlockedSeats.find({
//                 bus: this.params._id
//             }).fetch()
//         };
//         return templateData;
//     }
// });
