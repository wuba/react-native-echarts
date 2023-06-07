"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runTiming = void 0;

var _functions = require("./functions");

var _createTiming = require("./createTiming");

/**
 * Creates a new animation on an existing value that will be driven by
 * an animation value. The value will be run from / to the value in
 * params and modified by the provided easing curve for the length of
 * the duration. When the value has reached its desired "to" value the
 * animation will be stopped.
 *
 * @param value The value to animate
 * @param toOrParams To value or Animation parameters
 * @param config Spring or timing configuration
 * @returns an animation value that can be used to start/stop
 * the animation.
 */
const runTiming = (value, toOrParams, config, callback) => {
  const resolvedParameters = (0, _functions.getResolvedParams)(toOrParams, config);
  const animation = (0, _createTiming.createTiming)(resolvedParameters, value, callback);
  value.animation = animation;
  return animation;
};

exports.runTiming = runTiming;
//# sourceMappingURL=runTiming.js.map