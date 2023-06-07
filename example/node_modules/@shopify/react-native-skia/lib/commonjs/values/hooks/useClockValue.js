"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClockValue = void 0;

var _react = require("react");

var _api = require("../api");

/**
 * @returns A new value that will be updated on every frame redraw with the
 * number of milliseconds elapsed since the value was started.
 * The clock is created in the stopped state.
 */
const useClockValue = () => {
  const clock = (0, _react.useMemo)(() => _api.ValueApi.createClockValue(), []);
  (0, _react.useEffect)(() => {
    clock.start();
    return clock.stop;
  }, [clock]);
  return clock;
};

exports.useClockValue = useClockValue;
//# sourceMappingURL=useClockValue.js.map