"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GestureHandler = _interopRequireDefault(require("./GestureHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ManualGestureHandler extends _GestureHandler.default {
  init(ref, propsRef) {
    super.init(ref, propsRef);
  }

  updateGestureConfig({
    enabled = true,
    ...props
  }) {
    super.updateGestureConfig({
      enabled: enabled,
      ...props
    });
  }

  onPointerDown(event) {
    this.tracker.addToTracker(event);
    super.onPointerDown(event);
    this.begin();
  }

  onPointerAdd(event) {
    this.tracker.addToTracker(event);
    super.onPointerAdd(event);
  }

  onPointerMove(event) {
    this.tracker.track(event);
    super.onPointerMove(event);
  }

  onPointerOutOfBounds(event) {
    this.tracker.track(event);
    super.onPointerOutOfBounds(event);
  }

  onPointerUp(event) {
    super.onPointerUp(event);
    this.tracker.removeFromTracker(event.pointerId);
  }

  onPointerRemove(event) {
    super.onPointerRemove(event);
    this.tracker.removeFromTracker(event.pointerId);
  }

  onPointerCancel(event) {
    super.onPointerCancel(event);
    this.reset();
  }

}

exports.default = ManualGestureHandler;
//# sourceMappingURL=ManualGestureHandler.js.map