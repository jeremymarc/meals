var React = require('react');
var SmallAppDispatcher = require('../../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../../constants/SmallConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MealStore = require('../../stores/MealStore.react.jsx');
var State = require('react-router').State;

var MealNew = React.createClass({
  mixins: [ State ],

  getInitialState: function() {
    return {
      meal: {},
      errors: []
    };
  },

  isNewRecord: function() {
    return (typeof(this.getParams().mealId) == "undefined");
  },

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('app');
    }

    if (!this.isNewRecord()) {
      MealActionCreators.loadMeal(this.getParams().mealId);
      MealStore.addChangeListener(this._onChange);
    }
  },

  componentWillUnmount: function() {
    if (!this.isNewRecord()) {
      MealStore.removeChangeListener(this._onChange);
    }
  },

  _onChange: function() {
    this.setState({
      meal: MealStore.getMeal(),
      errors: MealStore.getErrors()
    });
  },

  handleCaloriesChange: function(event) {
    meal = this.state.meal;
    meal.calories = event.target.value;
    this.setState({meal: meal});
  },

  handleDescriptionChange: function(event) {
    meal = this.state.meal;
    meal.description = event.target.value;
    this.setState({meal: meal});
  },

  handleEatenAtChange: function(event) {
    meal = this.state.meal;
    meal.eaten_at = event.target.value;
    this.setState({meal: meal});
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({
      errors: []
    });

    var calories = this.refs.calories.getDOMNode().value;
    if (calories.length == 0) {
      this.setState({ errors: ['Calories is mandatory']});
      return;
    }
    if (!calories.match(/[0-9]+/)) {
      this.setState({ errors: ['Calories must be a numeric value']});
      return;
    }
    var description = this.refs.description.getDOMNode().value;
    if (description.length == 0) {
      this.setState({ errors: ['Description is mandatory']});
      return;
    }
    var eaten_at = this.refs.eaten_at.getDOMNode().value;
    if (eaten_at.length == 0) {
      this.setState({ errors: ['Date is mandatory']});
      return;
    }
    if (!moment(eaten_at, "YYYY-MM-DD h:mm:ss").isValid()) {
      this.setState({ errors: ['Date is not a valid date']});
      return;
    }

    if (this.isNewRecord()) {
      MealActionCreators.createMeal(description, calories, eaten_at);
    } else {
      MealActionCreators.updateMeal(this.getParams().mealId, description, calories, eaten_at);
    }
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var submitLabel = (this.isNewRecord()) ? 'Create' : 'Update';
    return (
      <div className="row">
      {errors}
      <form onSubmit={this._onSubmit} className="new-meal">
      <div className="form-group new-meal__calories">
      <label htmlFor="calories">Calories</label>
        <input type="text" placeholder="Calories" name="calories" ref="calories" className="form-control" value={this.state.meal.calories} onChange={this.handleCaloriesChange} />
      </div>
      <div className="form-group new-meal__description">
      <label htmlFor="description">Description of your meal</label>
      <textarea rows="10" placeholder="Description..." name="description" ref="description" className="form-control" value={this.state.meal.description} onChange={this.handleDescriptionChange} />
      </div>
      <div className="form-group new-meal__eaten_at">
      <label htmlFor="description">Date of the meal (format YYYY-DD-MM hh:mm:ss)</label>
        <input type="text" placeholder="Date of the meal" name="eaten_at" ref="eaten_at" className="form-control" value={this.state.meal.eaten_at} onChange={this.handleEatenAtChange} />
      </div>
      <div className="new-meal">
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
      </form>
      </div>
    );
  }
});

module.exports = MealNew;

