function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { View } from 'react-native';
import React, { useState, useMemo, useRef } from 'react';
import { PanResponder } from 'react-native';
import { dispatchEvent, calcCenter, calcDistance } from './events';
import { styles } from './styles';
export function PanResponderHandler(_ref) {
  let {
    zrenderId
  } = _ref;
  const [panResponder] = usePanResponder(zrenderId);
  return /*#__PURE__*/React.createElement(View, _extends({}, panResponder.panHandlers, {
    style: styles.GestureView
  }));
}
export function usePanResponder(zrenderId) {
  const [zooming, setZooming] = useState(false);
  const [moving, setMoving] = useState(false);
  const pan = useRef({
    initialX: 0,
    initialY: 0,
    prevDistance: 0
  });
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: _ref2 => {
      let {
        nativeEvent
      } = _ref2;
      dispatchEvent(zrenderId, ['mousedown', 'mousemove'], nativeEvent);
    },
    onPanResponderMove: _ref3 => {
      let {
        nativeEvent
      } = _ref3;
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
        const [{
          locationX: x0,
          locationY: y0
        }, {
          locationX: x1,
          locationY: y1
        }] = touches;
        const distance = calcDistance(x0, y0, x1, y1);
        const {
          x,
          y
        } = calcCenter(x0, y0, x1, y1);
        if (!zooming) {
          pan.current = {
            initialX: x,
            initialY: y,
            prevDistance: distance
          };
          setZooming(true);
        } else {
          const {
            initialX,
            initialY,
            prevDistance
          } = pan.current;
          const delta = distance - prevDistance;
          pan.current.prevDistance = distance;
          dispatchEvent(zrenderId, ['mousewheel'], nativeEvent, {
            zrX: initialX,
            zrY: initialY,
            zrDelta: delta / 120
          });
        }
      }
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: _ref4 => {
      let {
        nativeEvent
      } = _ref4;
      if (!zooming) {
        dispatchEvent(zrenderId, ['mouseup', 'click'], nativeEvent);
      }
      setMoving(false);
      setZooming(false);
    },
    onPanResponderTerminate: () => {},
    onShouldBlockNativeResponder: () => {
      return false;
    }
  }), [moving, zooming, zrenderId, pan]);
  return [panResponder];
}
//# sourceMappingURL=PanResponderHandler.js.map