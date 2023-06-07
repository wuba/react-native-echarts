"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createHandler;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _RNGestureHandlerModule = _interopRequireDefault(require("../RNGestureHandlerModule"));

var _State = require("../State");

var _handlersRegistry = require("./handlersRegistry");

var _gestureHandlerCommon = require("./gestureHandlerCommon");

var _utils = require("../utils");

var _ActionType = require("../ActionType");

var _PressabilityDebugView = require("./PressabilityDebugView");

var _UIManagerAny$getView, _UIManagerAny$getView2, _UIManagerAny$getCons;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const UIManagerAny = _reactNative.UIManager;
const customGHEventsConfigFabricAndroid = {
  topOnGestureHandlerEvent: {
    registrationName: 'onGestureHandlerEvent'
  },
  topOnGestureHandlerStateChange: {
    registrationName: 'onGestureHandlerStateChange'
  }
};
const customGHEventsConfig = {
  onGestureHandlerEvent: {
    registrationName: 'onGestureHandlerEvent'
  },
  onGestureHandlerStateChange: {
    registrationName: 'onGestureHandlerStateChange'
  },
  // When using React Native Gesture Handler for Animated.event with useNativeDriver: true
  // on Android with Fabric enabled, the native part still sends the native events to JS
  // but prefixed with "top". We cannot simply rename the events above so they are prefixed
  // with "top" instead of "on" because in such case Animated.events would not be registered.
  // That's why we need to register another pair of event names.
  // The incoming events will be queued but never handled.
  // Without this piece of code below, you'll get the following JS error:
  // Unsupported top level event type "topOnGestureHandlerEvent" dispatched
  ...((0, _utils.isFabric)() && _reactNative.Platform.OS === 'android' && customGHEventsConfigFabricAndroid)
}; // Add gesture specific events to genericDirectEventTypes object exported from UIManager
// native module.
// Once new event types are registered with react it is possible to dispatch these
// events to all kind of native views.

UIManagerAny.genericDirectEventTypes = { ...UIManagerAny.genericDirectEventTypes,
  ...customGHEventsConfig
}; // In newer versions of RN the `genericDirectEventTypes` is located in the object
// returned by UIManager.getViewManagerConfig('getConstants') or in older RN UIManager.getConstants(), we need to add it there as well to make
// it compatible with RN 61+

const UIManagerConstants = (_UIManagerAny$getView = (_UIManagerAny$getView2 = UIManagerAny.getViewManagerConfig) === null || _UIManagerAny$getView2 === void 0 ? void 0 : _UIManagerAny$getView2.call(UIManagerAny, 'getConstants')) !== null && _UIManagerAny$getView !== void 0 ? _UIManagerAny$getView : (_UIManagerAny$getCons = UIManagerAny.getConstants) === null || _UIManagerAny$getCons === void 0 ? void 0 : _UIManagerAny$getCons.call(UIManagerAny);

if (UIManagerConstants) {
  UIManagerConstants.genericDirectEventTypes = { ...UIManagerConstants.genericDirectEventTypes,
    ...customGHEventsConfig
  };
} // Wrap JS responder calls and notify gesture handler manager


const {
  setJSResponder: oldSetJSResponder = () => {//no operation
  },
  clearJSResponder: oldClearJSResponder = () => {//no operation
  }
} = UIManagerAny;

UIManagerAny.setJSResponder = (tag, blockNativeResponder) => {
  _RNGestureHandlerModule.default.handleSetJSResponder(tag, blockNativeResponder);

  oldSetJSResponder(tag, blockNativeResponder);
};

UIManagerAny.clearJSResponder = () => {
  _RNGestureHandlerModule.default.handleClearJSResponder();

  oldClearJSResponder();
};

let allowTouches = true;
const DEV_ON_ANDROID = __DEV__ && _reactNative.Platform.OS === 'android'; // Toggled inspector blocks touch events in order to allow inspecting on Android
// This needs to be a global variable in order to set initial state for `allowTouches` property in Handler component

if (DEV_ON_ANDROID) {
  _reactNative.DeviceEventEmitter.addListener('toggleElementInspector', () => {
    allowTouches = !allowTouches;
  });
}

function hasUnresolvedRefs(props) {
  // TODO(TS) - add type for extract arg
  const extract = refs => {
    if (!Array.isArray(refs)) {
      return refs && refs.current === null;
    }

    return refs.some(r => r && r.current === null);
  };

  return extract(props['simultaneousHandlers']) || extract(props['waitFor']);
}

const stateToPropMappings = {
  [_State.State.UNDETERMINED]: undefined,
  [_State.State.BEGAN]: 'onBegan',
  [_State.State.FAILED]: 'onFailed',
  [_State.State.CANCELLED]: 'onCancelled',
  [_State.State.ACTIVE]: 'onActivated',
  [_State.State.END]: 'onEnded'
};
const UNRESOLVED_REFS_RETRY_LIMIT = 1; // TODO(TS) - make sure that BaseGestureHandlerProps doesn't need other generic parameter to work with custom properties.

function createHandler({
  name,
  allowedProps = [],
  config = {},
  transformProps,
  customNativeProps = []
}) {
  class Handler extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "handlerTag", void 0);

      _defineProperty(this, "config", void 0);

      _defineProperty(this, "propsRef", void 0);

      _defineProperty(this, "viewNode", void 0);

      _defineProperty(this, "viewTag", void 0);

      _defineProperty(this, "updateEnqueued", null);

      _defineProperty(this, "inspectorToggleListener", void 0);

      _defineProperty(this, "onGestureHandlerEvent", event => {
        if (event.nativeEvent.handlerTag === this.handlerTag) {
          if (typeof this.props.onGestureEvent === 'function') {
            var _this$props$onGesture, _this$props;

            (_this$props$onGesture = (_this$props = this.props).onGestureEvent) === null || _this$props$onGesture === void 0 ? void 0 : _this$props$onGesture.call(_this$props, event);
          }
        } else {
          var _this$props$onGesture2, _this$props2;

          (_this$props$onGesture2 = (_this$props2 = this.props).onGestureHandlerEvent) === null || _this$props$onGesture2 === void 0 ? void 0 : _this$props$onGesture2.call(_this$props2, event);
        }
      });

      _defineProperty(this, "onGestureHandlerStateChange", event => {
        if (event.nativeEvent.handlerTag === this.handlerTag) {
          if (typeof this.props.onHandlerStateChange === 'function') {
            var _this$props$onHandler, _this$props3;

            (_this$props$onHandler = (_this$props3 = this.props).onHandlerStateChange) === null || _this$props$onHandler === void 0 ? void 0 : _this$props$onHandler.call(_this$props3, event);
          }

          const state = event.nativeEvent.state;
          const stateEventName = stateToPropMappings[state];
          const eventHandler = stateEventName && this.props[stateEventName];

          if (eventHandler && typeof eventHandler === 'function') {
            eventHandler(event);
          }
        } else {
          var _this$props$onGesture3, _this$props4;

          (_this$props$onGesture3 = (_this$props4 = this.props).onGestureHandlerStateChange) === null || _this$props$onGesture3 === void 0 ? void 0 : _this$props$onGesture3.call(_this$props4, event);
        }
      });

      _defineProperty(this, "refHandler", node => {
        this.viewNode = node;
        const child = React.Children.only(this.props.children); // TODO(TS) fix ref type

        const {
          ref
        } = child;

        if (ref !== null) {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      });

      _defineProperty(this, "createGestureHandler", newConfig => {
        this.config = newConfig;

        _RNGestureHandlerModule.default.createGestureHandler(name, this.handlerTag, newConfig);
      });

      _defineProperty(this, "attachGestureHandler", newViewTag => {
        this.viewTag = newViewTag;

        if (_reactNative.Platform.OS === 'web') {
          // typecast due to dynamic resolution, attachGestureHandler should have web version signature in this branch
          _RNGestureHandlerModule.default.attachGestureHandler(this.handlerTag, newViewTag, _ActionType.ActionType.JS_FUNCTION_OLD_API, // ignored on web
          this.propsRef);
        } else {
          (0, _handlersRegistry.registerOldGestureHandler)(this.handlerTag, {
            onGestureEvent: this.onGestureHandlerEvent,
            onGestureStateChange: this.onGestureHandlerStateChange
          });

          const actionType = (() => {
            var _this$props5, _this$props6;

            if ((_this$props5 = this.props) !== null && _this$props5 !== void 0 && _this$props5.onGestureEvent && 'current' in this.props.onGestureEvent) {
              // Reanimated worklet
              return _ActionType.ActionType.REANIMATED_WORKLET;
            } else if ((_this$props6 = this.props) !== null && _this$props6 !== void 0 && _this$props6.onGestureEvent && '__isNative' in this.props.onGestureEvent) {
              // Animated.event with useNativeDriver: true
              return _ActionType.ActionType.NATIVE_ANIMATED_EVENT;
            } else {
              // JS callback or Animated.event with useNativeDriver: false
              return _ActionType.ActionType.JS_FUNCTION_OLD_API;
            }
          })();

          _RNGestureHandlerModule.default.attachGestureHandler(this.handlerTag, newViewTag, actionType);
        }

        (0, _gestureHandlerCommon.scheduleFlushOperations)();
      });

      _defineProperty(this, "updateGestureHandler", newConfig => {
        this.config = newConfig;

        _RNGestureHandlerModule.default.updateGestureHandler(this.handlerTag, newConfig);

        (0, _gestureHandlerCommon.scheduleFlushOperations)();
      });

      this.handlerTag = (0, _handlersRegistry.getNextHandlerTag)();
      this.config = {};
      this.propsRef = /*#__PURE__*/React.createRef();
      this.state = {
        allowTouches
      };

      if (props.id) {
        if (_handlersRegistry.handlerIDToTag[props.id] !== undefined) {
          throw new Error(`Handler with ID "${props.id}" already registered`);
        }

        _handlersRegistry.handlerIDToTag[props.id] = this.handlerTag;
      }
    }

    componentDidMount() {
      const props = this.props;

      if (DEV_ON_ANDROID) {
        this.inspectorToggleListener = _reactNative.DeviceEventEmitter.addListener('toggleElementInspector', () => {
          this.setState(_ => ({
            allowTouches
          }));
          this.update(UNRESOLVED_REFS_RETRY_LIMIT);
        });
      }

      if (hasUnresolvedRefs(props)) {
        // If there are unresolved refs (e.g. ".current" has not yet been set)
        // passed as `simultaneousHandlers` or `waitFor`, we enqueue a call to
        // _update method that will try to update native handler props using
        // setImmediate. This makes it so update() function gets called after all
        // react components are mounted and we expect the missing ref object to
        // be resolved by then.
        this.updateEnqueued = setImmediate(() => {
          this.updateEnqueued = null;
          this.update(UNRESOLVED_REFS_RETRY_LIMIT);
        });
      }

      this.createGestureHandler((0, _gestureHandlerCommon.filterConfig)(transformProps ? transformProps(this.props) : this.props, [...allowedProps, ...customNativeProps], config));
      this.attachGestureHandler((0, _gestureHandlerCommon.findNodeHandle)(this.viewNode)); // TODO(TS) - check if this can be null
    }

    componentDidUpdate() {
      const viewTag = (0, _gestureHandlerCommon.findNodeHandle)(this.viewNode);

      if (this.viewTag !== viewTag) {
        this.attachGestureHandler(viewTag); // TODO(TS) - check interaction between _viewTag & findNodeHandle
      }

      this.update(UNRESOLVED_REFS_RETRY_LIMIT);
    }

    componentWillUnmount() {
      var _this$inspectorToggle;

      (_this$inspectorToggle = this.inspectorToggleListener) === null || _this$inspectorToggle === void 0 ? void 0 : _this$inspectorToggle.remove();

      _RNGestureHandlerModule.default.dropGestureHandler(this.handlerTag);

      (0, _gestureHandlerCommon.scheduleFlushOperations)();

      if (this.updateEnqueued) {
        clearImmediate(this.updateEnqueued);
      } // We can't use this.props.id directly due to TS generic type narrowing bug, see https://github.com/microsoft/TypeScript/issues/13995 for more context


      const handlerID = this.props.id;

      if (handlerID) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete _handlersRegistry.handlerIDToTag[handlerID];
      }
    }

    update(remainingTries) {
      const props = this.props; // When ref is set via a function i.e. `ref={(r) => refObject.current = r}` instead of
      // `ref={refObject}` it's possible that it won't be resolved in time. Seems like trying
      // again is easy enough fix.

      if (hasUnresolvedRefs(props) && remainingTries > 0) {
        this.updateEnqueued = setImmediate(() => {
          this.updateEnqueued = null;
          this.update(remainingTries - 1);
        });
      } else {
        const newConfig = (0, _gestureHandlerCommon.filterConfig)(transformProps ? transformProps(this.props) : this.props, [...allowedProps, ...customNativeProps], config);

        if (!(0, _isEqual.default)(this.config, newConfig)) {
          this.updateGestureHandler(newConfig);
        }
      }
    }

    setNativeProps(updates) {
      const mergedProps = { ...this.props,
        ...updates
      };
      const newConfig = (0, _gestureHandlerCommon.filterConfig)(transformProps ? transformProps(mergedProps) : mergedProps, [...allowedProps, ...customNativeProps], config);
      this.updateGestureHandler(newConfig);
    }

    render() {
      var _this$props$testID;

      let gestureEventHandler = this.onGestureHandlerEvent; // Another instance of https://github.com/microsoft/TypeScript/issues/13995

      const {
        onGestureEvent,
        onGestureHandlerEvent
      } = this.props;

      if (onGestureEvent && typeof onGestureEvent !== 'function') {
        // If it's not a method it should be an native Animated.event
        // object. We set it directly as the handler for the view
        // In this case nested handlers are not going to be supported
        if (onGestureHandlerEvent) {
          throw new Error('Nesting touch handlers with native animated driver is not supported yet');
        }

        gestureEventHandler = onGestureEvent;
      } else {
        if (onGestureHandlerEvent && typeof onGestureHandlerEvent !== 'function') {
          throw new Error('Nesting touch handlers with native animated driver is not supported yet');
        }
      }

      let gestureStateEventHandler = this.onGestureHandlerStateChange; // Another instance of https://github.com/microsoft/TypeScript/issues/13995

      const {
        onHandlerStateChange,
        onGestureHandlerStateChange
      } = this.props;

      if (onHandlerStateChange && typeof onHandlerStateChange !== 'function') {
        // If it's not a method it should be an native Animated.event
        // object. We set it directly as the handler for the view
        // In this case nested handlers are not going to be supported
        if (onGestureHandlerStateChange) {
          throw new Error('Nesting touch handlers with native animated driver is not supported yet');
        }

        gestureStateEventHandler = onHandlerStateChange;
      } else {
        if (onGestureHandlerStateChange && typeof onGestureHandlerStateChange !== 'function') {
          throw new Error('Nesting touch handlers with native animated driver is not supported yet');
        }
      }

      const events = {
        onGestureHandlerEvent: this.state.allowTouches ? gestureEventHandler : undefined,
        onGestureHandlerStateChange: this.state.allowTouches ? gestureStateEventHandler : undefined
      };
      this.propsRef.current = events;
      let child = null;

      try {
        child = React.Children.only(this.props.children);
      } catch (e) {
        throw new Error((0, _utils.tagMessage)(`${name} got more than one view as a child. If you want the gesture to work on multiple views, wrap them with a common parent and attach the gesture to that view.`));
      }

      let grandChildren = child.props.children;

      if (__DEV__ && child.type && (child.type === 'RNGestureHandlerButton' || child.type.name === 'View' || child.type.displayName === 'View')) {
        grandChildren = React.Children.toArray(grandChildren);
        grandChildren.push( /*#__PURE__*/React.createElement(_PressabilityDebugView.PressabilityDebugView, {
          key: "pressabilityDebugView",
          color: "mediumspringgreen",
          hitSlop: child.props.hitSlop
        }));
      }

      return /*#__PURE__*/React.cloneElement(child, {
        ref: this.refHandler,
        collapsable: false,
        ...((0, _utils.isJestEnv)() ? {
          handlerType: name,
          handlerTag: this.handlerTag
        } : {}),
        testID: (_this$props$testID = this.props.testID) !== null && _this$props$testID !== void 0 ? _this$props$testID : child.props.testID,
        ...events
      }, grandChildren);
    }

  }

  _defineProperty(Handler, "displayName", name);

  return Handler;
}
//# sourceMappingURL=createHandler.js.map