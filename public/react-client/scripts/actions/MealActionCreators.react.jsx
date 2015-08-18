var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {

  loadMeals: function(from, to) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_MEALS,
      from: from,
      to: to
    });
    WebAPIUtils.loadMeals(from, to);
  },

  loadMeal: function(mealId) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_MEAL,
      mealId: mealId,
    });
    WebAPIUtils.loadMeal(mealId);
  },

  createMeal: function(description, calories, eaten_at) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MEAL,
      description: description,
      calories: calories,
      eaten_at: eaten_at
    });
    WebAPIUtils.createMeal(description, calories, eaten_at);
  },

  updateMeal: function(mealId, description, calories, eaten_at) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_MEAL,
      mealId: mealId,
      description: description,
      calories: calories,
      eaten_at: eaten_at
    });
    WebAPIUtils.updateMeal(mealId, description, calories, eaten_at);
  },

  destroyMeal: function(mealId) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.DESTROY_MEAL,
      mealId: mealId
    });
    WebAPIUtils.destroyMeal(mealId);
  }

};

