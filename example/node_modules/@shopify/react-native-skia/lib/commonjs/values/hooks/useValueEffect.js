"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValueEffect = void 0;

var _react = require("react");

/**
 * Sets up an effect that will be run whenever the value changes
 * @param value Value to subscribe to changes on
 * @param cb Callback to run when value changes
 */
const useValueEffect = (value, cb) => {
  (0, _react.useEffect)(() => {
    return value.addListener(cb); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
};

exports.useValueEffect = useValueEffect;
//# sourceMappingURL=useValueEffect.js.map