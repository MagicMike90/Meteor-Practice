describe("Client template testing", function() {
  beforeEach(function() {
    Meteor.call("removeAllBusservice");
  });
  describe("Templates", function() {
    it("Home must be having bus-list division", function() {
      var div = document.createElement("DIV");
      var comp = UI.render(Template.Home, div);
      expect($(div).find(".bus-list").length).toBe(1);
    });
  });
  it("should show one row in the listing page", function(done) {
    Meteor.call("createBusService", {
      name: "Test",
      agency: "Testing agency",
      seats: 30,
      source: "Bombay",
      destination: "Kolkata",
      startDateTime: moment().add(1, "days").toDate(),
      endDateTime: moment().add(2, "days").toDate(),
      fare: 1200
    }, function() {
      expect($(".bus-list__body .bus-list__row").length).toBe(1);
      done();
    });
  });
  it("List template should have rows equal to docs in busservice collection ", function(done) {
    Meteor.autorun(function() {
      if (DDP._allSubscriptionsReady()) {
        done();
        var div = document.createElement("DIV");
        var comp = UI.render(Template.Home, div);
        expect($(div).find($(".bus-list__body .bus-list__row ")).length).toBe(Busservice.find().count());
      }
    });
  });
});
