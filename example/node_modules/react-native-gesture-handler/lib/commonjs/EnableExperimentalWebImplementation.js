"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableExperimentalWebImplementation = enableExperimentalWebImplementation;
exports.isExperimentalWebImplementationEnabled = isExperimentalWebImplementationEnabled;

var _reactNative = require("react-native");

let EXPERIMENTAL_WEB_IMPLEMENTATION = false;
let getWasCalled = false;

function enableExperimentalWebImplementation(shouldEnable = true) {
  if (_reactNative.Platform.OS !== 'web' || EXPERIMENTAL_WEB_IMPLEMENTATION === shouldEnable) {
    return;
  }

  if (getWasCalled) {
    console.error('Some parts of this application have already started using old gesture handler implementation. No changes will be applied. You can try enabling new implementation earlier.');
    return;
  }

  EXPERIMENTAL_WEB_IMPLEMENTATION = shouldEnable;
}

function isExperimentalWebImplementationEnabled() {
  getWasCalled = true;
  return EXPERIMENTAL_WEB_IMPLEMENTATION;
}
//# sourceMappingURL=EnableExperimentalWebImplementation.js.map