describe("CreateBusService", function() {
  'use strict';
  beforeEach(function() {

    //   MeteorJS doesn't allow you to remove all the documents of a collection from the browser console or the client code.
    Meteor.call("removeAllBusservice");
  });
  it("should fail insertion if source and destination are same",
    function() {
      Meteor.call("createBusService", {
        name: "2Test",
        agency: "Testing agency2",
        seats: 30,
        source: "Bombay",
        destination: "Bombay",
        startDateTime: moment().add(1, "days").toDate(),
        endDateTime: moment().add(2, "days").toDate(),
        fare: 1200
      });
      expect(Busservice.find().count()).toBe(0);
    });
  it("should fail insertion if seats are more than 50", function() {
    Meteor.call("createBusService", {
      name: "2Test",
      agency: "Testing agency2",
      seats: 90,
      source: "Bombay",
      destination: "Chennai",
      startDateTime: moment().add(1, "days").toDate(),
      endDateTime: moment().add(2, "days").toDate(),
      fare: 1200
    });
    expect(Busservice.find().count()).toBe(0);
  });
  it("should create a record in the database", function() {
    Meteor.call("createBusService", {
      name: "Test",
      agency: "Testing agency",
      seats: 30,
      source: "Bombay",
      destination: "Kolkata",
      startDateTime: moment().add(1, "days").toDate(),
      endDateTime: moment().add(2, "days").toDate(),
      fare: 1200
    });
    expect(Busservice.find().count()).toBe(0);
  });
  
  describe("Creating a service", function() {
    it("A new service must be created using server method createBusService ", function() {
      spyOn(Busservice, "insert").and.returnValue(1);
      var service = {
        name: "2Test",
        agency: "Testing agency2",
        seats: 30,
        source: "Delhi",
        destination: "Bombay",
        startDateTime: moment().add(1, "days").toDate(),
        endDateTime: moment().add(2, "days").toDate(),
        fare: 1200
      };
      Meteor.methodMap.createBusService(service);
      expect(Busservice.insert).toHaveBeenCalledWith(service);
    });
  });
});
