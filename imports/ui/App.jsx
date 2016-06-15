import React, { Component } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

_App = React.createClass({

  render() {
    return (
      <div className="container">
        <Link to="/">
          <h1 className="ui top attached header">
            Fugegruppen ApS
          </h1>
        </Link>
        <div className="ui attached three item menu">
          <Link to="/categories" activeClassName="active" className="item">Kategorier</Link>
          <Link to="/orders" activeClassName="active" className="item">Ordrer</Link>
          <Link to="/users" activeClassName="active" className="item">Montører</Link>
        </div>
        <div className="ui segment">
          {this.props.children}
        </div>
      </div>
    );
  }
});


_App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default App = createContainer(() => {
  return {
    users: Meteor.users.find({}).fetch(),
    currentUser: Meteor.user()
  }
}, _App);
