import { Meteor } from 'meteor/meteor';

import '../imports/api/categories.js';
import '../imports/api/items.js';
import { Orders } from '../imports/api/orders.js';

Meteor.startup(() => {
  // code to run on server at startup

  Meteor.methods({
    'createPasswordlessUser'(username) {
      return Accounts.createUser({
        username: username
      });
    },
    'removeUser'(_id) {
      return Meteor.users.remove(_id);
    },
    'updateOrder'(_id, status) {
      return Orders.update(_id, {$set: {status: status} });
    },
    'deleteOrder'(_id) {
      return Orders.remove(_id);
    }
  })
});
