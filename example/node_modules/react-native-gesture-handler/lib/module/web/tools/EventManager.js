function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-empty-function */
export default class EventManager {
  constructor(view) {
    _defineProperty(this, "view", void 0);

    _defineProperty(this, "pointersInBounds", []);

    _defineProperty(this, "activePointersCounter", void 0);

    this.view = view;
    this.activePointersCounter = 0;
  }

  onPointerDown(_event) {}

  onPointerAdd(_event) {}

  onPointerUp(_event) {}

  onPointerRemove(_event) {}

  onPointerMove(_event) {}

  onPointerOut(_event) {}

  onPointerEnter(_event) {}

  onPointerCancel(_event) {// When pointer cancel is triggered and there are more pointers on the view, only one pointer is cancelled
    // Because we want all pointers to be cancelled by that event, we are doing it manually by reseting handler and changing activePointersCounter to 0
    // Events that correspond to removing the pointer (pointerup, touchend) have condition, that they don't perform any action when activePointersCounter
    // is equal to 0. This prevents counter from going to negative values, when pointers are removed from view after one of them has been cancelled
  }

  onPointerOutOfBounds(_event) {}

  setOnPointerDown(callback) {
    this.onPointerDown = callback;
  }

  setOnPointerAdd(callback) {
    this.onPointerAdd = callback;
  }

  setOnPointerUp(callback) {
    this.onPointerUp = callback;
  }

  setOnPointerRemove(callback) {
    this.onPointerRemove = callback;
  }

  setOnPointerMove(callback) {
    this.onPointerMove = callback;
  }

  setOnPointerOut(callback) {
    this.onPointerOut = callback;
  }

  setOnPointerEnter(callback) {
    this.onPointerEnter = callback;
  }

  setOnPointerCancel(callback) {
    this.onPointerCancel = callback;
  }

  setOnPointerOutOfBounds(callback) {
    this.onPointerOutOfBounds = callback;
  }

  markAsInBounds(pointerId) {
    if (this.pointersInBounds.indexOf(pointerId) >= 0) {
      return;
    }

    this.pointersInBounds.push(pointerId);
  }

  markAsOutOfBounds(pointerId) {
    const index = this.pointersInBounds.indexOf(pointerId);

    if (index < 0) {
      return;
    }

    this.pointersInBounds.splice(index, 1);
  }

  resetManager() {
    // Reseting activePointersCounter is necessary to make gestures such as pinch work properly
    // There are gestures that end when there is still one active pointer (like pinch/rotation)
    // When these gestures end, they are reset, but they still receive events from pointer that is active
    // This causes trouble, since only onPointerDown registers gesture in orchestrator, and while gestures receive
    // Events from active pointer after they finished, next pointerdown event will be registered as additional pointer, not the first one
    // This casues trouble like gestures getting stuck in END state, even though they should have gone to UNDETERMINED
    this.activePointersCounter = 0;
    this.pointersInBounds = [];
  }

}
//# sourceMappingURL=EventManager.js.map