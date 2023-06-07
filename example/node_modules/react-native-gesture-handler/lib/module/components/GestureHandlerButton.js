/* eslint-disable @typescript-eslint/no-var-requires */
import { requireNativeComponent } from 'react-native';
import { shouldUseCodegenNativeComponent } from '../utils';
const RNGestureHandlerButtonNativeComponent = shouldUseCodegenNativeComponent() ? require('../fabric/RNGestureHandlerButtonNativeComponent').default : requireNativeComponent('RNGestureHandlerButton');
export default RNGestureHandlerButtonNativeComponent;
//# sourceMappingURL=GestureHandlerButton.js.map