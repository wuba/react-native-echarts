"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RNSkAnimation = void 0;

var _RNSkClockValue = require("./RNSkClockValue");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RNSkAnimation extends _RNSkClockValue.RNSkClockValue {
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
    var _this$_animationState2;

    if (this._callback) {
      var _this$_animationState;

      this._animationState = this._callback(nextValue, this._animationState);

      if ((_this$_animationState = this._animationState) !== null && _this$_animationState !== void 0 && _this$_animationState.finished) {
        this.stop();
      }
    }

    super.update(((_this$_animationState2 = this._animationState) === null || _this$_animationState2 === void 0 ? void 0 : _this$_animationState2.current) ?? nextValue);
  }

}

exports.RNSkAnimation = RNSkAnimation;
//# sourceMappingURL=RNSkAnimation.js.map