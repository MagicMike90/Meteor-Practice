/*****************************************************************************/
/* Search: Event Handlers */
/*****************************************************************************/
Template.Search.events({
    "keyup input": _.throttle(function(e) {
        var source = $("[name='source']").val().trim(),
            destination = $("[name='destination']").val().trim(),
            date = $("[name='startDateTime']").val().trim(),
            fare = $("[name='fare']").val().trim(),
            search = {};
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
            $lte: parseInt(fare, 10)
        };
        if (Template.instance()) {
            Template.instance().data.set(Busservice.find(search, {
                sort: {
                    createdAt: -1
                }
            }));
        }
    }, 200),
    "submit": function(e) {
        e.preventDefault();
    }
});

/*****************************************************************************/
/* Search: Helpers */
/*****************************************************************************/
Template.Search.helpers({});

/*****************************************************************************/
/* Search: Lifecycle Hooks */
/*****************************************************************************/
Template.Search.onCreated(function() {});

Template.Search.onRendered(function() {});

Template.Search.onDestroyed(function() {});
