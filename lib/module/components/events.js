import { getInstance } from 'zrender/lib/zrender';
const noop = () => {};
export function calcDistance(x0, y0, x1, y1) {
  const dx = x0 - x1;
  const dy = y0 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}
function calMiddle(p0, p1) {
  return (p0 + p1) / 2;
}
export function calcCenter(x0, y0, x1, y1) {
  return {
    x: calMiddle(x1, x0),
    y: calMiddle(y1, y0)
  };
}
export function dispatchEvent(zrenderId, types, nativeEvent) {
  let props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    zrX: nativeEvent.locationX || nativeEvent.x,
    zrY: nativeEvent.locationY || nativeEvent.y
  };
  if (zrenderId) {
    var handler = getInstance(zrenderId).handler;
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