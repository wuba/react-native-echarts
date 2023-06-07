function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DEFAULT_TOUCH_SLOP } from '../constants';
import { EventTypes } from '../interfaces';
export default class ScaleGestureDetector {
  constructor(callbacks) {
    _defineProperty(this, "onScaleBegin", void 0);

    _defineProperty(this, "onScale", void 0);

    _defineProperty(this, "onScaleEnd", void 0);

    _defineProperty(this, "focusX", void 0);

    _defineProperty(this, "focusY", void 0);

    _defineProperty(this, "currentSpan", void 0);

    _defineProperty(this, "prevSpan", void 0);

    _defineProperty(this, "initialSpan", void 0);

    _defineProperty(this, "currentTime", void 0);

    _defineProperty(this, "prevTime", void 0);

    _defineProperty(this, "inProgress", false);

    _defineProperty(this, "spanSlop", void 0);

    _defineProperty(this, "minSpan", void 0);

    this.onScaleBegin = callbacks.onScaleBegin;
    this.onScale = callbacks.onScale;
    this.onScaleEnd = callbacks.onScaleEnd;
    this.spanSlop = DEFAULT_TOUCH_SLOP * 2;
    this.minSpan = 0;
  }

  onTouchEvent(event, tracker) {
    this.currentTime = event.time;
    const action = event.eventType;
    const numOfPointers = tracker.getTrackedPointersCount();
    const streamComplete = action === EventTypes.UP || action === EventTypes.ADDITIONAL_POINTER_UP || action === EventTypes.CANCEL;

    if (action === EventTypes.DOWN || streamComplete) {
      if (this.inProgress) {
        this.onScaleEnd(this);
        this.inProgress = false;
        this.initialSpan = 0;
      }

      if (streamComplete) {
        return true;
      }
    }

    const configChanged = action === EventTypes.DOWN || action === EventTypes.ADDITIONAL_POINTER_UP || action === EventTypes.ADDITIONAL_POINTER_DOWN;
    const pointerUp = action === EventTypes.ADDITIONAL_POINTER_UP;
    const ignoredPointer = pointerUp ? event.pointerId : undefined; //Determine focal point

    const div = pointerUp ? numOfPointers - 1 : numOfPointers;
    const sumX = tracker.getSumX(ignoredPointer);
    const sumY = tracker.getSumY(ignoredPointer);
    const focusX = sumX / div;
    const focusY = sumY / div; //Determine average deviation from focal point

    let devSumX = 0;
    let devSumY = 0;
    tracker.getData().forEach((value, key) => {
      if (key === ignoredPointer) {
        return;
      }

      devSumX += Math.abs(value.lastX - focusX);
      devSumY += Math.abs(value.lastY - focusY);
    });
    const devX = devSumX / div;
    const devY = devSumY / div;
    const spanX = devX * 2;
    const spanY = devY * 2;
    const span = Math.hypot(spanX, spanY); //Begin/end events

    const wasInProgress = this.inProgress;
    this.focusX = focusX;
    this.focusY = focusY;

    if (this.inProgress && (span < this.minSpan || configChanged)) {
      this.onScaleEnd(this);
      this.inProgress = false;
      this.initialSpan = span;
    }

    if (configChanged) {
      this.initialSpan = this.prevSpan = this.currentSpan = span;
    }

    if (!this.inProgress && span >= this.minSpan && (wasInProgress || Math.abs(span - this.initialSpan) > this.spanSlop)) {
      this.prevSpan = this.currentSpan = span;
      this.prevTime = this.currentTime;
      this.inProgress = this.onScaleBegin(this);
    } //Handle motion


    if (action !== EventTypes.MOVE) {
      return true;
    }

    this.currentSpan = span;

    if (this.inProgress && !this.onScale(this)) {
      return true;
    }

    this.prevSpan = this.currentSpan;
    this.prevTime = this.currentTime;
    return true;
  }

  getCurrentSpan() {
    return this.currentSpan;
  }

  getFocusX() {
    return this.focusX;
  }

  getFocusY() {
    return this.focusY;
  }

  getTimeDelta() {
    return this.currentTime - this.prevTime;
  }

  getScaleFactor(numOfPointers) {
    if (numOfPointers < 2) {
      return 1;
    }

    return this.prevSpan > 0 ? this.currentSpan / this.prevSpan : 1;
  }

}
//# sourceMappingURL=ScaleGestureDetector.js.map