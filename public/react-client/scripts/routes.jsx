var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var SmallApp = require('./components/SmallApp.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var MealsPage = require('./components/meals/MealsPage.react.jsx');
var MealNew = require('./components/meals/MealNew.react.jsx');
var UserEdit = require('./components/users/UserEdit.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');

module.exports = (
  <Route name="app" path="/" handler={SmallApp}>
    <DefaultRoute handler={MealsPage} />
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="meals" path="/meals" handler={MealsPage}/>
    <Route name="meal" path="/meals/:mealId" handler={MealNew} />
    <Route name="new-meal" path="/meal/new" handler={MealNew}/>
    <Route name="settings" path="/user/edit" handler={UserEdit}/>
  </Route>
);
