var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var SessionStore = require('../stores/SessionStore.react.jsx');
var MealStore = require('../stores/MealStore.react.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Router = require('react-router');
var routes = require('../routes.jsx');

var router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

var ActionTypes = SmallConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var RouteStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function() {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRouter: function() {
    return router;
  },

  redirectHome: function() {
    router.transitionTo('app');
  }
});

RouteStore.dispatchToken = SmallAppDispatcher.register(function(payload) {
  SmallAppDispatcher.waitFor([
    SessionStore.dispatchToken,
    MealStore.dispatchToken
  ]);

  var action = payload.action;

  switch(action.type) {
    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      break;
    case ActionTypes.LOGIN_RESPONSE:
      if (SessionStore.isLoggedIn()) {
        router.transitionTo('app');
      }
      break;
    case ActionTypes.CREATE_MEAL:
      router.transitionTo('meals');
      break;
    case ActionTypes.UPDATE_MEAL:
      router.transitionTo('meals');
      break;
    case ActionTypes.UPDATE_USER:
      router.transitionTo('meals');
      break;
    case ActionTypes.RECEIVE_CREATED_MEAL:
      router.transitionTo('app');
      break;

    default:
  }

  return true;
});

module.exports = RouteStore;

