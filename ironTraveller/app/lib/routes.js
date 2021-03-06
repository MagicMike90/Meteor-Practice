Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('create_travel', {
  name: 'createTravel',
  controller: 'CreateTravelController',
  where: 'client'
});

Router.route('book/:_id', {
  name: 'book',
  controller: 'BookController',
  where: 'client'
});
