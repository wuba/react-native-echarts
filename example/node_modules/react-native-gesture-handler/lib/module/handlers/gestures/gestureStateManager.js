import { Reanimated } from './reanimatedWrapper';
import { State } from '../../State';
import { tagMessage } from '../../utils';
const warningMessage = tagMessage('react-native-reanimated is required in order to use synchronous state management'); // check if reanimated module is available, but look for useSharedValue as conditional
// require of reanimated can sometimes return content of `utils.ts` file (?)

const REANIMATED_AVAILABLE = (Reanimated === null || Reanimated === void 0 ? void 0 : Reanimated.useSharedValue) !== undefined;
const setGestureState = Reanimated === null || Reanimated === void 0 ? void 0 : Reanimated.setGestureState;
export const GestureStateManager = {
  create(handlerTag) {
    'worklet';

    return {
      begin: () => {
        'worklet';

        if (REANIMATED_AVAILABLE) {
          setGestureState(handlerTag, State.BEGAN);
        } else {
          console.warn(warningMessage);
        }
      },
      activate: () => {
        'worklet';

        if (REANIMATED_AVAILABLE) {
          setGestureState(handlerTag, State.ACTIVE);
        } else {
          console.warn(warningMessage);
        }
      },
      fail: () => {
        'worklet';

        if (REANIMATED_AVAILABLE) {
          setGestureState(handlerTag, State.FAILED);
        } else {
          console.warn(warningMessage);
        }
      },
      end: () => {
        'worklet';

        if (REANIMATED_AVAILABLE) {
          setGestureState(handlerTag, State.END);
        } else {
          console.warn(warningMessage);
        }
      }
    };
  }

};
//# sourceMappingURL=gestureStateManager.js.map