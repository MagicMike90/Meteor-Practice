/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
    createBusService: function(busService) {
        busService.createdAt = new Date();
        busService.available_seats = busService.seats;
        check(busService, BusServiceSchema);
        Busservice.insert(busService);
    },
    bookMySeats: function(reservations) {
        var insertRes = reservations.map(function(res) {
            return {
                seat: res.seat
            }
        });
        return Reservations.insert({
            bus: reservations[0].bus,
            seats_booked: insertRes
        }, function(error, result) {
            if (result) {
                Busservice.update({
                    _id: reservations[0].bus
                }, {
                    $inc: {
                        available_seats: -insertRes.length
                    }
                }, function() {});
            }
        });
    },
    blockThisSeat: function(seat) {
        debugger;
        BlockedSeats.insert(seat, function(error, result) {
            console.log(error);
            if (error) {
                throw Meteor.Error("Block seat failed");
            } else {
                Meteor.setTimeout(function() {
                    BlockedSeats.remove({
                        _id: result
                    });
                }, 600000); // 10 mins
            }
        });
    },
    unblockTheseSeats: function(seats) {
        seats.forEach(function(seat) {
            BlockedSeats.remove({
                _id: seat._id
            });
        });
    },
    removeAllBusservice: function() {
        Busservice.remove({});
    }

});
