var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _meals = [];
var _errors = [];
var _meal = { description: "", calories: "1000", eaten_at: moment().format('YYYY-MM-DD hh:mm:ss') };

var MealStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllMeals: function() {
    return _meals;
  },

  getMeal: function() {
    return _meal;
  },

  getErrors: function() {
    return _errors;
  }
});

MealStore.dispatchToken = SmallAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_MEALS:
      _meals = action.json;
      MealStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_MEAL:
      if (action.json) {
        _meals.unshift(action.json);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      MealStore.emitChange();
      break;

    case ActionTypes.RECEIVE_MEAL:
      if (action.json) {
        _meal = action.json;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      MealStore.emitChange();
      break;
  }

  return true;
});

module.exports = MealStore;

