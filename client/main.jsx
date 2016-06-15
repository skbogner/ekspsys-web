import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import CategoriesView from '../imports/ui/CategoriesView.jsx';
import CategoryView from '../imports/ui/CategoryView.jsx';
import NewItemView from '../imports/ui/NewItemView.jsx';
import OrdersView from '../imports/ui/OrdersView.jsx';
import UsersView from '../imports/ui/UsersView.jsx';

Meteor.startup(function(){
  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        {/* categories */}
        <Route path="categories" component={CategoriesView} />
        <Route path="category/:_id" component={CategoryView} />
        <Route path="category/:_id/new-item" component={NewItemView} />
        {/* orders */}
        <Route path="orders" component={OrdersView} />
        {/* users */}
        <Route path="users" component={UsersView} />
      </Route>
    </Router>,
    document.getElementById('render-target'));
});
