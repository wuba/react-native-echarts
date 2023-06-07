function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { DrawerLayoutAndroid as RNDrawerLayoutAndroid, FlatList as RNFlatList, Switch as RNSwitch, TextInput as RNTextInput, ScrollView as RNScrollView, View } from 'react-native';
import createNativeWrapper from '../handlers/createNativeWrapper';
export const ScrollView = createNativeWrapper(RNScrollView, {
  disallowInterruption: false
});
export const Switch = createNativeWrapper(RNSwitch, {
  shouldCancelWhenOutside: false,
  shouldActivateOnStart: true,
  disallowInterruption: true
});
export const TextInput = createNativeWrapper(RNTextInput);
export const DrawerLayoutAndroid = createNativeWrapper(RNDrawerLayoutAndroid, {
  disallowInterruption: true
}); // @ts-ignore -- TODO(TS) to investigate if it's needed

DrawerLayoutAndroid.positions = RNDrawerLayoutAndroid.positions; // RefreshControl is implemented as a functional component, rendering a View
// NativeViewGestureHandler needs to set a ref on its child, which cannot be done
// on functional components

export const RefreshControl = createNativeWrapper(View);
export const FlatList = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(RNFlatList, _extends({
  ref: ref
}, props, {
  renderScrollComponent: scrollProps => /*#__PURE__*/React.createElement(ScrollView, scrollProps)
})));
//# sourceMappingURL=GestureComponents.web.js.map