import {
  Meteor
} from 'meteor/meteor';

import {
  Products
} from '../imports/products.js'

Meteor.startup(() => {
  // code to run on server at startup
  Products.remove({});

  // fill the database with some products
  Products.insert({
    name: 'Milk',
    img: '/milk.png',
    place: 'fridge'
  });

  Products.insert({
    name: 'Juice',
    img: '/juice.png',
    place: 'fridge'
  });

  Products.insert({
    name: 'Bread',
    img: '/bread.png',
    place: 'supermarket'
  });

  Products.insert({
    name: 'Banana',
    img: '/banana.png',
    place: 'supermarket'
  });
});
