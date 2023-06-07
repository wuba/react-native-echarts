"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _State = require("../../State");

var _constants = require("../constants");

var _GestureHandler = _interopRequireDefault(require("./GestureHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NativeViewGestureHandler extends _GestureHandler.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buttonRole", void 0);

    _defineProperty(this, "shouldActivateOnStart", false);

    _defineProperty(this, "disallowInterruption", false);

    _defineProperty(this, "startX", 0);

    _defineProperty(this, "startY", 0);

    _defineProperty(this, "minDistSq", _constants.DEFAULT_TOUCH_SLOP * _constants.DEFAULT_TOUCH_SLOP);
  }

  init(ref, propsRef) {
    super.init(ref, propsRef);
    this.setShouldCancelWhenOutside(true);
    this.view.style['touchAction'] = 'auto'; //@ts-ignore Turns on defualt touch behavior on Safari

    this.view.style['WebkitTouchCallout'] = 'auto';

    if (this.view.hasAttribute('role')) {
      this.buttonRole = true;
    } else {
      this.buttonRole = false;
    }
  }

  updateGestureConfig({
    enabled = true,
    ...props
  }) {
    super.updateGestureConfig({
      enabled: enabled,
      ...props
    });

    if (this.config.shouldActivateOnStart !== undefined) {
      this.shouldActivateOnStart = this.config.shouldActivateOnStart;
    }

    if (this.config.disallowInterruption !== undefined) {
      this.disallowInterruption = this.config.disallowInterruption;
    }
  }

  resetConfig() {
    super.resetConfig();
  }

  onPointerDown(event) {
    this.tracker.addToTracker(event);
    super.onPointerDown(event);
    this.newPointerAction();
  }

  onPointerAdd(event) {
    this.tracker.addToTracker(event);
    super.onPointerAdd(event);
    this.newPointerAction();
  }

  newPointerAction() {
    this.startX = this.tracker.getLastAvgX();
    this.startY = this.tracker.getLastAvgY();

    if (this.currentState !== _State.State.UNDETERMINED) {
      return;
    }

    this.begin();

    if (this.buttonRole) {
      this.activate();
    }
  }

  onPointerMove(event) {
    this.tracker.track(event);
    const dx = this.startX - this.tracker.getLastAvgX();
    const dy = this.startY - this.tracker.getLastAvgY();
    const distSq = dx * dx + dy * dy;

    if (!this.buttonRole && distSq >= this.minDistSq && this.currentState === _State.State.BEGAN) {
      this.activate();
    }
  }

  onPointerOut() {
    this.cancel();
  }

  onPointerUp(event) {
    super.onPointerUp(event);
    this.onUp(event);
  }

  onPointerRemove(event) {
    super.onPointerRemove(event);
    this.onUp(event);
  }

  onUp(event) {
    this.tracker.removeFromTracker(event.pointerId);

    if (this.tracker.getTrackedPointersCount() === 0) {
      if (this.currentState === _State.State.ACTIVE) {
        this.end();
      } else {
        this.fail();
      }
    }
  }

  onPointerCancel(event) {
    super.onPointerCancel(event);
    this.cancel();
    this.reset();
  }

  shouldRecognizeSimultaneously(handler) {
    if (super.shouldRecognizeSimultaneously(handler)) {
      return true;
    }

    if (handler instanceof NativeViewGestureHandler && handler.getState() === _State.State.ACTIVE && handler.disallowsInterruption()) {
      return false;
    }

    const canBeInterrupted = !this.disallowInterruption;

    if (this.currentState === _State.State.ACTIVE && handler.getState() === _State.State.ACTIVE && canBeInterrupted) {
      return false;
    }

    return this.currentState === _State.State.ACTIVE && canBeInterrupted && handler.getTag() > 0;
  }

  shouldBeCancelledByOther(_handler) {
    return !this.disallowInterruption;
  }

  disallowsInterruption() {
    return this.disallowInterruption;
  }

}

exports.default = NativeViewGestureHandler;
//# sourceMappingURL=NativeViewGestureHandler.js.map