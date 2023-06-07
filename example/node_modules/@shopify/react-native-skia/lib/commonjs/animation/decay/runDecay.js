"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runDecay = void 0;

var _api = require("../../values/api");

var _decay = require("./decay");

/**
 * Runs a decay animation from the current value to zero with the given decay
 * configuration.
 * @param value value to animate
 * @param config Configuration or default configuration
 * @returns Animation
 */
const runDecay = (value, config) => {
  const resolvedConfig = {
    deceleration: 0.998,
    velocityFactor: 1,
    velocity: 0,
    from: value.current,
    ...config
  };

  const updateFunction = (t, state) => {
    if (!state) {
      return {
        current: resolvedConfig.from,
        finished: false,
        lastTimestamp: t,
        startTimestamp: t,
        initialVelocity: resolvedConfig.velocity,
        velocity: resolvedConfig.velocity
      };
    }

    return (0, _decay.decay)(t, state, resolvedConfig);
  };

  value.animation = _api.ValueApi.createAnimation(updateFunction);
  return value.animation;
};

exports.runDecay = runDecay;
//# sourceMappingURL=runDecay.js.map