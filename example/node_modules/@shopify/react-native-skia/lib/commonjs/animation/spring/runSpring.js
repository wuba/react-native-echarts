"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runSpring = void 0;

var _runTiming = require("../timing/runTiming");

var _Spring = require("./Spring");

var _spring = require("./functions/spring");

/**
 * Creates a new animation on an existing value that will be driven by
 * an animation value. The value will be run from / to the value in
 * params and modified by the provided easing curve for the length of
 * the duration. When the value has reached its desired "to" value the
 * animation will be stopped.
 *
 * @param value The value to animate
 * @param toOrParams To value or Animation parameters
 * @param config Spring configuration
 * @returns an animation value that can be used to start/stop
 * the animation.
 */
const runSpring = (value, toOrParams, config, callback) => {
  return (0, _runTiming.runTiming)(value, toOrParams, (0, _spring.createSpringEasing)(config ?? _Spring.Spring.Config.Default), callback);
};

exports.runSpring = runSpring;
//# sourceMappingURL=runSpring.js.map