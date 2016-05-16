/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
    'server/method_name': function() {
        // server method logic
    },
    createBusService: function(busService) {
        busService.createdAt = new Date();
        busService.available_seats = parseInt(busService.seats, 10);
        //validates the form data against the schema in the server side
        check(busService, BusServiceSchema);
        Busservice.insert(busService);
    }
});
