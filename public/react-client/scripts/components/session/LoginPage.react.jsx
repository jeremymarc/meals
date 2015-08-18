var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var Router = require('react-router');

var LoginPage = React.createClass({
  mixins : [Router.Navigation],

  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(username, password);
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <div className="card card--login small-10 medium-6 large-4 columns small-centered">
            <form onSubmit={this._onSubmit}>
              <div className="form-group card--login__field">
                <label name="username">Username</label>
                <input type="text" name="username" ref="username" className="form-control" />
              </div>
              <div className="form-group card--login__field">
                <label name="password">Password</label>
                <input type="password" name="password" ref="password" className="form-control" />
              </div>
              <button type="submit" className="card--login__submit btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;

