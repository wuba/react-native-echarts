import * as React from 'react';
import { View } from 'react-native';
import { maybeInitializeFabric } from './init';
export default function GestureHandlerRootView(props) {
  // try initialize fabric on the first render, at this point we can
  // reliably check if fabric is enabled (the function contains a flag
  // to make sure it's called only once)
  maybeInitializeFabric();
  return /*#__PURE__*/React.createElement(View, props);
}
//# sourceMappingURL=GestureHandlerRootView.js.map