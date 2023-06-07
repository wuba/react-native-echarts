"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResolvedParams = void 0;
const DefaultParameters = {
  to: 1,
  loop: false,
  yoyo: false,
  immediate: true
};
const DefaultTimingConfig = {
  duration: 1000,
  easing: t => t
};
/**
 * Resolves parameters from optional values to a single object
 * @param toOrParams Params or to value
 * @param config timing/spring configuration
 */

const getResolvedParams = (toOrParams, config) => {
  let resolvedParameters = { ...DefaultParameters
  };

  if (typeof toOrParams === "number") {
    resolvedParameters.to = toOrParams;
  } else {
    resolvedParameters = {
      from: toOrParams.from ?? resolvedParameters.from,
      to: toOrParams.to ?? resolvedParameters.to,
      loop: toOrParams.loop ?? resolvedParameters.loop,
      yoyo: toOrParams.yoyo ?? resolvedParameters.yoyo
    };
  }

  const resolvedConfig = { ...DefaultTimingConfig
  };

  if (config) {
    resolvedConfig.duration = config.duration ?? DefaultTimingConfig.duration;
    resolvedConfig.easing = config.easing ?? DefaultTimingConfig.easing;
  }

  return { ...resolvedParameters,
    ...resolvedConfig
  };
};

exports.getResolvedParams = getResolvedParams;
//# sourceMappingURL=getResolvedParams.js.map