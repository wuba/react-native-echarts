"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDrawCallback = void 0;

var _react = require("react");

/**
 * Creates a memoized callback for the onDraw handler of a Skia component.
 * @param callback The callback to memoize.
 * @param deps Dependencies for the callback.
 * */
const useDrawCallback = function (callback) {
  let deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _react.useMemo)(() => {
    return callback; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

exports.useDrawCallback = useDrawCallback;
//# sourceMappingURL=useDrawCallback.js.map