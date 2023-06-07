"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureHandler = void 0;
var _react = _interopRequireWildcard(require("react"));
var _RNGestureHandler = require("./RNGestureHandler");
var _PanResponderHandler = require("./PanResponderHandler");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let RNGH = null;
try {
  RNGH = require('react-native-gesture-handler');
} catch (error) {
  console.warn('react-native-gesture-handler is not installed. Falling back to PanResponder.');
}
const GestureHandler = /*#__PURE__*/(0, _react.memo)(function GestureHandler(_ref) {
  let {
    zrenderId,
    useRNGH = false
  } = _ref;
  if (useRNGH && RNGH) {
    return /*#__PURE__*/_react.default.createElement(_RNGestureHandler.RNGestureHandler, {
      RNGH: RNGH,
      zrenderId: zrenderId
    });
  } else {
    return /*#__PURE__*/_react.default.createElement(_PanResponderHandler.PanResponderHandler, {
      zrenderId: zrenderId
    });
  }
});
exports.GestureHandler = GestureHandler;
//# sourceMappingURL=GestureHandler.js.map