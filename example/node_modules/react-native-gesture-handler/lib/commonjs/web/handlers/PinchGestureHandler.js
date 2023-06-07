"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _State = require("../../State");

var _constants = require("../constants");

var _GestureHandler = _interopRequireDefault(require("./GestureHandler"));

var _ScaleGestureDetector = _interopRequireDefault(require("../detectors/ScaleGestureDetector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PinchGestureHandler extends _GestureHandler.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "scale", 1);

    _defineProperty(this, "velocity", 0);

    _defineProperty(this, "startingSpan", 0);

    _defineProperty(this, "spanSlop", _constants.DEFAULT_TOUCH_SLOP);

    _defineProperty(this, "scaleDetectorListener", {
      onScaleBegin: detector => {
        this.startingSpan = detector.getCurrentSpan();
        return true;
      },
      onScale: detector => {
        const prevScaleFactor = this.scale;
        this.scale *= detector.getScaleFactor(this.tracker.getTrackedPointersCount());
        const delta = detector.getTimeDelta();

        if (delta > 0) {
          this.velocity = (this.scale - prevScaleFactor) / delta;
        }

        if (Math.abs(this.startingSpan - detector.getCurrentSpan()) >= this.spanSlop && this.currentState === _State.State.BEGAN) {
          this.activate();
        }

        return true;
      },
      onScaleEnd: _detector => {}
    });

    _defineProperty(this, "scaleGestureDetector", new _ScaleGestureDetector.default(this.scaleDetectorListener));
  }

  init(ref, propsRef) {
    super.init(ref, propsRef);
    this.setShouldCancelWhenOutside(false);
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

  transformNativeEvent() {
    return {
      focalX: this.scaleGestureDetector.getFocusX(),
      focalY: this.scaleGestureDetector.getFocusY(),
      velocity: this.velocity,
      scale: this.scale
    };
  }

  onPointerDown(event) {
    this.tracker.addToTracker(event);
    super.onPointerDown(event);
  }

  onPointerAdd(event) {
    this.tracker.addToTracker(event);
    super.onPointerAdd(event);
    this.tryBegin();
    this.scaleGestureDetector.onTouchEvent(event, this.tracker);
  }

  onPointerUp(event) {
    super.onPointerUp(event);
    this.tracker.removeFromTracker(event.pointerId);

    if (this.currentState !== _State.State.ACTIVE) {
      return;
    }

    this.scaleGestureDetector.onTouchEvent(event, this.tracker);

    if (this.currentState === _State.State.ACTIVE) {
      this.end();
    } else {
      this.fail();
    }
  }

  onPointerRemove(event) {
    super.onPointerRemove(event);
    this.scaleGestureDetector.onTouchEvent(event, this.tracker);
    this.tracker.removeFromTracker(event.pointerId);

    if (this.currentState === _State.State.ACTIVE && this.tracker.getTrackedPointersCount() < 2) {
      this.end();
    }
  }

  onPointerMove(event) {
    if (this.tracker.getTrackedPointersCount() < 2) {
      return;
    }

    this.tracker.track(event);
    this.scaleGestureDetector.onTouchEvent(event, this.tracker);
    super.onPointerMove(event);
  }

  onPointerOutOfBounds(event) {
    if (this.tracker.getTrackedPointersCount() < 2) {
      return;
    }

    this.tracker.track(event);
    this.scaleGestureDetector.onTouchEvent(event, this.tracker);
    super.onPointerOutOfBounds(event);
  }

  onPointerCancel(event) {
    super.onPointerCancel(event);
    this.reset();
  }

  tryBegin() {
    if (this.currentState !== _State.State.UNDETERMINED) {
      return;
    }

    this.resetProgress();
    this.begin();
  }

  activate(force) {
    if (this.currentState !== _State.State.ACTIVE) {
      this.resetProgress();
    }

    super.activate(force);
  }

  onReset() {
    this.resetProgress();
  }

  resetProgress() {
    if (this.currentState === _State.State.ACTIVE) {
      return;
    }

    this.velocity = 0;
    this.scale = 1;
  }

}

exports.default = PinchGestureHandler;
//# sourceMappingURL=PinchGestureHandler.js.map