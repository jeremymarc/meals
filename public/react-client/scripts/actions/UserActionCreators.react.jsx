var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {
  loadUser: function() {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_USER,
    });
    WebAPIUtils.loadUser();
  },

  updateUser: function(max_calories) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_USER,
      max_calories: max_calories
    });
    WebAPIUtils.updateUser(max_calories);
  }
};

