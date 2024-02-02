import { View } from 'react-native';
import React, { useMemo } from 'react';
import {
  PanResponder,
  PanResponderInstance,
  NativeTouchEvent,
} from 'react-native';
import { styles } from './styles';
import type { DispatchEvents } from '../types';

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

type PanResponderHandlerProps = {
  dispatchEvents: DispatchEvents;
};

export function PanResponderHandler({
  dispatchEvents,
}: PanResponderHandlerProps) {
  const [panResponder] = usePanResponder(dispatchEvents);
  return (
    <View
      testID="pan-responder-handler"
      {...panResponder.panHandlers}
      style={styles.GestureView}
    />
  );
}

export function usePanResponder(
  dispatchEvents: DispatchEvents
): [PanResponderInstance] {
  const panResponder = useMemo(() => {
    let zooming = false;
    let moving = false;
    let pan = {
      initialX: 0,
      initialY: 0,
      prevDistance: 0,
    };
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: ({ nativeEvent }) => {
        dispatchEvents(['mousedown', 'mousemove'], nativeEvent);
      },
      onPanResponderMove: ({ nativeEvent }) => {
        const touches = nativeEvent.touches;
        const length = touches.length;
        if (length === 1) {
          if (!moving || zooming) {
            moving = true;
            zooming = false;
          } else {
            dispatchEvents(['mousemove'], nativeEvent);
          }
        } else if (length === 2) {
          const [
            { locationX: x0, locationY: y0 },
            { locationX: x1, locationY: y1 },
          ] = touches as [NativeTouchEvent, NativeTouchEvent];
          const distance = calcDistance(x0, y0, x1, y1);
          const { x, y } = calcCenter(x0, y0, x1, y1);
          if (!zooming) {
            pan = {
              initialX: x,
              initialY: y,
              prevDistance: distance,
            };
            zooming = true;
          } else {
            const { initialX, initialY, prevDistance } = pan;
            const delta = distance - prevDistance;
            pan.prevDistance = distance;
            dispatchEvents(['mousewheel'], nativeEvent, {
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
          dispatchEvents(['mouseup', 'click'], nativeEvent);
        }
        moving = false;
        zooming = false;
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => {
        return false;
      },
    });
  }, [dispatchEvents]);
  return [panResponder];
}
