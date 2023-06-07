/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import { requireNativeComponent } from 'react-native';
import { maybeInitializeFabric } from './init';
import { shouldUseCodegenNativeComponent } from './utils';
const GestureHandlerRootViewNativeComponent = shouldUseCodegenNativeComponent() ? require('./fabric/RNGestureHandlerRootViewNativeComponent').default : requireNativeComponent('RNGestureHandlerRootView');
export default function GestureHandlerRootView(props) {
  // try initialize fabric on the first render, at this point we can
  // reliably check if fabric is enabled (the function contains a flag
  // to make sure it's called only once)
  maybeInitializeFabric();
  return /*#__PURE__*/React.createElement(GestureHandlerRootViewNativeComponent, props);
}
//# sourceMappingURL=GestureHandlerRootView.android.js.map