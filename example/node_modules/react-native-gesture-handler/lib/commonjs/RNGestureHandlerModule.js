"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _utils = require("./utils");

const {
  RNGestureHandlerModule
} = _reactNative.NativeModules;

if (RNGestureHandlerModule == null) {
  console.error((0, _utils.tagMessage)(`react-native-gesture-handler module was not found. Make sure you're running your app on the native platform and your code is linked properly (cd ios && pod install && cd ..).

      For installation instructions, please refer to https://docs.swmansion.com/react-native-gesture-handler/docs/#installation`.split('\n').map(line => line.trim()).join('\n')));
}

if (RNGestureHandlerModule && RNGestureHandlerModule.flushOperations === undefined) {
  RNGestureHandlerModule.flushOperations = () => {// NO-OP if not defined
  };
}

var _default = RNGestureHandlerModule;
exports.default = _default;
//# sourceMappingURL=RNGestureHandlerModule.js.map