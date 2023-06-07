"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcCenter = calcCenter;
exports.calcDistance = calcDistance;
exports.dispatchEvent = dispatchEvent;
var _zrender = require("zrender/lib/zrender");
const noop = () => {};
function calcDistance(x0, y0, x1, y1) {
  const dx = x0 - x1;
  const dy = y0 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}
function calMiddle(p0, p1) {
  return (p0 + p1) / 2;
}
function calcCenter(x0, y0, x1, y1) {
  return {
    x: calMiddle(x1, x0),
    y: calMiddle(y1, y0)
  };
}
function dispatchEvent(zrenderId, types, nativeEvent) {
  let props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    zrX: nativeEvent.locationX || nativeEvent.x,
    zrY: nativeEvent.locationY || nativeEvent.y
  };
  if (zrenderId) {
    var handler = (0, _zrender.getInstance)(zrenderId).handler;
    types.forEach(function (type) {
      handler.dispatch(type, {
        preventDefault: noop,
        stopImmediatePropagation: noop,
        stopPropagation: noop,
        ...props
      });
    });
  }
}
//# sourceMappingURL=events.js.map