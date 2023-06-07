"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureStateManager = void 0;

var _reanimatedWrapper = require("./reanimatedWrapper");

var _State = require("../../State");

var _utils = require("../../utils");

const warningMessage = (0, _utils.tagMessage)('react-native-reanimated is required in order to use synchronous state management'); // check if reanimated module is available, but look for useSharedValue as conditional
// require of reanimated can sometimes return content of `utils.ts` file (?)

const REANIMATED_AVAILABLE = (_reanimatedWrapper.Reanimated === null || _reanimatedWrapper.Reanimated === void 0 ? void 0 : _reanimatedWrapper.Reanimated.useSharedValue) !== undefined;
const setGestureState = _reanimatedWrapper.Reanimated === null || _reanimatedWrapper.Reanimated === void 0 ? void 0 : _reanimatedWrapper.Reanimated.setGestureState;
const GestureStateManager = {
  create(handlerTag) {
    'worklet';

    return {
      begin: () => {
        'worklet';

        if (REANIMATED_AVAILABLE) {
          setGestureState(handlerTag, _State.State.BEGAN);
        } else {
          console.warn(warningMessage);
        }
      },
      activate: () => {
        'worklet';

        if (REANIMATED_AVAILABLE) {
          setGestureState(handlerTag, _State.State.ACTIVE);
        } else {
          console.warn(warningMessage);
        }
      },
      fail: () => {
        'worklet';

        if (REANIMATED_AVAILABLE) {
          setGestureState(handlerTag, _State.State.FAILED);
        } else {
          console.warn(warningMessage);
        }
      },
      end: () => {
        'worklet';

        if (REANIMATED_AVAILABLE) {
          setGestureState(handlerTag, _State.State.END);
        } else {
          console.warn(warningMessage);
        }
      }
    };
  }

};
exports.GestureStateManager = GestureStateManager;
//# sourceMappingURL=gestureStateManager.js.map