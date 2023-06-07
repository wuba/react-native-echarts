import { ValueApi } from "../../values/api";
import { timing } from "./functions";
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

export const createTiming = (params, value, callback) => {
  var _ref, _params$from;

  // Update from to be either the declared from value,
  // the current value of the value or zero
  const resolvedParams = { ...params,
    from: (_ref = (_params$from = params.from) !== null && _params$from !== void 0 ? _params$from : value === null || value === void 0 ? void 0 : value.current) !== null && _ref !== void 0 ? _ref : 0
  }; // Update function for the animation value

  const animationFunction = (t, state) => {
    var _params$loop, _params$yoyo;

    // Update the input value using the provided update function
    const nextState = timing(t, params.duration, params.easing, (_params$loop = params.loop) !== null && _params$loop !== void 0 ? _params$loop : false, (_params$yoyo = params.yoyo) !== null && _params$yoyo !== void 0 ? _params$yoyo : false, state !== null && state !== void 0 ? state : {
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


  return ValueApi.createAnimation(animationFunction);
};
//# sourceMappingURL=createTiming.js.map