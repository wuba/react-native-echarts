"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueApi = void 0;

var _RNSkAnimation = require("./RNSkAnimation");

var _RNSkClockValue = require("./RNSkClockValue");

var _RNSkComputedValue = require("./RNSkComputedValue");

var _RNSkValue = require("./RNSkValue");

const ValueApi = {
  createValue: function (initialValue) {
    return new _RNSkValue.RNSkValue(initialValue);
  },
  createComputedValue: function (cb, values) {
    return new _RNSkComputedValue.RNSkComputedValue(cb, values);
  },
  createClockValue: function () {
    return new _RNSkClockValue.RNSkClockValue(requestAnimationFrame.bind(window));
  },
  createAnimation: function (cb) {
    return new _RNSkAnimation.RNSkAnimation(cb, requestAnimationFrame.bind(window));
  }
};
exports.ValueApi = ValueApi;
//# sourceMappingURL=api.js.map