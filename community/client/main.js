import {
    Template
} from 'meteor/templating';

import './main.html';

Template.registerHelper("isActiveRoute", function(routeName) {
    if (Router.current().route.getName() === routeName) {
        return 'active';
    }
});
