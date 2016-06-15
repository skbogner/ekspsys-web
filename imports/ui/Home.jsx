import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

Home = React.createClass({
  render() {
    return (
      <div>
        <h3 class="ui header">Welcome</h3>
      </div>
    );
  }
});

export default createContainer(({ params }) => {
  return {
  };
}, Home);
