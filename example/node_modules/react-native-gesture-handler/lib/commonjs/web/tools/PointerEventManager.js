"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interfaces = require("../interfaces");

var _EventManager = _interopRequireDefault(require("./EventManager"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PointerEventManager extends _EventManager.default {
  setListeners() {
    this.view.addEventListener('pointerdown', event => {
      if (event.pointerType === _interfaces.PointerType.TOUCH) {
        return;
      }

      if (!(0, _utils.isPointerInBounds)(this.view, {
        x: event.clientX,
        y: event.clientY
      })) {
        return;
      }

      const adaptedEvent = this.mapEvent(event, _interfaces.EventTypes.DOWN);
      const target = event.target;
      target.setPointerCapture(adaptedEvent.pointerId);
      this.markAsInBounds(adaptedEvent.pointerId);

      if (++this.activePointersCounter > 1) {
        adaptedEvent.eventType = _interfaces.EventTypes.ADDITIONAL_POINTER_DOWN;
        this.onPointerAdd(adaptedEvent);
      } else {
        this.onPointerDown(adaptedEvent);
      }
    });
    this.view.addEventListener('pointerup', event => {
      if (event.pointerType === _interfaces.PointerType.TOUCH) {
        return;
      } // When we call reset on gesture handlers, it also resets their event managers
      // In some handlers (like RotationGestureHandler) reset is called before all pointers leave view
      // This means, that activePointersCounter will be set to 0, while there are still remaining pointers on view
      // Removing them will end in activePointersCounter going below 0, therefore handlers won't behave properly


      if (this.activePointersCounter === 0) {
        return;
      }

      const adaptedEvent = this.mapEvent(event, _interfaces.EventTypes.UP);
      const target = event.target;
      target.releasePointerCapture(adaptedEvent.pointerId);
      this.markAsOutOfBounds(adaptedEvent.pointerId);

      if (--this.activePointersCounter > 0) {
        adaptedEvent.eventType = _interfaces.EventTypes.ADDITIONAL_POINTER_UP;
        this.onPointerRemove(adaptedEvent);
      } else {
        this.onPointerUp(adaptedEvent);
      }
    });
    this.view.addEventListener('pointermove', event => {
      if (event.pointerType === _interfaces.PointerType.TOUCH) {
        return;
      }

      if (event.pointerType === _interfaces.PointerType.MOUSE && event.buttons !== _interfaces.MouseButtons.LEFT) {
        return;
      }

      const adaptedEvent = this.mapEvent(event, _interfaces.EventTypes.MOVE);
      const inBounds = (0, _utils.isPointerInBounds)(this.view, {
        x: adaptedEvent.x,
        y: adaptedEvent.y
      });
      const pointerIndex = this.pointersInBounds.indexOf(adaptedEvent.pointerId);

      if (inBounds) {
        if (pointerIndex < 0) {
          adaptedEvent.eventType = _interfaces.EventTypes.ENTER;
          this.onPointerEnter(adaptedEvent);
          this.markAsInBounds(adaptedEvent.pointerId);
        } else {
          this.onPointerMove(adaptedEvent);
        }
      } else {
        if (pointerIndex >= 0) {
          adaptedEvent.eventType = _interfaces.EventTypes.OUT;
          this.onPointerOut(adaptedEvent);
          this.markAsOutOfBounds(adaptedEvent.pointerId);
        } else {
          this.onPointerOutOfBounds(adaptedEvent);
        }
      }
    });
    this.view.addEventListener('pointercancel', event => {
      if (event.pointerType === _interfaces.PointerType.TOUCH) {
        return;
      }

      const adaptedEvent = this.mapEvent(event, _interfaces.EventTypes.CANCEL);
      this.onPointerCancel(adaptedEvent);
      this.markAsOutOfBounds(adaptedEvent.pointerId);
      this.activePointersCounter = 0;
    });
  }

  mapEvent(event, eventType) {
    return {
      x: event.clientX,
      y: event.clientY,
      offsetX: event.offsetX,
      offsetY: event.offsetY,
      pointerId: event.pointerId,
      eventType: eventType,
      pointerType: event.pointerType,
      buttons: event.buttons,
      time: event.timeStamp
    };
  }

}

exports.default = PointerEventManager;
//# sourceMappingURL=PointerEventManager.js.map