import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'underscore';

import { Orders } from '../api/orders.js';

OrdersView = React.createClass({
  tab: 'new',

  setOrderStatus(_id, status) {
    Meteor.call('updateOrder', _id, status, function(err, doc) {
      if (err) {
        console.log(err);
      }
    });
  },

  deleteOrder(_id, status) {
    Meteor.call('deleteOrder', _id, function(err, doc) {
      if (err) {
        console.log(err);
      }
    });
  },

  setTab(tab) {
    this.tab = tab;
    this.forceUpdate();
  },

  render() {
    var that = this;

    var tabs = (
      <div className="ui top attached tabular menu">
        <div className={"green item" + (that.tab == 'new' ? ' active' : '')} onClick={that.setTab.bind(that, 'new')}>Nye</div>
        <div className={"yellow item" + (that.tab == 'ready' ? ' active' : '')} onClick={that.setTab.bind(that, 'ready')}>Pakkede</div>
        <div className={"red item" + (that.tab == 'rejected' ? ' active' : '')} onClick={that.setTab.bind(that, 'rejected')}>Afviste</div>
        <div className={"item" + (that.tab == 'archived' ? ' active' : '')} onClick={that.setTab.bind(that, 'archived')}>Afhentede</div>
      </div>
    );

    return (
      <div>
        {tabs}
        <div className="ui bottom attached active tab segment">
          <table className="ui fixed table">
            <thead>
              <tr><th>Indsendt</th>
              <th>Montør</th>
              <th>Ordre</th>
              <th>-</th></tr>
            </thead>
            <tbody>
              {this.props.orders.map(function(order) {
                if (order.status !== that.tab) return;

                return (
                  <tr key={order._id}>
                      <td>
                        {moment(order.timestamp).locale('da').fromNow()}
                      </td>
                      <td>
                        {order.username}
                      </td>
                      <td>
                        {_.map(order.orders, function(val, key) {
                          if (key !== "_id") {
                            return (
                              <div key={key}>
                                {val.names["da"]}: {val.count}
                              </div>);
                          }
                        })}
                      </td>
                      <td>
                        {(() => {
                          if (that.tab == 'new') return (
                            <div>
                              <button className="ui tiny yellow button" onClick={that.setOrderStatus.bind(that, order._id, 'ready')}>Pakket</button>
                              <button className="ui tiny red button" onClick={that.setOrderStatus.bind(that, order._id, 'rejected')}>Afvis</button>
                            </div>
                          )
                        })()}
                        {(() => {
                          if (that.tab == 'ready') return (
                            <button className="ui tiny green button" onClick={that.setOrderStatus.bind(that, order._id, 'archived')}>Afhentet</button>
                          )
                        })()}
                        {(() => {
                          if (that.tab == 'rejected') return (
                            <button className="ui tiny red button" onClick={that.deleteOrder.bind(that, order._id)}>Fjern</button>
                          )
                        })()}
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

OrdersView.propTypes = {
  orders: React.PropTypes.array
};

export default createContainer(({ params }) => {
  return {
    orders: Orders.find({}, {sort: {timestamp: -1}}).fetch()
  };
}, OrdersView);
