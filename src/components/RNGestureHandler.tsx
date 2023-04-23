import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { dispatchEvent } from './events';
import { styles } from './styles';
interface RNGHType {
  Gesture: typeof Gesture;
  GestureDetector: typeof GestureDetector;
}

function throttle(func: Function, wait: number) {
  let lastExecution = 0;
  return (...args: any) => {
    const now = Date.now();
    if (now - lastExecution >= wait) {
      lastExecution = now;
      func(...args);
    }
  };
}

export function RNGestureHandler({ zrenderId, RNGH }: any) {
  const { Gesture, GestureDetector } = RNGH as RNGHType;
  const dragGesture = useMemo(
    () =>
      Gesture.Pan()
        .runOnJS(true)
        .maxPointers(1)
        .onBegin((e) => {
          dispatchEvent(zrenderId, ['mousedown', 'mousemove'], e);
        })
        .onUpdate(
          throttle((e: any) => {
            dispatchEvent(zrenderId, ['mousemove'], e);
          }, 50)
        )
        .onEnd((e) => {
          dispatchEvent(zrenderId, ['mouseup'], e);
        }),
    [Gesture, zrenderId]
  );
  const pinchGesture = useMemo(
    () =>
      Gesture.Pinch()
        .runOnJS(true)
        .onUpdate((e) => {
          dispatchEvent(zrenderId, ['mousewheel'], e, {
            zrX: e.focalX,
            zrY: e.focalY,
            zrDelta: e.velocity / 20,
          });
        }),
    [Gesture, zrenderId]
  );
  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .runOnJS(true)
        .onStart((e) => {
          dispatchEvent(zrenderId, ['mousedown', 'mousemove'], e);
        })
        .onEnd((e) => {
          dispatchEvent(zrenderId, ['mouseup', 'click'], e);
        }),
    [Gesture, zrenderId]
  );
  const composed = Gesture.Race(pinchGesture, dragGesture, tapGesture);
  return (
    <GestureDetector gesture={composed}>
      <View style={styles.GestureView} />
    </GestureDetector>
  );
}
