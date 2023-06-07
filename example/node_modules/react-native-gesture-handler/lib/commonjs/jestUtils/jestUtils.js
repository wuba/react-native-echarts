"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fireGestureHandler = fireGestureHandler;
exports.getByGestureTestId = getByGestureTestId;

var _invariant = _interopRequireDefault(require("invariant"));

var _reactNative = require("react-native");

var _FlingGestureHandler = require("../handlers/FlingGestureHandler");

var _ForceTouchGestureHandler = require("../handlers/ForceTouchGestureHandler");

var _gesture = require("../handlers/gestures/gesture");

var _handlersRegistry = require("../handlers/handlersRegistry");

var _LongPressGestureHandler = require("../handlers/LongPressGestureHandler");

var _NativeViewGestureHandler = require("../handlers/NativeViewGestureHandler");

var _PanGestureHandler = require("../handlers/PanGestureHandler");

var _PinchGestureHandler = require("../handlers/PinchGestureHandler");

var _RotationGestureHandler = require("../handlers/RotationGestureHandler");

var _TapGestureHandler = require("../handlers/TapGestureHandler");

var _State = require("../State");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load fireEvent conditionally, so RNGH may be used in setups without testing-library
let fireEvent = (_element, _name, ..._data) => {// NOOP
};

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  fireEvent = require('@testing-library/react-native').fireEvent;
} catch (_e) {// do nothing if not available
}

const handlersDefaultEvents = {
  [_FlingGestureHandler.flingHandlerName]: {
    x: 0,
    y: 0,
    absoluteX: 0,
    absoluteY: 0,
    numberOfPointers: 1
  },
  [_ForceTouchGestureHandler.forceTouchHandlerName]: {
    x: 0,
    y: 0,
    absoluteX: 0,
    absoluteY: 0,
    force: 1,
    numberOfPointers: 1
  },
  [_LongPressGestureHandler.longPressHandlerName]: {
    x: 0,
    y: 0,
    absoluteX: 0,
    absoluteY: 0,
    duration: 100,
    numberOfPointers: 1
  },
  [_NativeViewGestureHandler.nativeViewHandlerName]: {
    pointerInside: true,
    numberOfPointers: 1
  },
  [_PanGestureHandler.panHandlerName]: {
    x: 0,
    y: 0,
    absoluteX: 0,
    absoluteY: 0,
    translationX: 100,
    translationY: 0,
    velocityX: 3,
    velocityY: 0,
    numberOfPointers: 1
  },
  [_PinchGestureHandler.pinchHandlerName]: {
    focalX: 0,
    focalY: 0,
    scale: 2,
    velocity: 1,
    numberOfPointers: 2
  },
  [_RotationGestureHandler.rotationHandlerName]: {
    anchorX: 0,
    anchorY: 0,
    rotation: 3.14,
    velocity: 2,
    numberOfPointers: 2
  },
  [_TapGestureHandler.tapHandlerName]: {
    x: 0,
    y: 0,
    absoluteX: 0,
    absoluteY: 0,
    numberOfPointers: 1
  }
};

function isGesture(componentOrGesture) {
  return componentOrGesture instanceof _gesture.BaseGesture;
}

function wrapWithNativeEvent(event) {
  return {
    nativeEvent: event
  };
}

function fillOldStateChanges(previousEvent, currentEvent) {
  const isFirstEvent = previousEvent === null;

  if (isFirstEvent) {
    return {
      oldState: _State.State.UNDETERMINED,
      ...currentEvent
    };
  }

  const isGestureStateEvent = previousEvent.state !== currentEvent.state;

  if (isGestureStateEvent) {
    return {
      oldState: previousEvent === null || previousEvent === void 0 ? void 0 : previousEvent.state,
      ...currentEvent
    };
  } else {
    return currentEvent;
  }
}

function validateStateTransitions(previousEvent, currentEvent) {
  function stringify(event) {
    return JSON.stringify(event, null, 2);
  }

  function errorMsgWithBothEvents(description) {
    return `${description}, invalid event: ${stringify(currentEvent)}, previous event: ${stringify(previousEvent)}`;
  }

  function errorMsgWithCurrentEvent(description) {
    return `${description}, invalid event: ${stringify(currentEvent)}`;
  }

  (0, _invariant.default)((0, _utils.hasProperty)(currentEvent, 'state'), errorMsgWithCurrentEvent('every event must have state'));
  const isFirstEvent = previousEvent === null;

  if (isFirstEvent) {
    (0, _invariant.default)(currentEvent.state === _State.State.BEGAN, errorMsgWithCurrentEvent('first event must have BEGAN state'));
  }

  if (previousEvent !== null) {
    if (previousEvent.state !== currentEvent.state) {
      (0, _invariant.default)((0, _utils.hasProperty)(currentEvent, 'oldState'), errorMsgWithCurrentEvent('when state changes, oldState field should be present'));
      (0, _invariant.default)(currentEvent.oldState === previousEvent.state, errorMsgWithBothEvents("when state changes, oldState should be the same as previous event' state"));
    }
  }

  return currentEvent;
}

function fillMissingDefaultsFor({
  handlerType,
  handlerTag
}) {
  return event => {
    return { ...handlersDefaultEvents[handlerType],
      ...event,
      handlerTag
    };
  };
}

function isDiscreteHandler(handlerType) {
  return handlerType === 'TapGestureHandler' || handlerType === 'LongPressGestureHandler';
}

function fillMissingStatesTransitions(events, isDiscreteHandler) {
  var _events2, _events$;

  const _events = [...events];
  const lastEvent = (_events2 = _events[_events.length - 1]) !== null && _events2 !== void 0 ? _events2 : null;
  const firstEvent = (_events$ = _events[0]) !== null && _events$ !== void 0 ? _events$ : null;
  const shouldDuplicateFirstEvent = !isDiscreteHandler && !hasState(_State.State.BEGAN)(firstEvent);

  if (shouldDuplicateFirstEvent) {
    const duplicated = { ...firstEvent,
      state: _State.State.BEGAN
    }; // @ts-ignore badly typed, property may exist and we don't want to copy it

    delete duplicated.oldState;

    _events.unshift(duplicated);
  }

  const shouldDuplicateLastEvent = !hasState(_State.State.END)(lastEvent) || !hasState(_State.State.FAILED)(lastEvent) || !hasState(_State.State.CANCELLED)(lastEvent);

  if (shouldDuplicateLastEvent) {
    const duplicated = { ...lastEvent,
      state: _State.State.END
    }; // @ts-ignore badly typed, property may exist and we don't want to copy it

    delete duplicated.oldState;

    _events.push(duplicated);
  }

  function isWithoutState(event) {
    return event !== null && !(0, _utils.hasProperty)(event, 'state');
  }

  function hasState(state) {
    return event => event !== null && event.state === state;
  }

  function noEventsLeft(event) {
    return event === null;
  }

  function trueFn() {
    return true;
  }

  function fillEventsForCurrentState({
    shouldConsumeEvent = trueFn,
    shouldTransitionToNextState = trueFn
  }) {
    function peekCurrentEvent() {
      var _events$2;

      return (_events$2 = _events[0]) !== null && _events$2 !== void 0 ? _events$2 : null;
    }

    function peekNextEvent() {
      var _events$3;

      return (_events$3 = _events[1]) !== null && _events$3 !== void 0 ? _events$3 : null;
    }

    function consumeCurrentEvent() {
      _events.shift();
    }

    const currentEvent = peekCurrentEvent();
    const nextEvent = peekNextEvent();
    const currentRequiredState = REQUIRED_EVENTS[currentStateIdx];
    let eventData = {};
    const shouldUseEvent = shouldConsumeEvent(currentEvent);

    if (shouldUseEvent) {
      eventData = currentEvent;
      consumeCurrentEvent();
    }

    transformedEvents.push({
      state: currentRequiredState,
      ...eventData
    });

    if (shouldTransitionToNextState(nextEvent)) {
      currentStateIdx++;
    }
  }

  const REQUIRED_EVENTS = [_State.State.BEGAN, _State.State.ACTIVE, _State.State.END];
  let currentStateIdx = 0;
  const transformedEvents = [];
  let hasAllStates;
  let iterations = 0;

  do {
    const nextRequiredState = REQUIRED_EVENTS[currentStateIdx];

    if (nextRequiredState === _State.State.BEGAN) {
      fillEventsForCurrentState({
        shouldConsumeEvent: e => isWithoutState(e) || hasState(_State.State.BEGAN)(e)
      });
    } else if (nextRequiredState === _State.State.ACTIVE) {
      const shouldConsumeEvent = e => isWithoutState(e) || hasState(_State.State.ACTIVE)(e);

      const shouldTransitionToNextState = nextEvent => noEventsLeft(nextEvent) || hasState(_State.State.END)(nextEvent) || hasState(_State.State.FAILED)(nextEvent) || hasState(_State.State.CANCELLED)(nextEvent);

      fillEventsForCurrentState({
        shouldConsumeEvent,
        shouldTransitionToNextState
      });
    } else if (nextRequiredState === _State.State.END) {
      fillEventsForCurrentState({});
    }

    hasAllStates = currentStateIdx === REQUIRED_EVENTS.length;
    (0, _invariant.default)(iterations++ <= 500, 'exceeded max number of iterations, please report a bug in RNGH repository with your test case');
  } while (!hasAllStates);

  return transformedEvents;
}

function getHandlerData(componentOrGesture) {
  if (isGesture(componentOrGesture)) {
    const gesture = componentOrGesture;
    return {
      emitEvent: (eventName, args) => {
        _reactNative.DeviceEventEmitter.emit(eventName, args.nativeEvent);
      },
      handlerType: gesture.handlerName,
      handlerTag: gesture.handlerTag
    };
  }

  const gestureHandlerComponent = componentOrGesture;
  return {
    emitEvent: (eventName, args) => {
      fireEvent(gestureHandlerComponent, eventName, args);
    },
    handlerType: gestureHandlerComponent.props.handlerType,
    handlerTag: gestureHandlerComponent.props.handlerTag
  };
}

function fireGestureHandler(componentOrGesture, eventList = []) {
  const {
    emitEvent,
    handlerType,
    handlerTag
  } = getHandlerData(componentOrGesture);

  let _ = fillMissingStatesTransitions(eventList, isDiscreteHandler(handlerType));

  _ = _.map(fillMissingDefaultsFor({
    handlerTag,
    handlerType
  }));
  _ = (0, _utils.withPrevAndCurrent)(_, fillOldStateChanges);
  _ = (0, _utils.withPrevAndCurrent)(_, validateStateTransitions); // @ts-ignore TODO

  _ = _.map(wrapWithNativeEvent);
  const events = _;
  const firstEvent = events.shift();
  emitEvent('onGestureHandlerStateChange', firstEvent);
  let lastSentEvent = firstEvent;

  for (const event of events) {
    const hasChangedState = lastSentEvent.nativeEvent.state !== event.nativeEvent.state;

    if (hasChangedState) {
      emitEvent('onGestureHandlerStateChange', event);
    } else {
      emitEvent('onGestureHandlerEvent', event);
    }

    lastSentEvent = event;
  }
}

function getByGestureTestId(testID) {
  const handler = (0, _handlersRegistry.findHandlerByTestID)(testID);

  if (handler === null) {
    throw new Error(`Handler with id: '${testID}' cannot be found`);
  }

  return handler;
}
//# sourceMappingURL=jestUtils.js.map