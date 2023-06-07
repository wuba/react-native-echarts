"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interfaces = require("../interfaces");

var _EventManager = _interopRequireDefault(require("./EventManager"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TouchEventManager extends _EventManager.default {
  setListeners() {
    this.view.addEventListener('touchstart', event => {
      for (let i = 0; i < event.changedTouches.length; ++i) {
        const adaptedEvent = this.mapEvent(event, _interfaces.EventTypes.DOWN, i, _interfaces.TouchEventType.DOWN); // Here we skip stylus, because in case of anything different than touch we want to handle it by using PointerEvents
        // If we leave stylus to send touch events, handlers will receive every action twice

        if (!(0, _utils.isPointerInBounds)(this.view, {
          x: adaptedEvent.x,
          y: adaptedEvent.y
        }) || //@ts-ignore touchType field does exist
        event.changedTouches[i].touchType === 'stylus') {
          continue;
        }

        this.markAsInBounds(adaptedEvent.pointerId);

        if (++this.activePointersCounter > 1) {
          adaptedEvent.eventType = _interfaces.EventTypes.ADDITIONAL_POINTER_DOWN;
          this.onPointerAdd(adaptedEvent);
        } else {
          this.onPointerDown(adaptedEvent);
        }
      }
    });
    this.view.addEventListener('touchmove', event => {
      for (let i = 0; i < event.changedTouches.length; ++i) {
        const adaptedEvent = this.mapEvent(event, _interfaces.EventTypes.MOVE, i, _interfaces.TouchEventType.MOVE); //@ts-ignore touchType field does exist

        if (event.changedTouches[i].touchType === 'stylus') {
          continue;
        }

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
      }
    });
    this.view.addEventListener('touchend', event => {
      for (let i = 0; i < event.changedTouches.length; ++i) {
        // When we call reset on gesture handlers, it also resets their event managers
        // In some handlers (like RotationGestureHandler) reset is called before all pointers leave view
        // This means, that activePointersCounter will be set to 0, while there are still remaining pointers on view
        // Removing them will end in activePointersCounter going below 0, therefore handlers won't behave properly
        if (this.activePointersCounter === 0) {
          break;
        } //@ts-ignore touchType field does exist


        if (event.changedTouches[i].touchType === 'stylus') {
          continue;
        }

        const adaptedEvent = this.mapEvent(event, _interfaces.EventTypes.UP, i, _interfaces.TouchEventType.UP);
        this.markAsOutOfBounds(adaptedEvent.pointerId);

        if (--this.activePointersCounter > 0) {
          adaptedEvent.eventType = _interfaces.EventTypes.ADDITIONAL_POINTER_UP;
          this.onPointerRemove(adaptedEvent);
        } else {
          this.onPointerUp(adaptedEvent);
        }
      }
    });
    this.view.addEventListener('touchcancel', event => {
      for (let i = 0; i < event.changedTouches.length; ++i) {
        const adaptedEvent = this.mapEvent(event, _interfaces.EventTypes.CANCEL, i, _interfaces.TouchEventType.CANCELLED); //@ts-ignore touchType field does exist

        if (event.changedTouches[i].touchType === 'stylus') {
          continue;
        }

        this.onPointerCancel(adaptedEvent);
        this.markAsOutOfBounds(adaptedEvent.pointerId);
        this.activePointersCounter = 0;
      }
    });
  }

  mapEvent(event, eventType, index, touchEventType) {
    const rect = this.view.getBoundingClientRect();
    const clientX = event.changedTouches[index].clientX;
    const clientY = event.changedTouches[index].clientY;
    return {
      x: clientX,
      y: clientY,
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top,
      pointerId: event.changedTouches[index].identifier,
      eventType: eventType,
      pointerType: _interfaces.PointerType.TOUCH,
      buttons: _interfaces.MouseButtons.NONE,
      time: event.timeStamp,
      allTouches: event.touches,
      changedTouches: event.changedTouches,
      touchEventType: touchEventType
    };
  }

}

exports.default = TouchEventManager;
//# sourceMappingURL=TouchEventManager.js.map