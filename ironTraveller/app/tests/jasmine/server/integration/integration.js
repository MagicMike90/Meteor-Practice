'use strict';
describe("Serverside integration testing", function() {
  describe("on collection definition", function() {
    it("Busservices collection instance must be defined",
      function() {
        expect(Busservice).not.toBeUndefined();
      });
  });
});
