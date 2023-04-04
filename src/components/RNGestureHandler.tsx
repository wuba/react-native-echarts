import React, { useMemo } from 'react';
import type { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { dispatchEvent } from './events';

interface RNGHType {
  Gesture: typeof Gesture;
  GestureDetector: typeof GestureDetector;
}

export function RNGestureHandler({ zrenderId, children, RNGH }: any) {
  const { Gesture, GestureDetector } = RNGH as RNGHType;
  const dragGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart((e) => {
          dispatchEvent(zrenderId, ['mousedown', 'mousemove'], e, 'start');
        })
        .onUpdate((e) => {
          dispatchEvent(zrenderId, ['mousemove'], e, 'change');
        })
        .onEnd((e) => {
          dispatchEvent(zrenderId, ['mouseup'], e, 'end');
        }),
    [Gesture, zrenderId]
  );
  const pinchGesture = useMemo(
    () =>
      Gesture.Pinch().onUpdate((e) => {
        dispatchEvent(zrenderId, ['mousewheel'], e, undefined, {
          zrX: e.focalX,
          zrY: e.focalY,
          zrDelta: e.velocity / 10,
        });
      }),
    [Gesture, zrenderId]
  );
  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .onStart((e) => {
          dispatchEvent(zrenderId, ['mousedown', 'mousemove'], e, 'start');
        })
        .onEnd((e) => {
          dispatchEvent(zrenderId, ['mouseup', 'click'], e, 'end');
        }),
    [Gesture, zrenderId]
  );
  const composed = Gesture.Race(pinchGesture, dragGesture, tapGesture);
  return <GestureDetector gesture={composed}>{children}</GestureDetector>;
}
