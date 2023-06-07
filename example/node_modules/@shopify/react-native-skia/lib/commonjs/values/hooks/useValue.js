"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValue = void 0;

var _react = require("react");

var _api = require("../api");

/**
 * Creates a new value that holds some data.
 * @param v Value to hold
 * @returns A Value of type of v
 */
const useValue = v => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (0, _react.useMemo)(() => _api.ValueApi.createValue(v), []);
};

exports.useValue = useValue;
//# sourceMappingURL=useValue.js.map