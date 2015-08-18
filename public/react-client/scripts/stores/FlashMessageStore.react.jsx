var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var _ = require("lodash");
var ActionTypes = SmallConstants.ActionTypes;

var CHANGE_EVENT = "change";
var _messages = [];

var FlashMessageStore = assign({}, EventEmitter.prototype, {
  getMessages: function() {
    return _messages;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

SmallAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_UPDATED_USER:
      _messages.push({
      "id": (new Date()).getTime(),
      "text": "User settings updated",
      "type": "alert-success"
    });
    FlashMessageStore.emitChange();
    break;

    case ActionTypes.RECEIVE_FAILED_CREATED_MEAL:
      console.log(payload);
      var text = action.errors[0];
      _messages.push({
      "id": (new Date()).getTime(),
      "text": text,
      "type": "alert-danger"
    });
    FlashMessageStore.emitChange();
    break;

    case ActionTypes.RECEIVE_CREATED_MEAL:
      _messages.push({
      "id": (new Date()).getTime(),
      "text": "Meal created successfully!",
      "type": "alert-success"
    });
    FlashMessageStore.emitChange();
    break;
    case ActionTypes.DESTROY_MEAL:
      _messages.push({
      "id": (new Date()).getTime(),
      "text": "Meal has been deleted successfully!",
      "type": "alert-success"
    });
    FlashMessageStore.emitChange();
    break;
    case ActionTypes.LOGIN_RESPONSE:
      _messages.push({
      "id": (new Date()).getTime(),
      "text": "Welcome back!",
      "type": "alert-success"
    });
    FlashMessageStore.emitChange();
    break;
    case ActionTypes.LOGIN_FAILED_RESPONSE:
      _messages.push({
      "id": (new Date()).getTime(),
      "text": "Username or password incorrect",
      "type": "alert-danger"
    });
    FlashMessageStore.emitChange();
    break;
    case ActionTypes.CLOSE_FLASH_MESSAGE:
      _.remove(_messages, {id: action.id});
      FlashMessageStore.emitChange();
    break;
    case ActionTypes.ADD_MANUALLY_MESSAGE:
      _messages.push(action.message);
      FlashMessageStore.emitChange();
    break;
    case ActionTypes.USER_REGISTER_FAILED:
      _messages.push({
      "id": (new Date()).getTime(),
      "text": "An error occured",
      "type": "alert-danger"
      });
      FlashMessageStore.emitChange();
      break;

      case ActionTypes.RECEIVE_CREATED_USER:
        _messages.push({
        "id": (new Date().getTime()),
        "text": "Welcome",
        "type": "alert-info"
      });
      FlashMessageStore.emitChange();
      break;
      default:
      break;
  }
});


module.exports = FlashMessageStore;
