import { View } from 'react-native';
import React, { useState, useMemo, useRef } from 'react';
import {
  PanResponder,
  PanResponderInstance,
  NativeTouchEvent,
} from 'react-native';
import { dispatchEvent, calcCenter, calcDistance } from './events';
import { styles } from './styles';

export function PanResponderHandler({ zrenderId }: any) {
  const [panResponder] = usePanResponder(zrenderId);
  return <View {...panResponder.panHandlers} style={styles.GestureView} />;
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
          dispatchEvent(zrenderId, ['mousedown', 'mousemove'], nativeEvent);
        },
        onPanResponderMove: ({ nativeEvent }) => {
          const touches = nativeEvent.touches;
          const length = touches.length;
          if (length === 1) {
            if (!moving || zooming) {
              setMoving(true);
              setZooming(false);
            } else {
              dispatchEvent(zrenderId, ['mousemove'], nativeEvent);
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
              dispatchEvent(zrenderId, ['mousewheel'], nativeEvent, {
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
            dispatchEvent(zrenderId, ['mouseup', 'click'], nativeEvent);
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
