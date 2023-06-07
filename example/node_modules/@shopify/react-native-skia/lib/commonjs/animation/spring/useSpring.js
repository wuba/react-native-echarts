"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSpring = void 0;

var _timing = require("../timing");

var _Spring = require("./Spring");

var _spring = require("./functions/spring");

/**
 * Creats a spring based animation value that will run whenever
 * the animation parameters change.
 * @param toOrParams
 * @param config
 * @returns
 */
const useSpring = (toOrParams, config, callback) => (0, _timing.useTiming)(toOrParams, (0, _spring.createSpringEasing)(config ?? _Spring.Spring.Config.Default), callback);

exports.useSpring = useSpring;
//# sourceMappingURL=useSpring.js.map