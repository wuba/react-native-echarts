import { tagMessage } from '../../utils';
let Reanimated;

try {
  Reanimated = require('react-native-reanimated');

  if (!Reanimated.useSharedValue) {
    // @ts-ignore Make sure the loaded module is actually Reanimated, if it's not
    // reset the module to undefined so we can fallback to the default implementation
    Reanimated = undefined;
    throw new Error('react-native-reanimated is not found');
  }

  if (!Reanimated.setGestureState) {
    Reanimated.setGestureState = () => {
      'worklet';

      console.warn(tagMessage('Please use newer version of react-native-reanimated in order to control state of the gestures.'));
    };
  } // When 'react-native-reanimated' is not available we want to
  // quietly continue
  // eslint-disable-next-line no-empty

} catch (e) {}

export { Reanimated };
//# sourceMappingURL=reanimatedWrapper.js.map