"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTiming = void 0;

var _react = require("react");

var _useValue = require("../../values/hooks/useValue");

var _functions = require("./functions");

var _createTiming = require("./createTiming");

/**
 * Creats an animation value that will run whenever
 * the animation parameters change. The animation start immediately.
 * @param toOrParams
 * @param config
 * @returns A value that is animated
 */
const useTiming = (toOrParams, config, callback) => {
  // Resolve parameters - keep a cached version to avoid
  // unnecesary re-renders.
  const prevCfgRef = (0, _react.useRef)();
  const resolvedParameters = (0, _react.useMemo)(() => {
    const nextParams = (0, _functions.getResolvedParams)(toOrParams, config);

    if (!equals(prevCfgRef.current, nextParams)) {
      prevCfgRef.current = nextParams;
    }

    return prevCfgRef.current;
  }, [config, toOrParams]); // Create value

  const value = (0, _useValue.useValue)(resolvedParameters.from ?? 0); // Create timing animation - keep a cached version to avoid
  // uneccessary recreation of animations

  const prevAnimationRef = (0, _react.useRef)();
  const prevParamsRef = (0, _react.useRef)();
  const animation = (0, _react.useMemo)(() => {
    if (!equals(prevParamsRef.current, resolvedParameters)) {
      prevParamsRef.current = resolvedParameters;
      prevAnimationRef.current = (0, _createTiming.createTiming)(resolvedParameters, value, callback);
    }

    return prevAnimationRef.current;
  }, [callback, resolvedParameters, value]); // Run animation on the value - and stop it on unmount

  (0, _react.useEffect)(() => {
    value.animation = animation;
    return () => value.animation = undefined;
  }, [animation, value]); // Return the value that is animated

  return value;
};

exports.useTiming = useTiming;

const equals = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
//# sourceMappingURL=useTiming.js.map