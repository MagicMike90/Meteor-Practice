Meteor.subscribe("BusServices");
var busServicesList = new ReactiveVar([]);
Template.home.onCreated(function() {
    busServicesList.set(BusServices.find({}));
});
Template.home.helpers({
    list: function() {
        return busServicesList.get();
    },
    hasItem: function() {
        return busServicesList.get().count();
    },
    humanReadableDate: function(date) {
        var m = moment(date);
        return m.format("MMM,DD YYYY HH:mm");
    }
});

Template.travelSearch.events({
    //Useful for implementing behavior that should only happen after the input has stopped arriving
    "keyup input": _.debounce(function(e) {
        var source = $("[name='startpoint']").val().trim(),
            destination = $("[name='endpoint']").val().trim(),
            date = $("[name='startdate']").val().trim(),
            fare = $("[name='fare']").val().trim(),
            search = {};

				//Provides regular expression capabilities for pattern matching strings in queries.
				//option "i" stands for case sensitive
        if (source) search.source = {
            $regex: new RegExp(source),
            $options: "i"
        };
        if (destination) search.destination = {
            $regex: new RegExp(destination),
            $options: "i"
        };
        if (date) {
            var userDate = new Date(date);
            search.startDateTime = {
                $gte: userDate,
                $lte: new Date(moment(userDate).add(1, "day").unix() * 1000)
            }
        }
        if (fare) search.fare = {
            $lte: fare
        };
        busServicesList.set(BusServices.find(search, {
            sort: {
                createdAt: -1
            }
        }));
    }, 200)
});
