var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {
  signup: function(email, password) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      password: password,
    });
    WebAPIUtils.signup(email, password);
  },

  login: function(username, password) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      username: username,
      password: password
    });
    WebAPIUtils.login(username, password);
  },

  logout: function() {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  },

  closeFlash: function(id) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.CLOSE_FLASH_MESSAGE,
      id: id
    });
  },
};
