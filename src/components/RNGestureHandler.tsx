import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { dispatchEvent } from './events';
import { styles } from './styles';
interface RNGHType {
  Gesture: typeof Gesture;
  GestureDetector: typeof GestureDetector;
}

export function RNGestureHandler({ zrenderId, RNGH }: any) {
  const { Gesture, GestureDetector } = RNGH as RNGHType;
  const dragGesture = useMemo(
    () =>
      Gesture.Pan()
        .runOnJS(true)
        .onBegin((e) => {
          dispatchEvent(zrenderId, ['mousedown', 'mousemove'], e);
        })
        .onUpdate((e) => {
          dispatchEvent(zrenderId, ['mousemove'], e);
        })
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
  const composed = Gesture.Race(dragGesture, pinchGesture, tapGesture);
  return (
    <GestureDetector gesture={composed}>
      <View style={styles.GestureView} />
    </GestureDetector>
  );
}
