function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { RNSkClockValue } from "./RNSkClockValue";
export class RNSkAnimation extends RNSkClockValue {
  constructor(callback, raf) {
    super(raf);

    _defineProperty(this, "_callback", void 0);

    _defineProperty(this, "_animationState", undefined);

    this._callback = callback;
  }

  cancel() {
    this.stop();
  }

  update(nextValue) {
    var _this$_animationState2, _this$_animationState3;

    if (this._callback) {
      var _this$_animationState;

      this._animationState = this._callback(nextValue, this._animationState);

      if ((_this$_animationState = this._animationState) !== null && _this$_animationState !== void 0 && _this$_animationState.finished) {
        this.stop();
      }
    }

    super.update((_this$_animationState2 = (_this$_animationState3 = this._animationState) === null || _this$_animationState3 === void 0 ? void 0 : _this$_animationState3.current) !== null && _this$_animationState2 !== void 0 ? _this$_animationState2 : nextValue);
  }

}
//# sourceMappingURL=RNSkAnimation.js.map