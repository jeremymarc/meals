var React = require("react");
var classNames = require("classnames");

var timeout;

var FlashMessageSimple = React.createClass({
  propTypes: {
    closeMethod: React.PropTypes.func,
    label: React.PropTypes.string,
    type: React.PropTypes.string
  },

  componentDidMount: function() {
    this._timeout();
  },

  componentWillUnmount: function() {
    clearTimeout(timeout);
  },

  _close: function() {
    clearTimeout(timeout);
    this.props.closeMethod();
  },

  _timeout: function() {
    var self = this;
    timeout = setTimeout(function() {
      self._close();
    }, 5000);
  },

  render: function() {
    var className = classNames("alert", this.props.type);
    return (
      <div className={className}>
        <button type="button" className="close" aria-label="Close" onClick={this._close}>
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{this.props.label}</strong>
      </div>
    );
  }
});

module.exports = FlashMessageSimple;
