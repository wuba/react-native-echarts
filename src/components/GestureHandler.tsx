import React, { memo } from 'react';
import { RNGestureHandler } from './RNGestureHandler';
import { PanResponderHandler } from './PanResponderHandler';

let RNGH: any = null;
try {
  RNGH = require('react-native-gesture-handler');
} catch (error) {
  console.warn(
    'react-native-gesture-handler is not installed. Falling back to PanResponder.'
  );
}

export const GestureHandler = memo(function GestureHandler({
  zrenderId,
  useRNGH = false,
}: any) {
  if (useRNGH && RNGH) {
    return <RNGestureHandler RNGH={RNGH} zrenderId={zrenderId} />;
  } else {
    return <PanResponderHandler zrenderId={zrenderId} />;
  }
});
