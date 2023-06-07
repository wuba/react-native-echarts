"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.maybeInitializeFabric = maybeInitializeFabric;

var _eventReceiver = require("./handlers/gestures/eventReceiver");

var _RNGestureHandlerModule = _interopRequireDefault(require("./RNGestureHandlerModule"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fabricInitialized = false;

function initialize() {
  (0, _eventReceiver.startListening)();
} // since isFabric() may give wrong results before the first render, we call this
// method during render of GestureHandlerRootView


function maybeInitializeFabric() {
  if ((0, _utils.isFabric)() && !fabricInitialized) {
    _RNGestureHandlerModule.default.install();

    fabricInitialized = true;
  }
}
//# sourceMappingURL=init.js.map