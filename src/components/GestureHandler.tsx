import React, { memo } from 'react';
import { RNGestureHandler } from './RNGestureHandler';
import { PanResponderHandler } from './PanResponderHandler';
import type { DispatchEvents, GestureProps } from '../types';

let RNGH: any = null;

type GestureHandlerProps = GestureProps & {
  dispatchEvents: DispatchEvents;
};

export const GestureHandler = memo(function GestureHandler({
  dispatchEvents,
  gesture,
  useRNGH = false,
}: GestureHandlerProps) {
  if (useRNGH && RNGH) {
    return (
      <RNGestureHandler
        RNGH={RNGH}
        dispatchEvents={dispatchEvents}
        gesture={gesture}
      />
    );
  } else {
    return <PanResponderHandler dispatchEvents={dispatchEvents} />;
  }
});

try {
  RNGH = require('react-native-gesture-handler');
} catch (error) {
  console.warn(
    'react-native-gesture-handler is not installed. Falling back to PanResponder.'
  );
}
