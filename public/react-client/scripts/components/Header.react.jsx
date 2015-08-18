var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');

var Header = React.createClass({
  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    username: ReactPropTypes.string,
    role: ReactPropTypes.string
  },
  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },
  settings: function(e) {
    e.preventDefault();
  },
  render: function() {
    var rightNav = this.props.isLoggedIn ? (
      <ul className="nav navbar-nav navbar-right">
        <li id="fat-menu" className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Hello {this.props.username}!
            <span className="caret"></span>
          </a>
          <ul className="dropdown-menu" aria-labelledby="drop3">
            <li><Link to="settings">Settings</Link></li>
            <li><a href='#' onClick={this.logout}>Logout</a></li>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="login">Login</Link></li>
        <li><Link to="signup">Sign up</Link></li>
      </ul>
    );

    var leftNav = this.props.isLoggedIn ? (
      <ul className="nav navbar-nav">
        <li><Link to="new-meal">New meal</Link></li>
      </ul>
    ) : (
      <ul></ul>
    );

    return (
      <nav className="navbar navbar-default navbar-static">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="meals" className="navbar-brand">TopTal Meals</Link>
            {leftNav}
          </div>
          <div className="collapse navbar-collapse bs-example-js-navbar-collapse">
            {rightNav}
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
