HomeController = RouteController.extend({
  template: 'home',
  layoutTemplate: "homeLayout",
  yieldTemplates: {
      'travelSearch': {
          to: "search"
      }
  }
});
