import { RNSkAnimation } from "./RNSkAnimation";
import { RNSkClockValue } from "./RNSkClockValue";
import { RNSkComputedValue } from "./RNSkComputedValue";
import { RNSkValue } from "./RNSkValue";
export const ValueApi = {
  createValue: function (initialValue) {
    return new RNSkValue(initialValue);
  },
  createComputedValue: function (cb, values) {
    return new RNSkComputedValue(cb, values);
  },
  createClockValue: function () {
    return new RNSkClockValue(requestAnimationFrame.bind(window));
  },
  createAnimation: function (cb) {
    return new RNSkAnimation(cb, requestAnimationFrame.bind(window));
  }
};
//# sourceMappingURL=api.js.map