import { getInstance } from 'zrender/lib/zrender';

declare type HandlerName =
  | 'click'
  | 'dblclick'
  | 'mousewheel'
  | 'mouseout'
  | 'mouseup'
  | 'mousedown'
  | 'mousemove'
  | 'contextmenu';

const noop = () => {};

export function calcDistance(x0: number, y0: number, x1: number, y1: number) {
  const dx = x0 - x1;
  const dy = y0 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function calMiddle(p0: number, p1: number) {
  return (p0 + p1) / 2;
}

export function calcCenter(x0: number, y0: number, x1: number, y1: number) {
  return {
    x: calMiddle(x1, x0),
    y: calMiddle(y1, y0),
  };
}

export function dispatchEvent(
  zrenderId: number,
  types: HandlerName[],
  nativeEvent: any,
  props: any = {
    zrX: nativeEvent.locationX || nativeEvent.x,
    zrY: nativeEvent.locationY || nativeEvent.y,
  }
) {
  if (zrenderId) {
    var handler = getInstance(zrenderId).handler;
    types.forEach(function (type) {
      handler.dispatch(type, {
        preventDefault: noop,
        stopImmediatePropagation: noop,
        stopPropagation: noop,
        ...props,
      });
    });
  }
}
