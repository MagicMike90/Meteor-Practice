HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
  	this.subscribe("busservice", {});
  },

  data: function() {
  	this.ReactiveBusServices.set(Busservice.find({}));
  	return this.ReactiveBusServices;
  },

  action: function() {
    this.render('Home');
    this.render('Search', {to: 'search'});
    this.ReactiveBusServices = new ReactiveVar([]);
  }
});
