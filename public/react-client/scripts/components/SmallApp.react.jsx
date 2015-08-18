var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../components/Header.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');
var UserActionCreators = require('../actions/UserActionCreators.react.jsx');
var FlashMessage = require("./flash/FlashMessageContainer.react.jsx");

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    username: SessionStore.getUsername()
  };
}

var SmallApp = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    if (SessionStore.isLoggedIn()) {
      UserActionCreators.loadUser();
    }
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },



  render: function() {
    return (
      <div>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          username={this.state.username} />
        <div className="container">
          <FlashMessage />
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

module.exports = SmallApp;
