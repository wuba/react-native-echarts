"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Used to scale velocity so that it is similar to velocity in Android/iOS
const VELOCITY_FACTOR = 0.2;
const MAX_POINTERS = 20;

class PointerTracker {
  constructor() {
    _defineProperty(this, "trackedPointers", new Map());

    _defineProperty(this, "touchEventsIds", new Map());

    _defineProperty(this, "lastMovedPointerId", void 0);

    _defineProperty(this, "cachedAverages", {
      x: 0,
      y: 0
    });

    this.lastMovedPointerId = NaN;

    for (let i = 0; i < MAX_POINTERS; ++i) {
      this.touchEventsIds.set(i, NaN);
    }
  }

  addToTracker(event) {
    if (this.trackedPointers.has(event.pointerId)) {
      return;
    }

    this.lastMovedPointerId = event.pointerId;
    const newElement = {
      lastX: event.x,
      lastY: event.y,
      timeStamp: event.time,
      velocityX: 0,
      velocityY: 0
    };
    this.trackedPointers.set(event.pointerId, newElement);
    this.mapTouchEventId(event.pointerId);
    this.cachedAverages = {
      x: this.getLastAvgX(),
      y: this.getLastAvgY()
    };
  }

  removeFromTracker(pointerId) {
    this.trackedPointers.delete(pointerId);
    this.removeMappedTouchId(pointerId);
  }

  track(event) {
    const element = this.trackedPointers.get(event.pointerId);

    if (!element) {
      return;
    }

    this.lastMovedPointerId = event.pointerId;
    const dx = event.x - element.lastX;
    const dy = event.y - element.lastY;
    const dt = event.time - element.timeStamp;
    element.velocityX = dx / dt * 1000 * VELOCITY_FACTOR;
    element.velocityY = dy / dt * 1000 * VELOCITY_FACTOR;
    element.lastX = event.x;
    element.lastY = event.y;
    this.trackedPointers.set(event.pointerId, element);
    const avgX = this.getLastAvgX();
    const avgY = this.getLastAvgY();
    this.cachedAverages = {
      x: avgX,
      y: avgY
    };
  } //Mapping TouchEvents ID


  mapTouchEventId(id) {
    for (const [mappedId, touchId] of this.touchEventsIds) {
      if (isNaN(touchId)) {
        this.touchEventsIds.set(mappedId, id);
        break;
      }
    }
  }

  removeMappedTouchId(id) {
    const mappedId = this.getMappedTouchEventId(id);

    if (!isNaN(mappedId)) {
      this.touchEventsIds.set(mappedId, NaN);
    }
  }

  getMappedTouchEventId(touchEventId) {
    for (const [key, value] of this.touchEventsIds.entries()) {
      if (value === touchEventId) {
        return key;
      }
    }

    return NaN;
  }

  getVelocityX(pointerId) {
    var _this$trackedPointers;

    return (_this$trackedPointers = this.trackedPointers.get(pointerId)) === null || _this$trackedPointers === void 0 ? void 0 : _this$trackedPointers.velocityX;
  }

  getVelocityY(pointerId) {
    var _this$trackedPointers2;

    return (_this$trackedPointers2 = this.trackedPointers.get(pointerId)) === null || _this$trackedPointers2 === void 0 ? void 0 : _this$trackedPointers2.velocityY;
  }
  /**
   * Returns X coordinate of last moved pointer
   */


  getLastX(pointerId) {
    if (pointerId !== undefined) {
      var _this$trackedPointers3;

      return (_this$trackedPointers3 = this.trackedPointers.get(pointerId)) === null || _this$trackedPointers3 === void 0 ? void 0 : _this$trackedPointers3.lastX;
    } else {
      var _this$trackedPointers4;

      return (_this$trackedPointers4 = this.trackedPointers.get(this.lastMovedPointerId)) === null || _this$trackedPointers4 === void 0 ? void 0 : _this$trackedPointers4.lastX;
    }
  }
  /**
   * Returns Y coordinate of last moved pointer
   */


  getLastY(pointerId) {
    if (pointerId !== undefined) {
      var _this$trackedPointers5;

      return (_this$trackedPointers5 = this.trackedPointers.get(pointerId)) === null || _this$trackedPointers5 === void 0 ? void 0 : _this$trackedPointers5.lastY;
    } else {
      var _this$trackedPointers6;

      return (_this$trackedPointers6 = this.trackedPointers.get(this.lastMovedPointerId)) === null || _this$trackedPointers6 === void 0 ? void 0 : _this$trackedPointers6.lastY;
    }
  } // Some handlers use these methods to send average values in native event.
  // This may happen when pointers have already been removed from tracker (i.e. pointerup event).
  // In situation when NaN would be sent as a response, we return cached value.
  // That prevents handlers from crashing


  getLastAvgX() {
    const avgX = this.getSumX() / this.trackedPointers.size;
    return isNaN(avgX) ? this.cachedAverages.x : avgX;
  }

  getLastAvgY() {
    const avgY = this.getSumY() / this.trackedPointers.size;
    return isNaN(avgY) ? this.cachedAverages.y : avgY;
  }

  getSumX(ignoredPointer) {
    let sumX = 0;
    this.trackedPointers.forEach((value, key) => {
      if (key !== ignoredPointer) {
        sumX += value.lastX;
      }
    });
    return sumX;
  }

  getSumY(ignoredPointer) {
    let sumY = 0;
    this.trackedPointers.forEach((value, key) => {
      if (key !== ignoredPointer) {
        sumY += value.lastY;
      }
    });
    return sumY;
  }

  getTrackedPointersCount() {
    return this.trackedPointers.size;
  }

  getTrackedPointersID() {
    const keys = [];
    this.trackedPointers.forEach((_value, key) => {
      keys.push(key);
    });
    return keys;
  }

  getData() {
    return this.trackedPointers;
  }

  resetTracker() {
    this.trackedPointers.clear();
    this.lastMovedPointerId = NaN;

    for (let i = 0; i < MAX_POINTERS; ++i) {
      this.touchEventsIds.set(i, NaN);
    }
  }

  static shareCommonPointers(stPointers, ndPointers) {
    return stPointers.some(pointerId => ndPointers.includes(pointerId));
  }

}

exports.default = PointerTracker;
//# sourceMappingURL=PointerTracker.js.map