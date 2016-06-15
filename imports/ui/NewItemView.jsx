import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Categories } from '../api/categories.js';
import { Items } from '../api/items.js';

NewItemView = React.createClass({

  addItem(item) {
    var name_da = $("#new-item-name-da").val();
    var name_en = $("#new-item-name-en").val();
    var name_pl = $("#new-item-name-pl").val();
    if (name_da == '' || name_en == '' || name_pl == '') {
      return;
    }
    var item = {names: {"da": name_da, "en": name_en, "pl": name_pl}, category: this.props.category._id};
    Items.insert(item);
    this.context.router.push('/category/' + this.props.category._id);
  },

  render() {
    var name;
    if (this.props.category) {
      name = this.props.category.name;
    } else {
      name = "wait for it!";
    }
    return (
      <div className="ui form">
        <div className="field">
          <label>Navne</label>
          <input id="new-item-name-da" placeholder="Dansk" type="text"></input>
          <input id="new-item-name-en" placeholder="Engelsk" type="text"></input>
          <input id="new-item-name-pl" placeholder="Polsk" type="text"></input>
        </div>
        <div className="ui primary button" onClick={this.addItem}>
          Add
        </div>
      </div>
    );
  }
});

NewItemView.propTypes = {
  category: React.PropTypes.object
};
NewItemView.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default createContainer(({ params }) => {
  //var handle = Meteor.subscribe('category', params._id);
  return {
    category: Categories.findOne(params._id)
  };
}, NewItemView);
