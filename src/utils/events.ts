import { useState, useMemo, useRef } from 'react';
import {
  PanResponder,
  PanResponderInstance,
  NativeTouchEvent,
} from 'react-native';
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

function calcDistance(x0: number, y0: number, x1: number, y1: number) {
  const dx = x0 - x1;
  const dy = y0 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function calMiddle(p0: number, p1: number) {
  return (p0 + p1) / 2;
}

function calcCenter(x0: number, y0: number, x1: number, y1: number) {
  return {
    x: calMiddle(x1, x0),
    y: calMiddle(y1, y0),
  };
}

function wrapTouch(event: any) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  event.preventDefault = noop;
  event.stopPropagation = noop;
  event.stopImmediatePropagation = noop;
  return event;
}

function dispatchEvent(
  zrenderId: number,
  types: HandlerName[],
  nativeEvent: NativeTouchEvent,
  stage: 'start' | 'end' | 'change' | undefined,
  props: any = {
    zrX: nativeEvent.locationX,
    zrY: nativeEvent.locationY,
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
      stage && handler.processGesture(wrapTouch(nativeEvent), stage);
    });
  }
}

export function usePanResponder(zrenderId: number): [PanResponderInstance] {
  const [zooming, setZooming] = useState(false);
  const [moving, setMoving] = useState(false);
  const pan = useRef({
    initialX: 0,
    initialY: 0,
    prevDistance: 0,
  });
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: ({ nativeEvent }) => {
          dispatchEvent(
            zrenderId,
            ['mousedown', 'mousemove'],
            nativeEvent,
            'start'
          );
        },
        onPanResponderMove: ({ nativeEvent }) => {
          const touches = nativeEvent.touches;
          const length = touches.length;
          if (length === 1) {
            if (!moving || zooming) {
              setMoving(true);
              setZooming(false);
            } else {
              dispatchEvent(zrenderId, ['mousemove'], nativeEvent, 'change');
            }
          } else if (length === 2) {
            const [
              { locationX: x0, locationY: y0 },
              { locationX: x1, locationY: y1 },
            ] = touches as [NativeTouchEvent, NativeTouchEvent];
            const distance = calcDistance(x0, y0, x1, y1);
            const { x, y } = calcCenter(x0, y0, x1, y1);
            if (!zooming) {
              pan.current = {
                initialX: x,
                initialY: y,
                prevDistance: distance,
              };
              setZooming(true);
            } else {
              const { initialX, initialY, prevDistance } = pan.current;
              const delta = distance - prevDistance;
              pan.current.prevDistance = distance;
              dispatchEvent(zrenderId, ['mousewheel'], nativeEvent, undefined, {
                zrX: initialX,
                zrY: initialY,
                zrDelta: delta / 120,
              });
            }
          }
        },
        onPanResponderTerminationRequest: () => true,
        onPanResponderRelease: ({ nativeEvent }) => {
          if (!zooming) {
            dispatchEvent(zrenderId, ['mouseup', 'click'], nativeEvent, 'end');
          }
          setMoving(false);
          setZooming(false);
        },
        onPanResponderTerminate: () => {},
        onShouldBlockNativeResponder: () => {
          return false;
        },
      }),
    [moving, zooming, zrenderId, pan]
  );
  return [panResponder];
}
