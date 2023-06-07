import { ValueApi } from "../../values/api";
import { decay } from "./decay";

/**
 * Runs a decay animation from the current value to zero with the given decay
 * configuration.
 * @param value value to animate
 * @param config Configuration or default configuration
 * @returns Animation
 */
export const runDecay = (value, config) => {
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

    return decay(t, state, resolvedConfig);
  };

  value.animation = ValueApi.createAnimation(updateFunction);
  return value.animation;
};
//# sourceMappingURL=runDecay.js.map