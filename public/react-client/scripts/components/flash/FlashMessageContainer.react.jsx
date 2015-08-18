var React = require("react");
var FlashMessageStore = require("../../stores/FlashMessageStore.react.jsx");
var FlashMessageSimple = require("./FlashMessageSimple.react.jsx");
var SessionActionCreators = require("../../actions/SessionActionCreators.react.jsx");

function getState() {
  return {
    "messages": FlashMessageStore.getMessages()
  };
}

var FlashMessageContainer = React.createClass({
  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    FlashMessageStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
    FlashMessageStore.removeChangeListener(this._onStoreChange);
  },

  closeFlash: function(id) {
    SessionActionCreators.closeFlash(id);
  },

  _onStoreChange: function() {
    this.setState(
      getState()
    );
  },

  render: function() {
    if (this.state.messages.length === 0) {
      return false;
    }
    else {
      return (
        <div>
        {this.state.messages.map(function(object) {
          return (
            <FlashMessageSimple closeMethod={this.closeFlash.bind(this, object.id)} key={object.id} label={object.text} type={object.type} />
          );
        }, this)}
        </div>
      );
    }
  }
});

module.exports = FlashMessageContainer;
