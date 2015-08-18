var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var SmallConstants = require('../constants/SmallConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = SmallConstants.APIEndpoints;

module.exports = {
  signup: function(email, password) {
    request.post(APIEndpoints.USERS)
      .send({ user: {
        email: email,
        password: password,
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveFailedCreatedUser(errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedUser(json, null);
          }
        }
      });
  },

  login: function(username, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ username: username, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLoginFailed(username, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(username, json, null);
          }
        }
      });
  },

  loadUser: function() {
    request.get(APIEndpoints.USERS + '/me')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveUser(json);
        }
      });
  },

  updateUser: function(daily_calorie) {
    request.put(APIEndpoints.USERS)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'))
      .send({ daily_calorie: daily_calorie })
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveUpdatedUser(json);
        }
      });
  },

  loadMeals: function(from, to) {
    url = APIEndpoints.MEALS + "?";
    if (from) {
      url += "from=" + from + "&";
    }
    if (to) {
      url += "to=" + to;
    }

    request.get(url)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'))
      .send({ from: from, to: to })
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveMeals(json);
        }
      });
  },

  loadMeal: function(mealId) {
    request.get(APIEndpoints.MEALS + '/' + mealId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveMeal(json);
        }
      });
  },

  createMeal: function(description, calories, eaten_at) {
    request.post(APIEndpoints.MEALS)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'))
      .send({ meal: { description: description, calories: calories, eaten_at: eaten_at } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedMeal(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedMeal(json, null);
          }
        }
      });
  },

  updateMeal: function(mealId, description, calories, eaten_at) {
    request.put(APIEndpoints.MEALS + '/' + mealId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'))
      .send({ meal: { description: description, calories: calories, eaten_at: eaten_at } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveUpdatedMeal(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveUpdatedMeal(json, null);
          }
        }
      });
  },

  destroyMeal: function(mealId) {
    request.del(APIEndpoints.MEALS + '/' + mealId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('accessToken'))
      .send({ meal: { id: mealId } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveDeletedMeal(null, errorMsgs);
          } else {
            ServerActionCreators.receiveDeletedMeal(null, null);
          }
        }
      });
  },
};
