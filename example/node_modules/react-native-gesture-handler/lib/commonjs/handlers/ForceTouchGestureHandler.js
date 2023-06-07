"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForceTouchGestureHandler = exports.forceTouchHandlerName = exports.forceTouchGestureHandlerProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils");

var _PlatformConstants = _interopRequireDefault(require("../PlatformConstants"));

var _createHandler = _interopRequireDefault(require("./createHandler"));

var _gestureHandlerCommon = require("./gestureHandlerCommon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const forceTouchGestureHandlerProps = ['minForce', 'maxForce', 'feedbackOnActivation']; // implicit `children` prop has been removed in @types/react^18.0.0

exports.forceTouchGestureHandlerProps = forceTouchGestureHandlerProps;

class ForceTouchFallback extends _react.default.Component {
  componentDidMount() {
    console.warn((0, _utils.tagMessage)('ForceTouchGestureHandler is not available on this platform. Please use ForceTouchGestureHandler.forceTouchAvailable to conditionally render other components that would provide a fallback behavior specific to your usecase'));
  }

  render() {
    return this.props.children;
  }

}

_defineProperty(ForceTouchFallback, "forceTouchAvailable", false);

const forceTouchHandlerName = 'ForceTouchGestureHandler'; // eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of gestureHandlerCommon.ts file

exports.forceTouchHandlerName = forceTouchHandlerName;
const ForceTouchGestureHandler = _PlatformConstants.default !== null && _PlatformConstants.default !== void 0 && _PlatformConstants.default.forceTouchAvailable ? (0, _createHandler.default)({
  name: forceTouchHandlerName,
  allowedProps: [..._gestureHandlerCommon.baseGestureHandlerProps, ...forceTouchGestureHandlerProps],
  config: {}
}) : ForceTouchFallback;
exports.ForceTouchGestureHandler = ForceTouchGestureHandler;
ForceTouchGestureHandler.forceTouchAvailable = (_PlatformConstants.default === null || _PlatformConstants.default === void 0 ? void 0 : _PlatformConstants.default.forceTouchAvailable) || false;
//# sourceMappingURL=ForceTouchGestureHandler.js.map