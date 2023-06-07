function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { State } from '../../State';
import { Direction } from '../constants';
import GestureHandler from './GestureHandler';
const DEFAULT_MAX_DURATION_MS = 800;
const DEFAULT_MIN_ACCEPTABLE_DELTA = 160;
const DEFAULT_DIRECTION = Direction.RIGHT;
const DEFAULT_NUMBER_OF_TOUCHES_REQUIRED = 1;
export default class FlingGestureHandler extends GestureHandler {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "numberOfPointersRequired", DEFAULT_NUMBER_OF_TOUCHES_REQUIRED);

    _defineProperty(this, "direction", DEFAULT_DIRECTION);

    _defineProperty(this, "maxDurationMs", DEFAULT_MAX_DURATION_MS);

    _defineProperty(this, "minAcceptableDelta", DEFAULT_MIN_ACCEPTABLE_DELTA);

    _defineProperty(this, "delayTimeout", void 0);

    _defineProperty(this, "startX", 0);

    _defineProperty(this, "startY", 0);

    _defineProperty(this, "maxNumberOfPointersSimultaneously", 0);

    _defineProperty(this, "keyPointer", NaN);
  }

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

    if (this.config.direction) {
      this.direction = this.config.direction;
    }

    if (this.config.numberOfPointers) {
      this.numberOfPointersRequired = this.config.numberOfPointers;
    }
  }

  transformNativeEvent() {
    const rect = this.view.getBoundingClientRect();
    return {
      x: this.tracker.getLastAvgX() - rect.left,
      y: this.tracker.getLastAvgY() - rect.top,
      absoluteX: this.tracker.getLastAvgX(),
      absoluteY: this.tracker.getLastAvgY()
    };
  }

  startFling() {
    this.startX = this.tracker.getLastX(this.keyPointer);
    this.startY = this.tracker.getLastY(this.keyPointer);
    this.begin();
    this.maxNumberOfPointersSimultaneously = 1;
    this.delayTimeout = setTimeout(() => this.fail(), this.maxDurationMs);
  }

  tryEndFling() {
    if (this.maxNumberOfPointersSimultaneously === this.numberOfPointersRequired && (this.direction & Direction.RIGHT && this.tracker.getLastX(this.keyPointer) - this.startX > this.minAcceptableDelta || this.direction & Direction.LEFT && this.startX - this.tracker.getLastX(this.keyPointer) > this.minAcceptableDelta || this.direction & Direction.UP && this.startY - this.tracker.getLastY(this.keyPointer) > this.minAcceptableDelta || this.direction & Direction.DOWN && this.tracker.getLastY(this.keyPointer) - this.startY > this.minAcceptableDelta)) {
      clearTimeout(this.delayTimeout);
      this.activate();
      return true;
    }

    return false;
  }

  endFling() {
    if (!this.tryEndFling()) {
      this.fail();
    }
  }

  onPointerDown(event) {
    this.tracker.addToTracker(event);
    this.keyPointer = event.pointerId;
    super.onPointerDown(event);
    this.newPointerAction();
  }

  onPointerAdd(event) {
    this.tracker.addToTracker(event);
    super.onPointerAdd(event);
    this.newPointerAction();
  }

  newPointerAction() {
    if (this.currentState === State.UNDETERMINED) {
      this.startFling();
    }

    if (this.currentState !== State.BEGAN) {
      return;
    }

    this.tryEndFling();

    if (this.tracker.getTrackedPointersCount() > this.maxNumberOfPointersSimultaneously) {
      this.maxNumberOfPointersSimultaneously = this.tracker.getTrackedPointersCount();
    }
  }

  onPointerMove(event) {
    this.tracker.track(event);

    if (this.currentState !== State.BEGAN) {
      return;
    }

    this.tryEndFling();
    super.onPointerMove(event);
  }

  onPointerUp(event) {
    super.onPointerUp(event);
    this.onUp(event);
    this.keyPointer = NaN;
  }

  onPointerRemove(event) {
    super.onPointerRemove(event);
    this.onUp(event);
  }

  onUp(event) {
    this.tracker.removeFromTracker(event.pointerId);

    if (this.currentState !== State.BEGAN) {
      return;
    }

    this.endFling();
  }

  onPointerCancel(event) {
    super.onPointerCancel(event);
    this.reset();
  }

  activate(force) {
    super.activate(force);
    this.end();
  }

  resetConfig() {
    super.resetConfig();
    this.numberOfPointersRequired = DEFAULT_NUMBER_OF_TOUCHES_REQUIRED;
    this.direction = DEFAULT_DIRECTION;
  }

}
//# sourceMappingURL=FlingGestureHandler.js.map