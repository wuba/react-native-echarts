"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureDetector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _gesture = require("./gesture");

var _reanimatedWrapper = require("./reanimatedWrapper");

var _handlersRegistry = require("../handlersRegistry");

var _RNGestureHandlerModule = _interopRequireDefault(require("../../RNGestureHandlerModule"));

var _gestureHandlerCommon = require("../gestureHandlerCommon");

var _gestureStateManager = require("./gestureStateManager");

var _FlingGestureHandler = require("../FlingGestureHandler");

var _ForceTouchGestureHandler = require("../ForceTouchGestureHandler");

var _LongPressGestureHandler = require("../LongPressGestureHandler");

var _PanGestureHandler = require("../PanGestureHandler");

var _TapGestureHandler = require("../TapGestureHandler");

var _State = require("../../State");

var _TouchEventType = require("../../TouchEventType");

var _ActionType = require("../../ActionType");

var _utils = require("../../utils");

var _getShadowNodeFromRef = require("../../getShadowNodeFromRef");

var _reactNative = require("react-native");

var _eventReceiver = require("./eventReceiver");

var _RNRenderer = require("../../RNRenderer");

var _EnableExperimentalWebImplementation = require("../../EnableExperimentalWebImplementation");

var _Reanimated$default$c, _Reanimated$default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ALLOWED_PROPS = [..._gestureHandlerCommon.baseGestureHandlerWithMonitorProps, ..._TapGestureHandler.tapGestureHandlerProps, ..._PanGestureHandler.panGestureHandlerProps, ..._PanGestureHandler.panGestureHandlerCustomNativeProps, ..._LongPressGestureHandler.longPressGestureHandlerProps, ..._ForceTouchGestureHandler.forceTouchGestureHandlerProps, ..._FlingGestureHandler.flingGestureHandlerProps];

function convertToHandlerTag(ref) {
  if (typeof ref === 'number') {
    return ref;
  } else if (ref instanceof _gesture.BaseGesture) {
    return ref.handlerTag;
  } else {
    var _ref$current$handlerT, _ref$current;

    // @ts-ignore in this case it should be a ref either to gesture object or
    // a gesture handler component, in both cases handlerTag property exists
    return (_ref$current$handlerT = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.handlerTag) !== null && _ref$current$handlerT !== void 0 ? _ref$current$handlerT : -1;
  }
}

function extractValidHandlerTags(interactionGroup) {
  var _interactionGroup$map, _interactionGroup$map2;

  return (_interactionGroup$map = interactionGroup === null || interactionGroup === void 0 ? void 0 : (_interactionGroup$map2 = interactionGroup.map(convertToHandlerTag)) === null || _interactionGroup$map2 === void 0 ? void 0 : _interactionGroup$map2.filter(tag => tag > 0)) !== null && _interactionGroup$map !== void 0 ? _interactionGroup$map : [];
}

function dropHandlers(preparedGesture) {
  for (const handler of preparedGesture.config) {
    _RNGestureHandlerModule.default.dropGestureHandler(handler.handlerTag);

    (0, _handlersRegistry.unregisterHandler)(handler.handlerTag, handler.config.testId);
  }

  (0, _gestureHandlerCommon.scheduleFlushOperations)();
}

function checkGestureCallbacksForWorklets(gesture) {
  // if a gesture is explicitly marked to run on the JS thread there is no need to check
  // if callbacks are worklets as the user is aware they will be ran on the JS thread
  if (gesture.config.runOnJS) {
    return;
  }

  const areSomeNotWorklets = gesture.handlers.isWorklet.includes(false);
  const areSomeWorklets = gesture.handlers.isWorklet.includes(true); // if some of the callbacks are worklets and some are not, and the gesture is not
  // explicitly marked with `.runOnJS(true)` show an error

  if (areSomeNotWorklets && areSomeWorklets) {
    console.error((0, _utils.tagMessage)(`Some of the callbacks in the gesture are worklets and some are not. Either make sure that all calbacks are marked as 'worklet' if you wish to run them on the UI thread or use '.runOnJS(true)' modifier on the gesture explicitly to run all callbacks on the JS thread.`));
  }
}

function attachHandlers({
  preparedGesture,
  gestureConfig,
  gesture,
  viewTag,
  webEventHandlersRef,
  mountedRef
}) {
  if (!preparedGesture.firstExecution) {
    gestureConfig.initialize();
  } else {
    preparedGesture.firstExecution = false;
  } // use setImmediate to extract handlerTags, because all refs should be initialized
  // when it's ran


  setImmediate(() => {
    if (!mountedRef.current) {
      return;
    }

    gestureConfig.prepare();
  });

  for (const handler of gesture) {
    checkGestureCallbacksForWorklets(handler);

    _RNGestureHandlerModule.default.createGestureHandler(handler.handlerName, handler.handlerTag, (0, _gestureHandlerCommon.filterConfig)(handler.config, ALLOWED_PROPS));

    (0, _handlersRegistry.registerHandler)(handler.handlerTag, handler, handler.config.testId);
  } // use setImmediate to extract handlerTags, because all refs should be initialized
  // when it's ran


  setImmediate(() => {
    if (!mountedRef.current) {
      return;
    }

    for (const handler of gesture) {
      let requireToFail = [];

      if (handler.config.requireToFail) {
        requireToFail = extractValidHandlerTags(handler.config.requireToFail);
      }

      let simultaneousWith = [];

      if (handler.config.simultaneousWith) {
        simultaneousWith = extractValidHandlerTags(handler.config.simultaneousWith);
      }

      _RNGestureHandlerModule.default.updateGestureHandler(handler.handlerTag, (0, _gestureHandlerCommon.filterConfig)(handler.config, ALLOWED_PROPS, {
        simultaneousHandlers: simultaneousWith,
        waitFor: requireToFail
      }));
    }

    (0, _gestureHandlerCommon.scheduleFlushOperations)();
  });
  preparedGesture.config = gesture;

  for (const gesture of preparedGesture.config) {
    const actionType = gesture.shouldUseReanimated ? _ActionType.ActionType.REANIMATED_WORKLET : _ActionType.ActionType.JS_FUNCTION_NEW_API;

    if (_reactNative.Platform.OS === 'web') {
      _RNGestureHandlerModule.default.attachGestureHandler(gesture.handlerTag, viewTag, _ActionType.ActionType.JS_FUNCTION_OLD_API, // ignored on web
      webEventHandlersRef);
    } else {
      _RNGestureHandlerModule.default.attachGestureHandler(gesture.handlerTag, viewTag, actionType);
    }
  }

  if (preparedGesture.animatedHandlers) {
    const isAnimatedGesture = g => g.shouldUseReanimated;

    preparedGesture.animatedHandlers.value = gesture.filter(isAnimatedGesture).map(g => g.handlers);
  }
}

function updateHandlers(preparedGesture, gestureConfig, gesture, mountedRef) {
  gestureConfig.prepare();

  for (let i = 0; i < gesture.length; i++) {
    const handler = preparedGesture.config[i];
    checkGestureCallbacksForWorklets(handler); // only update handlerTag when it's actually different, it may be the same
    // if gesture config object is wrapped with useMemo

    if (gesture[i].handlerTag !== handler.handlerTag) {
      gesture[i].handlerTag = handler.handlerTag;
      gesture[i].handlers.handlerTag = handler.handlerTag;
    }
  } // use setImmediate to extract handlerTags, because when it's ran, all refs should be updated
  // and handlerTags in BaseGesture references should be updated in the loop above (we need to wait
  // in case of external relations)


  setImmediate(() => {
    if (!mountedRef.current) {
      return;
    }

    for (let i = 0; i < gesture.length; i++) {
      const handler = preparedGesture.config[i];
      handler.config = gesture[i].config;
      handler.handlers = gesture[i].handlers;
      const requireToFail = extractValidHandlerTags(handler.config.requireToFail);
      const simultaneousWith = extractValidHandlerTags(handler.config.simultaneousWith);

      _RNGestureHandlerModule.default.updateGestureHandler(handler.handlerTag, (0, _gestureHandlerCommon.filterConfig)(handler.config, ALLOWED_PROPS, {
        simultaneousHandlers: simultaneousWith,
        waitFor: requireToFail
      }));

      (0, _handlersRegistry.registerHandler)(handler.handlerTag, handler, handler.config.testId);
    }

    if (preparedGesture.animatedHandlers) {
      var _preparedGesture$anim;

      const previousHandlersValue = (_preparedGesture$anim = preparedGesture.animatedHandlers.value) !== null && _preparedGesture$anim !== void 0 ? _preparedGesture$anim : [];
      const newHandlersValue = preparedGesture.config.filter(g => g.shouldUseReanimated) // ignore gestures that shouldn't run on UI
      .map(g => g.handlers); // if amount of gesture configs changes, we need to update the callbacks in shared value

      let shouldUpdateSharedValue = previousHandlersValue.length !== newHandlersValue.length;

      if (!shouldUpdateSharedValue) {
        // if the amount is the same, we need to check if any of the configs inside has changed
        for (let i = 0; i < newHandlersValue.length; i++) {
          if ( // we can use the `gestureId` prop as it's unique for every config instance
          newHandlersValue[i].gestureId !== previousHandlersValue[i].gestureId) {
            shouldUpdateSharedValue = true;
            break;
          }
        }
      }

      if (shouldUpdateSharedValue) {
        preparedGesture.animatedHandlers.value = newHandlersValue;
      }
    }

    (0, _gestureHandlerCommon.scheduleFlushOperations)();
  });
}

function needsToReattach(preparedGesture, gesture) {
  if (gesture.length !== preparedGesture.config.length) {
    return true;
  }

  for (let i = 0; i < gesture.length; i++) {
    if (gesture[i].handlerName !== preparedGesture.config[i].handlerName || gesture[i].shouldUseReanimated !== preparedGesture.config[i].shouldUseReanimated) {
      return true;
    }
  }

  return false;
}

function isStateChangeEvent(event) {
  'worklet'; // @ts-ignore Yes, the oldState prop is missing on GestureTouchEvent, that's the point

  return event.oldState != null;
}

function isTouchEvent(event) {
  'worklet';

  return event.eventType != null;
}

function getHandler(type, gesture) {
  'worklet';

  switch (type) {
    case _gesture.CALLBACK_TYPE.BEGAN:
      return gesture.onBegin;

    case _gesture.CALLBACK_TYPE.START:
      return gesture.onStart;

    case _gesture.CALLBACK_TYPE.UPDATE:
      return gesture.onUpdate;

    case _gesture.CALLBACK_TYPE.CHANGE:
      return gesture.onChange;

    case _gesture.CALLBACK_TYPE.END:
      return gesture.onEnd;

    case _gesture.CALLBACK_TYPE.FINALIZE:
      return gesture.onFinalize;

    case _gesture.CALLBACK_TYPE.TOUCHES_DOWN:
      return gesture.onTouchesDown;

    case _gesture.CALLBACK_TYPE.TOUCHES_MOVE:
      return gesture.onTouchesMove;

    case _gesture.CALLBACK_TYPE.TOUCHES_UP:
      return gesture.onTouchesUp;

    case _gesture.CALLBACK_TYPE.TOUCHES_CANCELLED:
      return gesture.onTouchesCancelled;
  }
}

function touchEventTypeToCallbackType(eventType) {
  'worklet';

  switch (eventType) {
    case _TouchEventType.TouchEventType.TOUCHES_DOWN:
      return _gesture.CALLBACK_TYPE.TOUCHES_DOWN;

    case _TouchEventType.TouchEventType.TOUCHES_MOVE:
      return _gesture.CALLBACK_TYPE.TOUCHES_MOVE;

    case _TouchEventType.TouchEventType.TOUCHES_UP:
      return _gesture.CALLBACK_TYPE.TOUCHES_UP;

    case _TouchEventType.TouchEventType.TOUCHES_CANCELLED:
      return _gesture.CALLBACK_TYPE.TOUCHES_CANCELLED;
  }

  return _gesture.CALLBACK_TYPE.UNDEFINED;
}

function runWorklet(type, gesture, event, ...args) {
  'worklet';

  const handler = getHandler(type, gesture);

  if (gesture.isWorklet[type]) {
    // @ts-ignore Logic below makes sure the correct event is send to the
    // correct handler.
    handler === null || handler === void 0 ? void 0 : handler(event, ...args);
  } else if (handler) {
    console.warn((0, _utils.tagMessage)('Animated gesture callback must be a worklet'));
  }
}

function useAnimatedGesture(preparedGesture, needsRebuild) {
  if (!_reanimatedWrapper.Reanimated) {
    return;
  } // Hooks are called conditionally, but the condition is whether the
  // react-native-reanimated is installed, which shouldn't change while running
  // eslint-disable-next-line react-hooks/rules-of-hooks


  const sharedHandlersCallbacks = _reanimatedWrapper.Reanimated.useSharedValue(null); // eslint-disable-next-line react-hooks/rules-of-hooks


  const lastUpdateEvent = _reanimatedWrapper.Reanimated.useSharedValue([]); // not every gesture needs a state controller, init them lazily


  const stateControllers = [];

  const callback = event => {
    'worklet';

    const currentCallback = sharedHandlersCallbacks.value;

    if (!currentCallback) {
      return;
    }

    for (let i = 0; i < currentCallback.length; i++) {
      const gesture = currentCallback[i];

      if (event.handlerTag === gesture.handlerTag) {
        if (isStateChangeEvent(event)) {
          if (event.oldState === _State.State.UNDETERMINED && event.state === _State.State.BEGAN) {
            runWorklet(_gesture.CALLBACK_TYPE.BEGAN, gesture, event);
          } else if ((event.oldState === _State.State.BEGAN || event.oldState === _State.State.UNDETERMINED) && event.state === _State.State.ACTIVE) {
            runWorklet(_gesture.CALLBACK_TYPE.START, gesture, event);
            lastUpdateEvent.value[gesture.handlerTag] = undefined;
          } else if (event.oldState !== event.state && event.state === _State.State.END) {
            if (event.oldState === _State.State.ACTIVE) {
              runWorklet(_gesture.CALLBACK_TYPE.END, gesture, event, true);
            }

            runWorklet(_gesture.CALLBACK_TYPE.FINALIZE, gesture, event, true);
          } else if ((event.state === _State.State.FAILED || event.state === _State.State.CANCELLED) && event.state !== event.oldState) {
            if (event.oldState === _State.State.ACTIVE) {
              runWorklet(_gesture.CALLBACK_TYPE.END, gesture, event, false);
            }

            runWorklet(_gesture.CALLBACK_TYPE.FINALIZE, gesture, event, false);
          }
        } else if (isTouchEvent(event)) {
          if (!stateControllers[i]) {
            stateControllers[i] = _gestureStateManager.GestureStateManager.create(event.handlerTag);
          }

          if (event.eventType !== _TouchEventType.TouchEventType.UNDETERMINED) {
            runWorklet(touchEventTypeToCallbackType(event.eventType), gesture, event, stateControllers[i]);
          }
        } else {
          runWorklet(_gesture.CALLBACK_TYPE.UPDATE, gesture, event);

          if (gesture.onChange && gesture.changeEventCalculator) {
            var _gesture$changeEventC;

            runWorklet(_gesture.CALLBACK_TYPE.CHANGE, gesture, (_gesture$changeEventC = gesture.changeEventCalculator) === null || _gesture$changeEventC === void 0 ? void 0 : _gesture$changeEventC.call(gesture, event, lastUpdateEvent.value[gesture.handlerTag]));
            lastUpdateEvent.value[gesture.handlerTag] = event;
          }
        }
      }
    }
  }; // eslint-disable-next-line react-hooks/rules-of-hooks


  const event = _reanimatedWrapper.Reanimated.useEvent(callback, ['onGestureHandlerStateChange', 'onGestureHandlerEvent'], needsRebuild);

  preparedGesture.animatedEventHandler = event;
  preparedGesture.animatedHandlers = sharedHandlersCallbacks;
} // eslint-disable-next-line @typescript-eslint/no-explicit-any


function validateDetectorChildren(ref) {
  // finds the first native view under the Wrap component and traverses the fiber tree upwards
  // to check whether there is more than one native view as a pseudo-direct child of GestureDetector
  // i.e. this is not ok:
  //            Wrap
  //             |
  //            / \
  //           /   \
  //          /     \
  //         /       \
  //   NativeView  NativeView
  //
  // but this is fine:
  //            Wrap
  //             |
  //         NativeView
  //             |
  //            / \
  //           /   \
  //          /     \
  //         /       \
  //   NativeView  NativeView
  if (__DEV__ && _reactNative.Platform.OS !== 'web') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const wrapType = _utils.REACT_NATIVE_VERSION.minor > 63 || _utils.REACT_NATIVE_VERSION.major > 0 ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ref._reactInternals.elementType : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ref._reactInternalFiber.elementType; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    let instance = _RNRenderer.RNRenderer.findHostInstance_DEPRECATED(ref)._internalFiberInstanceHandleDEV; // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access


    while (instance && instance.elementType !== wrapType) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (instance.sibling) {
        throw new Error('GestureDetector has more than one native view as its children. This can happen if you are using a custom component that renders multiple views, like React.Fragment. You should wrap content of GestureDetector with a <View> or <Animated.View>.');
      } // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access


      instance = instance.return;
    }
  }
}

const applyUserSelectProp = (userSelect, gesture) => {
  for (const g of gesture.toGestureArray()) {
    g.config.userSelect = userSelect;
  }
};

const GestureDetector = props => {
  const gestureConfig = props.gesture;

  if (props.userSelect) {
    applyUserSelectProp(props.userSelect, gestureConfig);
  }

  const gesture = gestureConfig.toGestureArray();
  const useReanimatedHook = gesture.some(g => g.shouldUseReanimated); // store state in ref to prevent unnecessary renders

  const state = (0, _react.useRef)({
    firstRender: true,
    viewRef: null,
    previousViewTag: -1,
    forceReattach: false
  }).current;
  const mountedRef = (0, _react.useRef)(false);
  const webEventHandlersRef = (0, _react.useRef)({
    onGestureHandlerEvent: e => {
      (0, _eventReceiver.onGestureHandlerEvent)(e.nativeEvent);
    },
    onGestureHandlerStateChange: (0, _EnableExperimentalWebImplementation.isExperimentalWebImplementationEnabled)() ? e => {
      (0, _eventReceiver.onGestureHandlerEvent)(e.nativeEvent);
    } : undefined
  });
  const [renderState, setRenderState] = (0, _react.useState)(false);

  function forceRender() {
    setRenderState(!renderState);
  }

  const preparedGesture = _react.default.useRef({
    config: gesture,
    animatedEventHandler: null,
    animatedHandlers: null,
    firstExecution: true,
    useReanimatedHook: useReanimatedHook
  }).current;

  if (useReanimatedHook !== preparedGesture.useReanimatedHook) {
    throw new Error((0, _utils.tagMessage)('You cannot change the thread the callbacks are ran on while the app is running'));
  }

  function onHandlersUpdate(skipConfigUpdate) {
    // if the underlying view has changed we need to reattach handlers to the new view
    const viewTag = (0, _gestureHandlerCommon.findNodeHandle)(state.viewRef);
    const forceReattach = viewTag !== state.previousViewTag;

    if (forceReattach || needsToReattach(preparedGesture, gesture)) {
      validateDetectorChildren(state.viewRef);
      dropHandlers(preparedGesture);
      attachHandlers({
        preparedGesture,
        gestureConfig,
        gesture,
        webEventHandlersRef,
        viewTag,
        mountedRef
      });
      state.previousViewTag = viewTag;
      state.forceReattach = forceReattach;

      if (forceReattach) {
        forceRender();
      }
    } else if (!skipConfigUpdate) {
      updateHandlers(preparedGesture, gestureConfig, gesture, mountedRef);
    }
  } // Reanimated event should be rebuilt only when gestures are reattached, otherwise
  // config update will be enough as all necessary items are stored in shared values anyway


  const needsToRebuildReanimatedEvent = preparedGesture.firstExecution || needsToReattach(preparedGesture, gesture) || state.forceReattach;
  state.forceReattach = false;

  if (preparedGesture.firstExecution) {
    gestureConfig.initialize();
  }

  if (useReanimatedHook) {
    // Whether animatedGesture or gesture is used shouldn't change while the app is running
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedGesture(preparedGesture, needsToRebuildReanimatedEvent);
  }

  (0, _react.useEffect)(() => {
    const viewTag = (0, _gestureHandlerCommon.findNodeHandle)(state.viewRef);
    state.firstRender = true;
    mountedRef.current = true;
    validateDetectorChildren(state.viewRef);
    attachHandlers({
      preparedGesture,
      gestureConfig,
      gesture,
      webEventHandlersRef,
      viewTag,
      mountedRef
    });
    return () => {
      mountedRef.current = false;
      dropHandlers(preparedGesture);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (!state.firstRender) {
      onHandlersUpdate();
    } else {
      state.firstRender = false;
    }
  }, [props]);

  const refFunction = ref => {
    if (ref !== null) {
      // @ts-ignore Just setting the view ref
      state.viewRef = ref; // if it's the first render, also set the previousViewTag to prevent reattaching gestures when not needed

      if (state.previousViewTag === -1) {
        state.previousViewTag = (0, _gestureHandlerCommon.findNodeHandle)(state.viewRef);
      } // pass true as `skipConfigUpdate`, here we only want to trigger the eventual reattaching of handlers
      // in case the view has changed, while config update would be handled be the `useEffect` above


      onHandlersUpdate(true);

      if ((0, _utils.isFabric)()) {
        const node = (0, _getShadowNodeFromRef.getShadowNodeFromRef)(ref);

        if (global.isFormsStackingContext(node) === false) {
          console.error((0, _utils.tagMessage)('GestureDetector has received a child that may get view-flattened. ' + '\nTo prevent it from misbehaving you need to wrap the child with a `<View collapsable={false}>`.'));
        }
      }
    }
  };

  if (useReanimatedHook) {
    return /*#__PURE__*/_react.default.createElement(AnimatedWrap, {
      ref: refFunction,
      onGestureHandlerEvent: preparedGesture.animatedEventHandler
    }, props.children);
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrap, {
      ref: refFunction
    }, props.children);
  }
};

exports.GestureDetector = GestureDetector;

class Wrap extends _react.default.Component {
  render() {
    try {
      // I don't think that fighting with types over such a simple function is worth it
      // The only thing it does is add 'collapsable: false' to the child component
      // to make sure it is in the native view hierarchy so the detector can find
      // correct viewTag to attach to.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const child = _react.default.Children.only(this.props.children);

      return /*#__PURE__*/_react.default.cloneElement(child, {
        collapsable: false
      }, // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      child.props.children);
    } catch (e) {
      throw new Error((0, _utils.tagMessage)(`GestureDetector got more than one view as a child. If you want the gesture to work on multiple views, wrap them with a common parent and attach the gesture to that view.`));
    }
  }

}

const AnimatedWrap = (_Reanimated$default$c = _reanimatedWrapper.Reanimated === null || _reanimatedWrapper.Reanimated === void 0 ? void 0 : (_Reanimated$default = _reanimatedWrapper.Reanimated.default) === null || _Reanimated$default === void 0 ? void 0 : _Reanimated$default.createAnimatedComponent(Wrap)) !== null && _Reanimated$default$c !== void 0 ? _Reanimated$default$c : Wrap;
//# sourceMappingURL=GestureDetector.js.map