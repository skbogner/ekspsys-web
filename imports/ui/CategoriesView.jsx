import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Categories } from '../api/categories.js';

CategoriesView = React.createClass({
  render() {
    return (
      <div className="ui grid">
        {this.props.categories.map(function(cat) {
          linkTo = "/category/" + cat._id;
          return (
            <div className="ui eight wide column" key={cat._id}>
              <Link to={linkTo}>
                <div className="ui blue segment">
                  {cat.name}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    );
  }
});

CategoriesView.propTypes = {
  categories: React.PropTypes.array
};

export default createContainer(({ params }) => {
  return {
    categories: Categories.find({}).fetch()
  };
}, CategoriesView);
