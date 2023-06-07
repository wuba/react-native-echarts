import React, { useMemo } from 'react';
import { View } from 'react-native';
import { dispatchEvent } from './events';
import { styles } from './styles';
function throttle(func, wait) {
  let lastExecution = 0;
  return function () {
    const now = Date.now();
    if (now - lastExecution >= wait) {
      lastExecution = now;
      func(...arguments);
    }
  };
}
export function RNGestureHandler(_ref) {
  let {
    zrenderId,
    RNGH
  } = _ref;
  const {
    Gesture,
    GestureDetector
  } = RNGH;
  const dragGesture = useMemo(() => Gesture.Pan().runOnJS(true).maxPointers(1).onBegin(e => {
    dispatchEvent(zrenderId, ['mousedown', 'mousemove'], e);
  }).onUpdate(throttle(e => {
    dispatchEvent(zrenderId, ['mousemove'], e);
  }, 50)).onEnd(e => {
    dispatchEvent(zrenderId, ['mouseup'], e);
  }), [Gesture, zrenderId]);
  const pinchGesture = useMemo(() => Gesture.Pinch().runOnJS(true).onUpdate(e => {
    dispatchEvent(zrenderId, ['mousewheel'], e, {
      zrX: e.focalX,
      zrY: e.focalY,
      zrDelta: e.velocity / 20
    });
  }), [Gesture, zrenderId]);
  const tapGesture = useMemo(() => Gesture.Tap().runOnJS(true).onStart(e => {
    dispatchEvent(zrenderId, ['mousedown', 'mousemove'], e);
  }).onEnd(e => {
    dispatchEvent(zrenderId, ['mouseup', 'click'], e);
  }), [Gesture, zrenderId]);
  const composed = Gesture.Race(pinchGesture, dragGesture, tapGesture);
  return /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: composed
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.GestureView
  }));
}
//# sourceMappingURL=RNGestureHandler.js.map