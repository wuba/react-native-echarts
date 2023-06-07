import React, { memo } from 'react';
import { RNGestureHandler } from './RNGestureHandler';
import { PanResponderHandler } from './PanResponderHandler';
let RNGH = null;
try {
  RNGH = require('react-native-gesture-handler');
} catch (error) {
  console.warn('react-native-gesture-handler is not installed. Falling back to PanResponder.');
}
export const GestureHandler = /*#__PURE__*/memo(function GestureHandler(_ref) {
  let {
    zrenderId,
    useRNGH = false
  } = _ref;
  if (useRNGH && RNGH) {
    return /*#__PURE__*/React.createElement(RNGestureHandler, {
      RNGH: RNGH,
      zrenderId: zrenderId
    });
  } else {
    return /*#__PURE__*/React.createElement(PanResponderHandler, {
      zrenderId: zrenderId
    });
  }
});
//# sourceMappingURL=GestureHandler.js.map