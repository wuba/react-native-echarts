import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { styles } from './styles';
import type {
  DefaultRNGestures,
  DispatchEvents,
  RNGestureHandlerGesture,
} from '../types';
import { throttle } from '../utils/throttle';

interface RNGHType {
  Gesture: typeof Gesture;
  GestureDetector: typeof GestureDetector;
}

export const getDefaultPanRNGesture = (
  Gesture: RNGHType['Gesture'],
  dispatchEvents: DispatchEvents
) => {
  return Gesture.Pan()
    .runOnJS(true)
    .withTestId('RNGH-pan-handler')
    .maxPointers(1)
    .onBegin((e) => {
      dispatchEvents(['mousedown', 'mousemove'], e);
    })
    .onUpdate(
      throttle((e) => {
        dispatchEvents(['mousemove'], e);
      }, 50)
    )
    .onEnd((e) => {
      dispatchEvents(['mouseup'], e);
    });
};

export const getDefaultPinchRNGesture = (
  Gesture: RNGHType['Gesture'],
  dispatchEvents: DispatchEvents
) => {
  return Gesture.Pinch()
    .runOnJS(true)
    .withTestId('RNGH-pinch-handler')
    .onUpdate(
      throttle((e) => {
        dispatchEvents(['mousewheel'], e, {
          zrX: e.focalX,
          zrY: e.focalY,
          zrDelta: e.velocity / 20,
        });
      }, 50)
    );
};

export const getDefaultTapRNGesture = (
  Gesture: RNGHType['Gesture'],
  dispatchEvents: DispatchEvents
) => {
  return Gesture.Tap()
    .runOnJS(true)
    .withTestId('RNGH-tap-handler')
    .onStart((e) => {
      dispatchEvents(['mousedown', 'mousemove'], e);
    })
    .onEnd((e) => {
      dispatchEvents(['mouseup', 'click'], e);
    });
};

export const getDefaultRNGestures = (
  Gesture: RNGHType['Gesture'],
  dispatchEvents: DispatchEvents
): DefaultRNGestures => {
  return [
    getDefaultPanRNGesture(Gesture, dispatchEvents),
    getDefaultPinchRNGesture(Gesture, dispatchEvents),
    getDefaultTapRNGesture(Gesture, dispatchEvents),
  ];
};

type RNGestureHandlerProps = {
  RNGH: RNGHType;
  dispatchEvents: DispatchEvents;
  gesture?: RNGestureHandlerGesture;
};

export function RNGestureHandler({
  RNGH,
  dispatchEvents,
  gesture: gestureProp,
}: RNGestureHandlerProps) {
  const { Gesture, GestureDetector } = RNGH;
  const defaultGestures = useMemo(
    () => getDefaultRNGestures(Gesture, dispatchEvents),
    [dispatchEvents, Gesture]
  );
  const propGesture = useMemo(() => {
    if (!gestureProp) {
      return defaultGestures;
    }

    if (typeof gestureProp === 'function') {
      return gestureProp(defaultGestures, dispatchEvents);
    }

    return gestureProp;
  }, [defaultGestures, dispatchEvents, gestureProp]);
  const gesture = useMemo(() => {
    if (Array.isArray(propGesture)) {
      return Gesture.Race(...propGesture);
    }

    return propGesture;
  }, [Gesture, propGesture]);

  return (
    <GestureDetector gesture={gesture}>
      <View testID="gesture-handler" style={styles.GestureView} />
    </GestureDetector>
  );
}
