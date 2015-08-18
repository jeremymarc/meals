var keyMirror = require('keymirror');

var APIRoot = "http://localhost:8080";

module.exports = {
  APIEndpoints: {
    LOGIN:          APIRoot + "/oauth/token",
    USERS:          APIRoot + "/api/v1/users",
    MEALS :         APIRoot + "/api/v1/meals"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    SIGNUP_REQUEST: null,

    LOGIN_RESPONSE: null,
    LOGIN_FAILED_RESPONSE: null,
    LOGOUT: null,

    // Routes
    REDIRECT: null,

    CLOSE_FLASH_MESSAGE: null,
    ADD_MANUALLY_MESSAGE: null,

    LOAD_MEALS: null,
    DESTROY_MEAL: null,
    RECEIVE_MEALS: null,
    LOAD_MEAL: null,
    RECEIVE_MEAL: null,
    CREATE_MEAL: null,
    UPDATE_MEAL: null,
    RECEIVE_CREATED_MEAL: null,
    RECEIVE_FAILED_CREATED_USER: null,
    RECEIVE_USER: null,
    UPDATE_USER: null,
    RECEIVE_UPDATED_USER: null,
    RECEIVE_CREATED_USER: null,
    USER_REGISTER_FAILED: null,
    LOAD_USER: null
  })
};
