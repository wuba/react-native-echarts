"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComputedValue = void 0;

var _react = require("react");

var _api = require("../api");

var _Animations = require("../../renderer/processors/Animations");

/**
 * Creates a new computed value - a value that will calculate its value depending
 * on other values.
 * @param cb Callback to calculate new value
 * @param values Dependant values
 * @returns A readonly value
 */
const useComputedValue = (cb, values) => {
  const value = (0, _react.useMemo)(() => _api.ValueApi.createComputedValue(cb, values.filter(_Animations.isValue)), // eslint-disable-next-line react-hooks/exhaustive-deps
  values);
  (0, _react.useEffect)(() => () => value.__invalidate(), [value]);
  return value;
};

exports.useComputedValue = useComputedValue;
//# sourceMappingURL=useComputedValue.js.map