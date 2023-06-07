function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { State } from '../../State';
import GestureHandler from './GestureHandler';
const DEFAULT_MIN_DURATION_MS = 500;
const DEFAULT_MAX_DIST_DP = 10;
const SCALING_FACTOR = 10;
export default class LongPressGestureHandler extends GestureHandler {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "minDurationMs", DEFAULT_MIN_DURATION_MS);

    _defineProperty(this, "defaultMaxDistSq", DEFAULT_MAX_DIST_DP * SCALING_FACTOR);

    _defineProperty(this, "maxDistSq", this.defaultMaxDistSq);

    _defineProperty(this, "startX", 0);

    _defineProperty(this, "startY", 0);

    _defineProperty(this, "startTime", 0);

    _defineProperty(this, "previousTime", 0);

    _defineProperty(this, "activationTimeout", void 0);
  }

  init(ref, propsRef) {
    super.init(ref, propsRef);

    this.view.oncontextmenu = () => false;
  }

  transformNativeEvent() {
    const rect = this.view.getBoundingClientRect();
    return {
      x: this.tracker.getLastAvgX() - rect.left,
      y: this.tracker.getLastAvgY() - rect.top,
      absoluteX: this.tracker.getLastAvgX(),
      absoluteY: this.tracker.getLastAvgY(),
      duration: Date.now() - this.startTime
    };
  }

  updateGestureConfig({
    enabled = true,
    ...props
  }) {
    super.updateGestureConfig({
      enabled: enabled,
      ...props
    });

    if (this.config.minDurationMs !== undefined) {
      this.minDurationMs = this.config.minDurationMs;
    }

    if (this.config.maxDist !== undefined) {
      this.maxDistSq = this.config.maxDist * this.config.maxDist;
    }
  }

  resetConfig() {
    super.resetConfig();
    this.minDurationMs = DEFAULT_MIN_DURATION_MS;
    this.maxDistSq = this.defaultMaxDistSq;
  }

  onStateChange(_newState, _oldState) {
    clearTimeout(this.activationTimeout);
  }

  onPointerDown(event) {
    this.tracker.addToTracker(event);
    super.onPointerDown(event);
    this.tryBegin(event);
    this.tryActivate();
    this.checkDistanceFail(event);
  }

  onPointerMove(event) {
    super.onPointerMove(event);
    this.tracker.track(event);
    this.checkDistanceFail(event);
  }

  onPointerUp(event) {
    super.onPointerUp(event);
    this.tracker.removeFromTracker(event.pointerId);

    if (this.currentState === State.ACTIVE) {
      this.end();
    } else {
      this.fail();
    }
  }

  tryBegin(event) {
    if (this.currentState !== State.UNDETERMINED) {
      return;
    }

    this.previousTime = Date.now();
    this.startTime = this.previousTime;
    this.begin();
    this.startX = event.x;
    this.startY = event.y;
  }

  tryActivate() {
    if (this.minDurationMs > 0) {
      this.activationTimeout = setTimeout(() => {
        this.activate();
      }, this.minDurationMs);
    } else if (this.minDurationMs === 0) {
      this.activate();
    }
  }

  checkDistanceFail(event) {
    const dx = event.x - this.startX;
    const dy = event.y - this.startY;
    const distSq = dx * dx + dy * dy;

    if (distSq <= this.maxDistSq) {
      return;
    }

    if (this.currentState === State.ACTIVE) {
      this.cancel();
    } else {
      this.fail();
    }
  }

}
//# sourceMappingURL=LongPressGestureHandler.js.map