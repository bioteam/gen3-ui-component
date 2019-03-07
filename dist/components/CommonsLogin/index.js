"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../Button"));

require("./CommonsLogin.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CommonsLogin =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CommonsLogin, _React$Component);

  function CommonsLogin() {
    _classCallCheck(this, CommonsLogin);

    return _possibleConstructorReturn(this, _getPrototypeOf(CommonsLogin).apply(this, arguments));
  }

  _createClass(CommonsLogin, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "commons-login"
      }, _react.default.createElement("div", {
        className: "commons-login__info"
      }, _react.default.createElement("p", {
        className: "commons-login__title"
      }, this.props.title), _react.default.createElement("img", {
        className: "commons-login__logo",
        src: this.props.logoSrc,
        alt: "".concat(this.props.title, " logo")
      })), _react.default.createElement("div", {
        className: "commons-login__button"
      }, _react.default.createElement("h4", {
        className: "commons-login__message"
      }, this.props.message), _react.default.createElement(_Button.default, {
        label: this.props.buttonTitle,
        buttonType: this.props.buttonType,
        onClick: this.props.onButtonClick,
        enabled: this.props.buttonEnabled,
        isPending: this.props.isPending
      })));
    }
  }]);

  return CommonsLogin;
}(_react.default.Component);

CommonsLogin.propTypes = {
  title: _propTypes.default.string.isRequired,
  logoSrc: _propTypes.default.string.isRequired,
  buttonTitle: _propTypes.default.string.isRequired,
  onButtonClick: _propTypes.default.func.isRequired,
  buttonEnabled: _propTypes.default.bool,
  buttonType: _propTypes.default.string,
  message: _propTypes.default.string,
  isPending: _propTypes.default.bool
};
CommonsLogin.defaultProps = {
  buttonEnabled: true,
  buttonType: 'secondary',
  message: null,
  isPending: false
};
var _default = CommonsLogin;
exports.default = _default;