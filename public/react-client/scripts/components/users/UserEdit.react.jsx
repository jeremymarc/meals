var React = require('react');
var SmallAppDispatcher = require('../../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../../constants/SmallConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var UserStore = require('../../stores/UserStore.react.jsx');
var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var UserActionCreators = require('../../actions/UserActionCreators.react.jsx');

var UserEdit = React.createClass({
  getInitialState: function() {
    return {
      daily_calorie: UserStore.getDailyCalorie()
    };
  },

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('app');
    }

    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    // UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      daily_calorie: UserStore.getDailyCalorie(),
    });
  },

  handleChange: function(event) {
    this.setState({daily_calorie: event.target.value});
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var daily_calorie = this.refs.daily_calorie.getDOMNode().value;
    UserActionCreators.updateUser(daily_calorie);
  },

  render: function() {
    return (
      <div className="row">
        <form onSubmit={this._onSubmit} className="edit-user">
          <div className="edit-user__max_calories form-group">
            <label>Daily max calories</label>
            <input type="text" placeholder="Daily max calories" name="daily_calorie" ref="daily_calorie" value={this.state.daily_calorie} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="edit-user">
          <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = UserEdit;

