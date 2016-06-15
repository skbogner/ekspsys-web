import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Categories } from '../api/categories.js';
import { Items } from '../api/items.js';

CategoryView = React.createClass({
  removeItem(_id) {
    Items.remove({_id: _id});
  },

  render() {
    if (!this.props.category || !this.props.items) {
      return (
        <div className="ui loading segment">
        </div>
      );
    } else {
      var cat = this.props.category;
      var items = this.props.items;
      var that = this;
      return (
        <div>
          <h3 className="ui header">
            {cat.name}
          </h3>
          <Link to={"/categories"}>
            <div className="ui button small">
              Tilbage
            </div>
          </Link>
          <Link to={"/category/" + cat._id + "/new-item"}>
            <div className="ui small button positive">
              Tilføj ny
            </div>
          </Link>
          <table className="ui fixed table">
            <thead>
              <tr><th>Dansk</th>
              <th>Engelsk</th>
              <th>Polsk</th>
              <th></th></tr>
            </thead>
            <tbody>
              {items.map(function(item) {
                return (
                  <tr key={item._id}>
                    <td>
                      {item.names["da"]}
                    </td>
                    <td>
                      {item.names["en"]}
                    </td>
                    <td>
                      {item.names["pl"]}
                    </td>
                    <td>
                        <div className="ui small right floated red button" onClick={that.removeItem.bind(that, item._id)}>Fjern</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
});

CategoryView.propTypes = {
  category: React.PropTypes.object,
  items: React.PropTypes.array
};

export default createContainer(({ params }) => {
  //var handle = Meteor.subscribe('category', params._id);
  return {
    category: Categories.findOne(params._id),
    items: Items.find({category: params._id}).fetch()
  };
}, CategoryView);
