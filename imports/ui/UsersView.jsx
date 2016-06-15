import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

UsersView = React.createClass({
  addUser() {
    var username = $('#new-user-text').val();

    if (username !== '' && username.length !== 0) {
      console.log(username);
      Meteor.call('createPasswordlessUser', username, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    }
  },

  removeUser(_id) {
    Meteor.call('removeUser', _id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  },

  render() {
    var that = this;
    return (
      <div>
        <div className="ui form">
          <div className="inline fields">
            <div className="inline field">
              <label>Ny montør</label>
              <input type="text" id="new-user-text" placeholder="Brugernavn"></input>
            </div>
            <button className="ui positive button" onClick={this.addUser}>
              Tilføj
            </button>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr><th>Brugernavn</th>
            <th>-</th></tr>
          </thead>
          <tbody>
            {this.props.users.map(function(user) {
              return (
                <tr key={user._id}>
                  <td>
                    {user.username}
                  </td>
                  <td>
                    <button className="ui negative button" onClick={that.removeUser.bind(that, user._id)}>Fjern</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
});

UsersView.propTypes = {
  categories: React.PropTypes.array
};

export default createContainer(({ params }) => {
  return {
    users: Meteor.users.find({}).fetch()
  };
}, UsersView);
