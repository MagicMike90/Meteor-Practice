/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */
Meteor.publish('busservice', function(query) {
    query = query || {};
    return Busservice.find({}, {
        sort: {
            createdAt: -1
        }
    });
});

Meteor.publish('reservations', function(query) {
    query = query || {};
    return Reservations.find(query)
});

Meteor.publish('blocked_seats', function(query) {
    query = query || {};
    return BlockedSeats.find(query);
});
