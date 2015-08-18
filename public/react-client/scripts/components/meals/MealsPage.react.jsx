var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var MealStore = require('../../stores/MealStore.react.jsx');
var UserStore = require('../../stores/UserStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');
var UserActionCreators = require('../../actions/UserActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');
var ReactPropTypes = React.PropTypes;
var Calendar = require('react-input-calendar');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');


var DynamicNumericSpanColor = React.createClass({
  getInitialState: function() {
    return {
      limit: 100,
    };
  },

  propTypes: {
    limit: ReactPropTypes.number,
    content: ReactPropTypes.string
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      limit: UserStore.getDailyCalorie(),
    });
  },

  render: function() {
    var className = "green";
    if (this.props.numeric > this.state.limit) {
      className = "red";
    }
    return (
      <span className={className}>
        {this.props.content}
      </span>
     );
  }
});

var FilteredMealsForm = React.createClass({
  propTypes: {
    from: ReactPropTypes.string,
    to: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      from: this.props.from,
      to: this.props.to,
    };
  },

  _onFromChange: function(e) {
    this.setState({ from: e }, function() {
      this._filterMeals();
    });
  },

  _onToChange: function(e) {
    this.setState({ to: e }, function() {
      this._filterMeals();
    });
  },

  _filterMeals: function() {
    MealActionCreators.loadMeals(this.state.from, this.state.to);
  },

  render: function() {
    return (
      <div>
      <h3>Filter meals</h3>
      <form>
      <div>
        <label>From Date:</label>
        <Calendar format="DD/MM/YYYY" date={this.state.from} onChange={this._onFromChange} closeOnSelect="true" />
      </div>
      <div>
        <label>To Date:</label>
        <Calendar format="DD/MM/YYYY" date={this.state.to} onChange={this._onToChange} closeOnSelect="true" />
      </div>
      </form>
      </div>
    );
  }
});

var MealsPage = React.createClass({
  getInitialState: function() {
    return {
      meals: MealStore.getAllMeals(),
      errors: []
    };
  },

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    SessionStore.addChangeListener(this._onSessionChange);
    MealStore.addChangeListener(this._onChange);
    MealActionCreators.loadMeals();
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onSessionChange);
    MealStore.removeChangeListener(this._onChange);
  },

  _onSessionChange: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }
  },

  _onChange: function() {
    this.setState({
      meals: MealStore.getAllMeals(),
      errors: MealStore.getErrors()
    });
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var today = moment().format('MM-DD-YYYY');
    var from_date = moment().subtract(1, 'year').format('MM-DD-YYYY');

    return (
      <div>
        <FilteredMealsForm from={from_date} to={today} />
        {errors}
        <div className="row">
          <MealsList meals={this.state.meals} />
        </div>
      </div>
    );
  }
});

var MealItem = React.createClass({
  getInitialState: function(){
    return {
      show: true
    }
  },

  destroy: function(e) {
    e.preventDefault();
    this.setState({ show: false });
    MealActionCreators.destroyMeal(this.props.meal.id);
  },

  render: function() {
    var content = this.props.meal.calories + " Calories";
    return this.state.show ? (
      <tr>
        <td>{this.props.meal.id}</td>
        <td>{this.props.meal.description}</td>
        <td>
          <DynamicNumericSpanColor content={content} numeric={this.props.meal.calories} />
        </td>
        <td>{timeago(this.props.meal.eaten_at)}</td>
        <td>
          <Link to="meal" params={{mealId: this.props.meal.id}}>Edit</Link> -
          &nbsp;<a href='#' onClick={this.destroy}>Delete</a>
        </td>
      </tr>
    ) : (<tr></tr>);
  }
});

var MealsList = React.createClass({
  render: function() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Calories</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
      <tbody>
      {
        this.props.meals.map(function(meal, index) {
          return <MealItem meal={meal} key={"meal-" + index} />
        })
      }
      </tbody>
      </table>
    );
  }
});

module.exports = MealsPage;
