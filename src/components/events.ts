import type { HandlerName } from '../types';
import { getInstance } from 'zrender/lib/zrender';

const noop = () => {};

export function dispatchEventsToZRender(
  zrenderId: number,
  types: HandlerName[],
  nativeEvent: any,
  eventArgs: any = {
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
        ...eventArgs,
      });
    });
  }
}
