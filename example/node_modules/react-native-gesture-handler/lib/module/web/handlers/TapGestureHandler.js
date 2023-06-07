function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { State } from '../../State';
import { EventTypes } from '../interfaces';
import GestureHandler from './GestureHandler';
const DEFAULT_MAX_DURATION_MS = 500;
const DEFAULT_MAX_DELAY_MS = 500;
const DEFAULT_NUMBER_OF_TAPS = 1;
const DEFAULT_MIN_NUMBER_OF_POINTERS = 1;
export default class TapGestureHandler extends GestureHandler {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "maxDeltaX", Number.MIN_SAFE_INTEGER);

    _defineProperty(this, "maxDeltaY", Number.MIN_SAFE_INTEGER);

    _defineProperty(this, "maxDistSq", Number.MIN_SAFE_INTEGER);

    _defineProperty(this, "maxDurationMs", DEFAULT_MAX_DURATION_MS);

    _defineProperty(this, "maxDelayMs", DEFAULT_MAX_DELAY_MS);

    _defineProperty(this, "numberOfTaps", DEFAULT_NUMBER_OF_TAPS);

    _defineProperty(this, "minNumberOfPointers", DEFAULT_MIN_NUMBER_OF_POINTERS);

    _defineProperty(this, "currentMaxNumberOfPointers", 1);

    _defineProperty(this, "startX", 0);

    _defineProperty(this, "startY", 0);

    _defineProperty(this, "offsetX", 0);

    _defineProperty(this, "offsetY", 0);

    _defineProperty(this, "lastX", 0);

    _defineProperty(this, "lastY", 0);

    _defineProperty(this, "waitTimeout", void 0);

    _defineProperty(this, "delayTimeout", void 0);

    _defineProperty(this, "tapsSoFar", 0);
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

    if (this.config.numberOfTaps !== undefined) {
      this.numberOfTaps = this.config.numberOfTaps;
    }

    if (this.config.maxDurationMs !== undefined) {
      this.maxDurationMs = this.config.maxDurationMs;
    }

    if (this.config.maxDelayMs !== undefined) {
      this.maxDelayMs = this.config.maxDelayMs;
    }

    if (this.config.maxDeltaX !== undefined) {
      this.maxDeltaX = this.config.maxDeltaX;
    }

    if (this.config.maxDeltaY !== undefined) {
      this.maxDeltaY = this.config.maxDeltaY;
    }

    if (this.config.maxDist !== undefined) {
      this.maxDistSq = this.config.maxDist * this.config.maxDist;
    }

    if (this.config.minPointers !== undefined) {
      this.minNumberOfPointers = this.config.minPointers;
    }
  }

  resetConfig() {
    super.resetConfig();
    this.maxDeltaX = Number.MIN_SAFE_INTEGER;
    this.maxDeltaY = Number.MIN_SAFE_INTEGER;
    this.maxDistSq = Number.MIN_SAFE_INTEGER;
    this.maxDurationMs = DEFAULT_MAX_DURATION_MS;
    this.maxDelayMs = DEFAULT_MAX_DELAY_MS;
    this.numberOfTaps = DEFAULT_NUMBER_OF_TAPS;
    this.minNumberOfPointers = DEFAULT_MIN_NUMBER_OF_POINTERS;
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

  clearTimeouts() {
    clearTimeout(this.waitTimeout);
    clearTimeout(this.delayTimeout);
  }

  startTap() {
    this.clearTimeouts();
    this.waitTimeout = setTimeout(() => this.fail(), this.maxDurationMs);
  }

  endTap() {
    this.clearTimeouts();

    if (++this.tapsSoFar === this.numberOfTaps && this.currentMaxNumberOfPointers >= this.minNumberOfPointers) {
      this.activate();
    } else {
      this.delayTimeout = setTimeout(() => this.fail(), this.maxDelayMs);
    }
  } //Handling Events


  onPointerDown(event) {
    this.tracker.addToTracker(event);
    super.onPointerDown(event);
    this.trySettingPosition(event);
    this.startX = event.x;
    this.startY = event.y;
    this.lastX = event.x;
    this.lastY = event.y;
    this.updateState(event);
  }

  onPointerAdd(event) {
    super.onPointerAdd(event);
    this.tracker.addToTracker(event);
    this.trySettingPosition(event);
    this.offsetX += this.lastX - this.startX;
    this.offsetY += this.lastY - this.startY;
    this.lastX = this.tracker.getLastAvgX();
    this.lastY = this.tracker.getLastAvgY();
    this.startX = this.tracker.getLastAvgX();
    this.startY = this.tracker.getLastAvgY();
    this.updateState(event);
  }

  onPointerUp(event) {
    super.onPointerUp(event);
    this.lastX = this.tracker.getLastAvgX();
    this.lastY = this.tracker.getLastAvgY();
    this.tracker.removeFromTracker(event.pointerId);
    this.updateState(event);
  }

  onPointerRemove(event) {
    super.onPointerRemove(event);
    this.tracker.removeFromTracker(event.pointerId);
    this.offsetX += this.lastX - this.startX;
    this.offsetY += this.lastY = this.startY;
    this.lastX = this.tracker.getLastAvgX();
    this.lastY = this.tracker.getLastAvgY();
    this.startX = this.lastX;
    this.startY = this.lastY;
    this.updateState(event);
  }

  onPointerMove(event) {
    this.trySettingPosition(event);
    this.tracker.track(event);
    this.lastX = this.tracker.getLastAvgX();
    this.lastY = this.tracker.getLastAvgY();
    this.updateState(event);
    super.onPointerMove(event);
  }

  onPointerOutOfBounds(event) {
    this.trySettingPosition(event);
    this.tracker.track(event);
    this.lastX = this.tracker.getLastAvgX();
    this.lastY = this.tracker.getLastAvgY();
    this.updateState(event);
    super.onPointerOutOfBounds(event);
  }

  onPointerCancel(event) {
    super.onPointerCancel(event);
    this.tracker.resetTracker();
    this.fail();
  }

  updateState(event) {
    if (this.currentMaxNumberOfPointers < this.tracker.getTrackedPointersCount()) {
      this.currentMaxNumberOfPointers = this.tracker.getTrackedPointersCount();
    }

    if (this.shouldFail()) {
      this.fail();
      return;
    }

    switch (this.currentState) {
      case State.UNDETERMINED:
        if (event.eventType === EventTypes.DOWN) {
          this.begin();
        }

        this.startTap();
        break;

      case State.BEGAN:
        if (event.eventType === EventTypes.UP) {
          this.endTap();
        }

        if (event.eventType === EventTypes.DOWN) {
          this.startTap();
        }

        break;

      default:
        break;
    }
  }

  trySettingPosition(event) {
    if (this.currentState !== State.UNDETERMINED) {
      return;
    }

    this.offsetX = 0;
    this.offsetY = 0;
    this.startX = event.x;
    this.startY = event.y;
  }

  shouldFail() {
    const dx = this.lastX - this.startX + this.offsetX;

    if (this.maxDeltaX !== Number.MIN_SAFE_INTEGER && Math.abs(dx) > this.maxDeltaX) {
      return true;
    }

    const dy = this.lastY - this.startY + this.offsetY;

    if (this.maxDeltaY !== Number.MIN_SAFE_INTEGER && Math.abs(dy) > this.maxDeltaY) {
      return true;
    }

    const distSq = dy * dy + dx * dx;
    return this.maxDistSq !== Number.MIN_SAFE_INTEGER && distSq > this.maxDistSq;
  }

  activate() {
    super.activate();
    this.end();
  }

  onCancel() {
    this.resetProgress();
    this.clearTimeouts();
  }

  resetProgress() {
    this.clearTimeouts();
    this.tapsSoFar = 0;
    this.currentMaxNumberOfPointers = 0;
  }

}
//# sourceMappingURL=TapGestureHandler.js.map