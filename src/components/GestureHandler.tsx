import React, { useState, useEffect } from 'react';
import { RNGestureHandler } from './RNGestureHandler';
import { PanResponderHandler } from './PanResponderHandler';

let RNGH: any = null;

export function GestureHandler({ zrenderId, children, useRNGH = false }: any) {
  const [RNGHAvailable, setRNGHAvailable] = useState(false);

  useEffect(() => {
    if (useRNGH) {
      try {
        RNGH = require('react-native-gesture-handler');
        setRNGHAvailable(true);
      } catch (error) {
        console.warn(
          'react-native-gesture-handler is not installed. Falling back to PanResponder.'
        );
        setRNGHAvailable(false);
      }
    }
  }, [useRNGH]);

  // 如果 useRNGH 为 true 且 RNGH 可用，则使用 RNGH
  if (useRNGH && RNGHAvailable && RNGH) {
    return (
      <RNGestureHandler RNGH={RNGH} zrenderId={zrenderId}>
        {children}
      </RNGestureHandler>
    );
  } else {
    // 如果 useRNGH 为 false 或 RNGH 不可用，则使用 PanResponder
    return (
      <PanResponderHandler zrenderId={zrenderId}>
        {children}
      </PanResponderHandler>
    );
  }
}
