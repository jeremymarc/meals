var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {
  receiveLogin: function(username, json, errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      username: username,
      errors: errors
    });
  },

  receiveLoginFailed: function(username, errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_FAILED_RESPONSE,
      username: username,
      errors: errors
    });
  },

  receiveMeals: function(json) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MEALS,
      json: json
    });
  },

  receiveMeal: function(json) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MEAL,
      json: json
    });
  },

  receiveCreatedMeal: function(json, errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_MEAL,
      json: json,
      errors: errors
    });
  },

  receiveFailedCreatedUser: function(errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_FAILED_CREATED_MEAL,
      errors: errors
    });
  },

  receiveUpdatedMeal: function(json, errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_UPDATED_MEAL,
      json: json,
      errors: errors
    });
  },

  receiveDeletedMeal: function(json, errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DELETED_MEAL,
      json: json,
      errors: errors
    });
  },

  receiveUser: function(json, errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_USER,
      json: json,
      errors: errors
    });
  },

  receiveCreatedUser: function(json, errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_USER,
      json: json,
      errors: errors
    });
  },

  receiveUpdatedUser: function(json, errors) {
    SmallAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_UPDATED_USER,
      json: json,
      errors: errors
    });
  }
};

