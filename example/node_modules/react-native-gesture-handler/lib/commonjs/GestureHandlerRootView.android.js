"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GestureHandlerRootView;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _init = require("./init");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable @typescript-eslint/no-var-requires */
const GestureHandlerRootViewNativeComponent = (0, _utils.shouldUseCodegenNativeComponent)() ? require('./fabric/RNGestureHandlerRootViewNativeComponent').default : (0, _reactNative.requireNativeComponent)('RNGestureHandlerRootView');

function GestureHandlerRootView(props) {
  // try initialize fabric on the first render, at this point we can
  // reliably check if fabric is enabled (the function contains a flag
  // to make sure it's called only once)
  (0, _init.maybeInitializeFabric)();
  return /*#__PURE__*/React.createElement(GestureHandlerRootViewNativeComponent, props);
}
//# sourceMappingURL=GestureHandlerRootView.android.js.map