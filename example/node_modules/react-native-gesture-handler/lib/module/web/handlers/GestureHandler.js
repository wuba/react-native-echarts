function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-empty-function */
import { findNodeHandle } from 'react-native';
import { State } from '../../State';
import { PointerType, TouchEventType, EventTypes } from '../interfaces';
import GestureHandlerOrchestrator from '../tools/GestureHandlerOrchestrator';
import InteractionManager from '../tools/InteractionManager';
import PointerEventManager from '../tools/PointerEventManager';
import PointerTracker from '../tools/PointerTracker';
import TouchEventManager from '../tools/TouchEventManager';
import { isPointerInBounds } from '../utils';
export default class GestureHandler {
  // Orchestrator properties
  constructor() {
    _defineProperty(this, "lastSentState", null);

    _defineProperty(this, "currentState", State.UNDETERMINED);

    _defineProperty(this, "shouldCancellWhenOutside", false);

    _defineProperty(this, "hasCustomActivationCriteria", void 0);

    _defineProperty(this, "enabled", false);

    _defineProperty(this, "ref", void 0);

    _defineProperty(this, "propsRef", void 0);

    _defineProperty(this, "handlerTag", void 0);

    _defineProperty(this, "config", {
      enabled: false
    });

    _defineProperty(this, "view", void 0);

    _defineProperty(this, "eventManagers", []);

    _defineProperty(this, "tracker", new PointerTracker());

    _defineProperty(this, "activationIndex", 0);

    _defineProperty(this, "awaiting", false);

    _defineProperty(this, "active", false);

    _defineProperty(this, "shouldResetProgress", false);

    _defineProperty(this, "pointerType", PointerType.NONE);

    _defineProperty(this, "sendEvent", (newState, oldState) => {
      const {
        onGestureHandlerEvent,
        onGestureHandlerStateChange
      } = this.propsRef.current;
      const resultEvent = this.transformEventData(newState, oldState); // In the new API oldState field has to be undefined, unless we send event state changed
      // Here the order is flipped to avoid workarounds such as making backup of the state and setting it to undefined first, then changing it back
      // Flipping order with setting oldState to undefined solves issue, when events were being sent twice instead of once
      // However, this may cause trouble in the future (but for now we don't know that)

      if (this.lastSentState !== newState) {
        this.lastSentState = newState;
        invokeNullableMethod(onGestureHandlerStateChange, resultEvent);
      }

      if (this.currentState === State.ACTIVE) {
        resultEvent.nativeEvent.oldState = undefined;
        invokeNullableMethod(onGestureHandlerEvent, resultEvent);
      }
    });

    this.hasCustomActivationCriteria = false;
  } //
  // Initializing handler
  //


  init(ref, propsRef) {
    this.propsRef = propsRef;
    this.ref = ref;
    this.currentState = State.UNDETERMINED;
    this.setView();
    this.addEventManager(new PointerEventManager(this.view));
    this.addEventManager(new TouchEventManager(this.view));
  }

  setView() {
    if (!this.ref) {
      throw new Error(`Cannot find HTML Element for handler ${this.handlerTag}`);
    }

    this.view = findNodeHandle(this.ref);
    this.view.style['touchAction'] = 'none'; //@ts-ignore This one disables default events on Safari

    this.view.style['WebkitTouchCallout'] = 'none';

    if (!this.config.userSelect) {
      this.view.style['webkitUserSelect'] = 'none';
      this.view.style['userSelect'] = 'none';
    } else {
      this.view.style['webkitUserSelect'] = this.config.userSelect;
      this.view.style['userSelect'] = this.config.userSelect;
    }
  }

  addEventManager(manager) {
    manager.setOnPointerDown(this.onPointerDown.bind(this));
    manager.setOnPointerAdd(this.onPointerAdd.bind(this));
    manager.setOnPointerUp(this.onPointerUp.bind(this));
    manager.setOnPointerRemove(this.onPointerRemove.bind(this));
    manager.setOnPointerMove(this.onPointerMove.bind(this));
    manager.setOnPointerEnter(this.onPointerEnter.bind(this));
    manager.setOnPointerOut(this.onPointerOut.bind(this));
    manager.setOnPointerCancel(this.onPointerCancel.bind(this));
    manager.setOnPointerOutOfBounds(this.onPointerOutOfBounds.bind(this));
    manager.setListeners();
    this.eventManagers.push(manager);
  } //
  // Resetting handler
  //


  onCancel() {}

  onReset() {}

  resetProgress() {}

  reset() {
    this.tracker.resetTracker();
    this.onReset();
    this.resetProgress();
    this.eventManagers.forEach(manager => manager.resetManager());
    this.currentState = State.UNDETERMINED;
  } //
  // State logic
  //


  moveToState(newState, sendIfDisabled) {
    if (this.currentState === newState) {
      return;
    }

    const oldState = this.currentState;
    this.currentState = newState;

    if (this.tracker.getTrackedPointersCount() > 0 && this.config.needsPointerData && this.isFinished()) {
      this.cancelTouches();
    }

    GestureHandlerOrchestrator.getInstance().onHandlerStateChange(this, newState, oldState, sendIfDisabled);
    this.onStateChange(newState, oldState);
  }

  onStateChange(_newState, _oldState) {}

  begin() {
    if (!this.checkHitSlop()) {
      return;
    }

    if (this.currentState === State.UNDETERMINED) {
      this.moveToState(State.BEGAN);
    }
  }
  /**
   * @param {boolean} sendIfDisabled - Used when handler becomes disabled. With this flag orchestrator will be forced to send fail event
   */


  fail(sendIfDisabled) {
    if (this.currentState === State.ACTIVE || this.currentState === State.BEGAN) {
      this.moveToState(State.FAILED, sendIfDisabled);
      this.view.style.cursor = 'auto';
    }

    this.resetProgress();
  }
  /**
   * @param {boolean} sendIfDisabled - Used when handler becomes disabled. With this flag orchestrator will be forced to send cancel event
   */


  cancel(sendIfDisabled) {
    if (this.currentState === State.ACTIVE || this.currentState === State.UNDETERMINED || this.currentState === State.BEGAN) {
      this.onCancel();
      this.moveToState(State.CANCELLED, sendIfDisabled);
      this.view.style.cursor = 'auto';
    }
  }

  activate(_force = false) {
    if (this.currentState === State.UNDETERMINED || this.currentState === State.BEGAN) {
      this.moveToState(State.ACTIVE);
      this.view.style.cursor = 'grab';
    }
  }

  end() {
    if (this.currentState === State.BEGAN || this.currentState === State.ACTIVE) {
      this.moveToState(State.END);
      this.view.style.cursor = 'auto';
    }

    this.resetProgress();
  } //
  // Methods for orchestrator
  //


  isAwaiting() {
    return this.awaiting;
  }

  setAwaiting(value) {
    this.awaiting = value;
  }

  isActive() {
    return this.active;
  }

  setActive(value) {
    this.active = value;
  }

  getShouldResetProgress() {
    return this.shouldResetProgress;
  }

  setShouldResetProgress(value) {
    this.shouldResetProgress = value;
  }

  getActivationIndex() {
    return this.activationIndex;
  }

  setActivationIndex(value) {
    this.activationIndex = value;
  }

  shouldWaitForHandlerFailure(handler) {
    if (handler === this) {
      return false;
    }

    return InteractionManager.getInstance().shouldWaitForHandlerFailure(this, handler);
  }

  shouldRequireToWaitForFailure(handler) {
    if (handler === this) {
      return false;
    }

    return InteractionManager.getInstance().shouldRequireHandlerToWaitForFailure(this, handler);
  }

  shouldRecognizeSimultaneously(handler) {
    if (handler === this) {
      return true;
    }

    return InteractionManager.getInstance().shouldRecognizeSimultaneously(this, handler);
  }

  shouldBeCancelledByOther(handler) {
    if (handler === this) {
      return false;
    }

    return InteractionManager.getInstance().shouldHandlerBeCancelledBy(this, handler);
  } //
  // Event actions
  //


  onPointerDown(event) {
    GestureHandlerOrchestrator.getInstance().recordHandlerIfNotPresent(this);
    this.pointerType = event.pointerType;

    if (this.pointerType === PointerType.TOUCH) {
      GestureHandlerOrchestrator.getInstance().cancelMouseAndPenGestures(this);
    }

    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  } // Adding another pointer to existing ones


  onPointerAdd(event) {
    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  }

  onPointerUp(event) {
    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  } // Removing pointer, when there is more than one pointers


  onPointerRemove(event) {
    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  }

  onPointerMove(event) {
    this.tryToSendMoveEvent(false);

    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  }

  onPointerOut(event) {
    if (this.shouldCancellWhenOutside) {
      switch (this.currentState) {
        case State.ACTIVE:
          this.cancel();
          break;

        case State.BEGAN:
          this.fail();
          break;
      }

      return;
    }

    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  }

  onPointerEnter(event) {
    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  }

  onPointerCancel(event) {
    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  }

  onPointerOutOfBounds(event) {
    this.tryToSendMoveEvent(true);

    if (this.config.needsPointerData) {
      this.sendTouchEvent(event);
    }
  }

  tryToSendMoveEvent(out) {
    if (this.enabled && this.active && (!out || out && !this.shouldCancellWhenOutside)) {
      this.sendEvent(this.currentState, this.currentState);
    }
  }

  sendTouchEvent(event) {
    if (!this.enabled) {
      return;
    }

    const {
      onGestureHandlerEvent
    } = this.propsRef.current;
    const touchEvent = this.transformTouchEvent(event);

    if (touchEvent) {
      invokeNullableMethod(onGestureHandlerEvent, touchEvent);
    }
  } //
  // Events Sending
  //


  transformEventData(newState, oldState) {
    return {
      nativeEvent: {
        numberOfPointers: this.tracker.getTrackedPointersCount(),
        state: newState,
        pointerInside: isPointerInBounds(this.view, {
          x: this.tracker.getLastAvgX(),
          y: this.tracker.getLastAvgY()
        }),
        ...this.transformNativeEvent(),
        handlerTag: this.handlerTag,
        target: this.ref,
        oldState: newState !== oldState ? oldState : undefined
      },
      timeStamp: Date.now()
    };
  }

  transformTouchEvent(event) {
    var _event$touchEventType;

    const rect = this.view.getBoundingClientRect();
    const all = [];
    const changed = [];
    const trackerData = this.tracker.getData(); // This if handles edge case where all pointers have been cancelled
    // When pointercancel is triggered, reset method is called. This means that tracker will be reset after first pointer being cancelled
    // The problem is, that handler will receive another pointercancel event from the rest of the pointers
    // To avoid crashing, we don't send event if tracker tracks no pointers, i.e. has been reset

    if (trackerData.size === 0 || !trackerData.has(event.pointerId)) {
      return;
    }

    trackerData.forEach((element, key) => {
      const id = this.tracker.getMappedTouchEventId(key);
      all.push({
        id: id,
        x: element.lastX - rect.left,
        y: element.lastY - rect.top,
        absoluteX: element.lastX,
        absoluteY: element.lastY
      });
    }); // Each pointer sends its own event, so we want changed touches to contain only the pointer that has changed.
    // However, if the event is cancel, we want to cancel all pointers to avoid crashes

    if (event.eventType !== EventTypes.CANCEL) {
      changed.push({
        id: this.tracker.getMappedTouchEventId(event.pointerId),
        x: event.x - rect.left,
        y: event.y - rect.top,
        absoluteX: event.x,
        absoluteY: event.y
      });
    } else {
      trackerData.forEach((element, key) => {
        const id = this.tracker.getMappedTouchEventId(key);
        changed.push({
          id: id,
          x: element.lastX - rect.left,
          y: element.lastY - rect.top,
          absoluteX: element.lastX,
          absoluteY: element.lastY
        });
      });
    }

    let eventType = TouchEventType.UNDETERMINED;

    switch (event.eventType) {
      case EventTypes.DOWN:
      case EventTypes.ADDITIONAL_POINTER_DOWN:
        eventType = TouchEventType.DOWN;
        break;

      case EventTypes.UP:
      case EventTypes.ADDITIONAL_POINTER_UP:
        eventType = TouchEventType.UP;
        break;

      case EventTypes.MOVE:
        eventType = TouchEventType.MOVE;
        break;

      case EventTypes.CANCEL:
        eventType = TouchEventType.CANCELLED;
        break;
    } // Here, when we receive up event, we want to decrease number of touches
    // That's because we want handler to send information that there's one pointer less
    // However, we still want this pointer to be present in allTouches array, so that its data can be accessed


    let numberOfTouches = all.length;

    if (event.eventType === EventTypes.UP || event.eventType === EventTypes.ADDITIONAL_POINTER_UP) {
      --numberOfTouches;
    }

    return {
      nativeEvent: {
        handlerTag: this.handlerTag,
        state: this.currentState,
        eventType: (_event$touchEventType = event.touchEventType) !== null && _event$touchEventType !== void 0 ? _event$touchEventType : eventType,
        changedTouches: changed,
        allTouches: all,
        numberOfTouches: numberOfTouches
      },
      timeStamp: Date.now()
    };
  }

  cancelTouches() {
    const rect = this.view.getBoundingClientRect();
    const all = [];
    const changed = [];
    const trackerData = this.tracker.getData();

    if (trackerData.size === 0) {
      return;
    }

    trackerData.forEach((element, key) => {
      const id = this.tracker.getMappedTouchEventId(key);
      all.push({
        id: id,
        x: element.lastX - rect.left,
        y: element.lastY - rect.top,
        absoluteX: element.lastX,
        absoluteY: element.lastY
      });
      changed.push({
        id: id,
        x: element.lastX - rect.left,
        y: element.lastY - rect.top,
        absoluteX: element.lastX,
        absoluteY: element.lastY
      });
    });
    const cancelEvent = {
      nativeEvent: {
        handlerTag: this.handlerTag,
        state: this.currentState,
        eventType: TouchEventType.CANCELLED,
        changedTouches: changed,
        allTouches: all,
        numberOfTouches: all.length
      },
      timeStamp: Date.now()
    };
    const {
      onGestureHandlerEvent
    } = this.propsRef.current;
    invokeNullableMethod(onGestureHandlerEvent, cancelEvent);
  }

  transformNativeEvent() {
    return {};
  } //
  // Handling config
  //


  updateGestureConfig({
    enabled = true,
    ...props
  }) {
    this.config = {
      enabled: enabled,
      ...props
    };
    this.enabled = enabled;

    if (this.config.shouldCancelWhenOutside !== undefined) {
      this.setShouldCancelWhenOutside(this.config.shouldCancelWhenOutside);
    }

    this.validateHitSlops();

    if (this.enabled) {
      return;
    }

    switch (this.currentState) {
      case State.ACTIVE:
        this.fail(true);
        break;

      case State.UNDETERMINED:
        GestureHandlerOrchestrator.getInstance().removeHandlerFromOrchestrator(this);
        break;

      default:
        this.cancel(true);
        break;
    }
  }

  checkCustomActivationCriteria(criterias) {
    for (const key in this.config) {
      if (criterias.indexOf(key) >= 0) {
        this.hasCustomActivationCriteria = true;
      }
    }
  }

  validateHitSlops() {
    if (!this.config.hitSlop) {
      return;
    }

    if (this.config.hitSlop.left !== undefined && this.config.hitSlop.right !== undefined && this.config.hitSlop.width !== undefined) {
      throw new Error('HitSlop Error: Cannot define left, right and width at the same time');
    }

    if (this.config.hitSlop.width !== undefined && this.config.hitSlop.left === undefined && this.config.hitSlop.right === undefined) {
      throw new Error('HitSlop Error: When width is defined, either left or right has to be defined');
    }

    if (this.config.hitSlop.height !== undefined && this.config.hitSlop.top !== undefined && this.config.hitSlop.bottom !== undefined) {
      throw new Error('HitSlop Error: Cannot define top, bottom and height at the same time');
    }

    if (this.config.hitSlop.height !== undefined && this.config.hitSlop.top === undefined && this.config.hitSlop.bottom === undefined) {
      throw new Error('HitSlop Error: When height is defined, either top or bottom has to be defined');
    }
  }

  checkHitSlop() {
    if (!this.config.hitSlop) {
      return true;
    }

    const width = this.view.getBoundingClientRect().width;
    const height = this.view.getBoundingClientRect().height;
    let left = 0;
    let top = 0;
    let right = width;
    let bottom = height;

    if (this.config.hitSlop.horizontal !== undefined) {
      left -= this.config.hitSlop.horizontal;
      right += this.config.hitSlop.horizontal;
    }

    if (this.config.hitSlop.vertical !== undefined) {
      top -= this.config.hitSlop.vertical;
      bottom += this.config.hitSlop.vertical;
    }

    if (this.config.hitSlop.left !== undefined) {
      left = -this.config.hitSlop.left;
    }

    if (this.config.hitSlop.right !== undefined) {
      right = width + this.config.hitSlop.right;
    }

    if (this.config.hitSlop.top !== undefined) {
      top = -this.config.hitSlop.top;
    }

    if (this.config.hitSlop.bottom !== undefined) {
      bottom = width + this.config.hitSlop.bottom;
    }

    if (this.config.hitSlop.width !== undefined) {
      if (this.config.hitSlop.left !== undefined) {
        right = left + this.config.hitSlop.width;
      } else if (this.config.hitSlop.right !== undefined) {
        left = right - this.config.hitSlop.width;
      }
    }

    if (this.config.hitSlop.height !== undefined) {
      if (this.config.hitSlop.top !== undefined) {
        bottom = top + this.config.hitSlop.height;
      } else if (this.config.hitSlop.bottom !== undefined) {
        top = bottom - this.config.hitSlop.height;
      }
    }

    const rect = this.view.getBoundingClientRect();
    const offsetX = this.tracker.getLastX() - rect.left;
    const offsetY = this.tracker.getLastY() - rect.top;

    if (offsetX >= left && offsetX <= right && offsetY >= top && offsetY <= bottom) {
      return true;
    }

    return false;
  }

  isPointerInBounds({
    x,
    y
  }) {
    const rect = this.view.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  resetConfig() {} //
  // Getters and setters
  //


  getTag() {
    return this.handlerTag;
  }

  setTag(tag) {
    this.handlerTag = tag;
  }

  getConfig() {
    return this.config;
  }

  getShouldEnableGestureOnSetup() {
    throw new Error('Must override GestureHandler.shouldEnableGestureOnSetup');
  }

  getView() {
    return this.view;
  }

  getEventManagers() {
    return this.eventManagers;
  }

  getTracker() {
    return this.tracker;
  }

  getTrackedPointersID() {
    return this.tracker.getTrackedPointersID();
  }

  getState() {
    return this.currentState;
  }

  isEnabled() {
    return this.enabled;
  }

  isFinished() {
    return this.currentState === State.END || this.currentState === State.FAILED || this.currentState === State.CANCELLED;
  }

  setShouldCancelWhenOutside(shouldCancel) {
    this.shouldCancellWhenOutside = shouldCancel;
  }

  getShouldCancelWhenOutside() {
    return this.shouldCancellWhenOutside;
  }

  getPointerType() {
    return this.pointerType;
  }

}

function invokeNullableMethod(method, event) {
  if (!method) {
    return;
  }

  if (typeof method === 'function') {
    method(event);
    return;
  }

  if ('__getHandler' in method && typeof method.__getHandler === 'function') {
    const handler = method.__getHandler();

    invokeNullableMethod(handler, event);
    return;
  }

  if (!('__nodeConfig' in method)) {
    return;
  }

  const {
    argMapping
  } = method.__nodeConfig;

  if (!Array.isArray(argMapping)) {
    return;
  }

  for (const [index, [key, value]] of argMapping.entries()) {
    if (!(key in event.nativeEvent)) {
      continue;
    } // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access


    const nativeValue = event.nativeEvent[key]; // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

    if (value !== null && value !== void 0 && value.setValue) {
      //Reanimated API
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      value.setValue(nativeValue);
    } else {
      //RN Animated API
      method.__nodeConfig.argMapping[index] = [key, nativeValue];
    }
  }

  return;
}
//# sourceMappingURL=GestureHandler.js.map