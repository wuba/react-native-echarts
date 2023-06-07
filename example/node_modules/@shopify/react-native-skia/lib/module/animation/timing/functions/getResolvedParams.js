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

export const getResolvedParams = (toOrParams, config) => {
  let resolvedParameters = { ...DefaultParameters
  };

  if (typeof toOrParams === "number") {
    resolvedParameters.to = toOrParams;
  } else {
    var _toOrParams$from, _toOrParams$to, _toOrParams$loop, _toOrParams$yoyo;

    resolvedParameters = {
      from: (_toOrParams$from = toOrParams.from) !== null && _toOrParams$from !== void 0 ? _toOrParams$from : resolvedParameters.from,
      to: (_toOrParams$to = toOrParams.to) !== null && _toOrParams$to !== void 0 ? _toOrParams$to : resolvedParameters.to,
      loop: (_toOrParams$loop = toOrParams.loop) !== null && _toOrParams$loop !== void 0 ? _toOrParams$loop : resolvedParameters.loop,
      yoyo: (_toOrParams$yoyo = toOrParams.yoyo) !== null && _toOrParams$yoyo !== void 0 ? _toOrParams$yoyo : resolvedParameters.yoyo
    };
  }

  const resolvedConfig = { ...DefaultTimingConfig
  };

  if (config) {
    var _config$duration, _config$easing;

    resolvedConfig.duration = (_config$duration = config.duration) !== null && _config$duration !== void 0 ? _config$duration : DefaultTimingConfig.duration;
    resolvedConfig.easing = (_config$easing = config.easing) !== null && _config$easing !== void 0 ? _config$easing : DefaultTimingConfig.easing;
  }

  return { ...resolvedParameters,
    ...resolvedConfig
  };
};
//# sourceMappingURL=getResolvedParams.js.map