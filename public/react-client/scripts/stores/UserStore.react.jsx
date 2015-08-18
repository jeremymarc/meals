var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _errors = [];
var _user = { daily_calorie: "" };

var UserStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUser: function() {
    return _user;
  },

  getDailyCalorie: function() {
    return _user.daily_calorie;
  },

  getErrors: function() {
    return _errors;
  }
});

UserStore.dispatchToken = SmallAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_UPDATED_USER:
    case ActionTypes.RECEIVE_USER:
      if (action.json) {
        _user = action.json;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      UserStore.emitChange();
      break;
  }

  return true;
});

module.exports = UserStore;
