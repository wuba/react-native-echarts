"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _State = require("../../State");

var _GestureHandler = _interopRequireDefault(require("./GestureHandler"));

var _RotationGestureDetector = _interopRequireDefault(require("../detectors/RotationGestureDetector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ROTATION_RECOGNITION_THRESHOLD = Math.PI / 36;

class RotationGestureHandler extends _GestureHandler.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "rotation", 0);

    _defineProperty(this, "velocity", 0);

    _defineProperty(this, "cachedAnchorX", 0);

    _defineProperty(this, "cachedAnchorY", 0);

    _defineProperty(this, "rotationGestureListener", {
      onRotationBegin: _detector => true,
      onRotation: detector => {
        const previousRotation = this.rotation;
        this.rotation += detector.getRotation();
        const delta = detector.getTimeDelta();

        if (delta > 0) {
          this.velocity = (this.rotation - previousRotation) / delta;
        }

        if (Math.abs(this.rotation) >= ROTATION_RECOGNITION_THRESHOLD && this.currentState === _State.State.BEGAN) {
          this.activate();
        }

        return true;
      },
      onRotationEnd: _detector => {
        this.end();
      }
    });

    _defineProperty(this, "rotationGestureDetector", new _RotationGestureDetector.default(this.rotationGestureListener));
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
      rotation: this.rotation ? this.rotation : 0,
      anchorX: this.getAnchorX(),
      anchorY: this.getAnchorY(),
      velocity: this.velocity ? this.velocity : 0
    };
  }

  getAnchorX() {
    const anchorX = this.rotationGestureDetector.getAnchorX();
    return anchorX ? anchorX : this.cachedAnchorX;
  }

  getAnchorY() {
    const anchorY = this.rotationGestureDetector.getAnchorY();
    return anchorY ? anchorY : this.cachedAnchorY;
  }

  onPointerDown(event) {
    this.tracker.addToTracker(event);
    super.onPointerDown(event);
  }

  onPointerAdd(event) {
    this.tracker.addToTracker(event);
    super.onPointerAdd(event);
    this.tryBegin();
    this.rotationGestureDetector.onTouchEvent(event, this.tracker);
  }

  onPointerMove(event) {
    if (this.tracker.getTrackedPointersCount() < 2) {
      return;
    }

    if (this.getAnchorX()) {
      this.cachedAnchorX = this.getAnchorX();
    }

    if (this.getAnchorY()) {
      this.cachedAnchorY = this.getAnchorY();
    }

    this.tracker.track(event);
    this.rotationGestureDetector.onTouchEvent(event, this.tracker);
    super.onPointerMove(event);
  }

  onPointerOutOfBounds(event) {
    if (this.tracker.getTrackedPointersCount() < 2) {
      return;
    }

    if (this.getAnchorX()) {
      this.cachedAnchorX = this.getAnchorX();
    }

    if (this.getAnchorY()) {
      this.cachedAnchorY = this.getAnchorY();
    }

    this.tracker.track(event);
    this.rotationGestureDetector.onTouchEvent(event, this.tracker);
    super.onPointerOutOfBounds(event);
  }

  onPointerUp(event) {
    super.onPointerUp(event);
    this.tracker.removeFromTracker(event.pointerId);
    this.rotationGestureDetector.onTouchEvent(event, this.tracker);

    if (this.currentState !== _State.State.ACTIVE) {
      return;
    }

    if (this.currentState === _State.State.ACTIVE) {
      this.end();
    } else {
      this.fail();
    }
  }

  onPointerRemove(event) {
    super.onPointerRemove(event);
    this.rotationGestureDetector.onTouchEvent(event, this.tracker);
    this.tracker.removeFromTracker(event.pointerId);
  }

  onPointerCancel(event) {
    super.onPointerCancel(event);
    this.end();
    this.reset();
  }

  tryBegin() {
    if (this.currentState !== _State.State.UNDETERMINED) {
      return;
    }

    this.begin();
  }

  activate(_force) {
    super.activate();
  }

  onReset() {
    if (this.currentState === _State.State.ACTIVE) {
      return;
    }

    this.rotation = 0;
    this.velocity = 0;
    this.rotationGestureDetector.reset();
  }

}

exports.default = RotationGestureHandler;
//# sourceMappingURL=RotationGestureHandler.js.map