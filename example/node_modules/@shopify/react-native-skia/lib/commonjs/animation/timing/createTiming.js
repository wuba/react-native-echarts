"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTiming = void 0;

var _api = require("../../values/api");

var _functions = require("./functions");

/**
 * Creates an animation that is driven by a clock value.
 * The value will be run from / to the value in params and modified
 * by the provided easing curve for the length of the duration. When
 * the value has reached its desired "to" value the animation
 * will be stopped. If loop is set to true, the animation will continue
 * to run until stopped.
 *
 * @param params Animation parameters
 * @param config Spring or timing configuration
 * @param value Optional value that the animation will update
 * @params an animation value that can be used to start/stop
 * the animation.
 */
const createTiming = (params, value, callback) => {
  // Update from to be either the declared from value,
  // the current value of the value or zero
  const resolvedParams = { ...params,
    from: params.from ?? (value === null || value === void 0 ? void 0 : value.current) ?? 0
  }; // Update function for the animation value

  const animationFunction = (t, state) => {
    // Update the input value using the provided update function
    const nextState = (0, _functions.timing)(t, params.duration, params.easing, params.loop ?? false, params.yoyo ?? false, state ?? {
      current: params.from,
      finished: false
    });
    const current = nextState.current * (resolvedParams.to - resolvedParams.from) + resolvedParams.from;

    if (callback && nextState.finished === true) {
      callback(current);
    }

    return { ...nextState,
      current
    };
  }; // Create animation value


  return _api.ValueApi.createAnimation(animationFunction);
};

exports.createTiming = createTiming;
//# sourceMappingURL=createTiming.js.map