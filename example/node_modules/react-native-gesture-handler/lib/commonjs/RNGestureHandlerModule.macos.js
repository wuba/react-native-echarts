"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HammerGestures = exports.Gestures = void 0;

var _EnableExperimentalWebImplementation = require("./EnableExperimentalWebImplementation");

var _InteractionManager = _interopRequireDefault(require("./web/tools/InteractionManager"));

var _NodeManager = _interopRequireDefault(require("./web/tools/NodeManager"));

var _PanGestureHandler = _interopRequireDefault(require("./web/handlers/PanGestureHandler"));

var _TapGestureHandler = _interopRequireDefault(require("./web/handlers/TapGestureHandler"));

var _LongPressGestureHandler = _interopRequireDefault(require("./web/handlers/LongPressGestureHandler"));

var _PinchGestureHandler = _interopRequireDefault(require("./web/handlers/PinchGestureHandler"));

var _RotationGestureHandler = _interopRequireDefault(require("./web/handlers/RotationGestureHandler"));

var _FlingGestureHandler = _interopRequireDefault(require("./web/handlers/FlingGestureHandler"));

var _NativeViewGestureHandler = _interopRequireDefault(require("./web/handlers/NativeViewGestureHandler"));

var _ManualGestureHandler = _interopRequireDefault(require("./web/handlers/ManualGestureHandler"));

var HammerNodeManager = _interopRequireWildcard(require("./web_hammer/NodeManager"));

var _NativeViewGestureHandler2 = _interopRequireDefault(require("./web_hammer/NativeViewGestureHandler"));

var _PanGestureHandler2 = _interopRequireDefault(require("./web_hammer/PanGestureHandler"));

var _TapGestureHandler2 = _interopRequireDefault(require("./web_hammer/TapGestureHandler"));

var _LongPressGestureHandler2 = _interopRequireDefault(require("./web_hammer/LongPressGestureHandler"));

var _PinchGestureHandler2 = _interopRequireDefault(require("./web_hammer/PinchGestureHandler"));

var _RotationGestureHandler2 = _interopRequireDefault(require("./web_hammer/RotationGestureHandler"));

var _FlingGestureHandler2 = _interopRequireDefault(require("./web_hammer/FlingGestureHandler"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//GestureHandlers
//Hammer Handlers
const Gestures = {
  NativeViewGestureHandler: _NativeViewGestureHandler.default,
  PanGestureHandler: _PanGestureHandler.default,
  TapGestureHandler: _TapGestureHandler.default,
  LongPressGestureHandler: _LongPressGestureHandler.default,
  PinchGestureHandler: _PinchGestureHandler.default,
  RotationGestureHandler: _RotationGestureHandler.default,
  FlingGestureHandler: _FlingGestureHandler.default,
  ManualGestureHandler: _ManualGestureHandler.default
};
exports.Gestures = Gestures;
const HammerGestures = {
  NativeViewGestureHandler: _NativeViewGestureHandler2.default,
  PanGestureHandler: _PanGestureHandler2.default,
  TapGestureHandler: _TapGestureHandler2.default,
  LongPressGestureHandler: _LongPressGestureHandler2.default,
  PinchGestureHandler: _PinchGestureHandler2.default,
  RotationGestureHandler: _RotationGestureHandler2.default,
  FlingGestureHandler: _FlingGestureHandler2.default
};
exports.HammerGestures = HammerGestures;
var _default = {
  handleSetJSResponder(_tag, _blockNativeResponder) {// NO-OP
  },

  handleClearJSResponder() {// NO-OP
  },

  createGestureHandler(handlerName, handlerTag, config) {
    if ((0, _EnableExperimentalWebImplementation.isExperimentalWebImplementationEnabled)()) {
      if (!(handlerName in Gestures)) {
        throw new Error(`react-native-gesture-handler: ${handlerName} is not supported on web.`);
      }

      const GestureClass = Gestures[handlerName];

      _NodeManager.default.createGestureHandler(handlerTag, new GestureClass());

      _InteractionManager.default.getInstance().configureInteractions(_NodeManager.default.getHandler(handlerTag), config);
    } else {
      if (!(handlerName in HammerGestures)) {
        throw new Error(`react-native-gesture-handler: ${handlerName} is not supported on web.`);
      } // @ts-ignore If it doesn't exist, the error is thrown
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment


      const GestureClass = HammerGestures[handlerName]; // eslint-disable-next-line @typescript-eslint/no-unsafe-call

      HammerNodeManager.createGestureHandler(handlerTag, new GestureClass());
    }

    this.updateGestureHandler(handlerTag, config);
  },

  attachGestureHandler(handlerTag, newView, _actionType, propsRef) {
    if ((0, _EnableExperimentalWebImplementation.isExperimentalWebImplementationEnabled)()) {
      _NodeManager.default.getHandler(handlerTag).init(newView, propsRef);
    } else {
      HammerNodeManager.getHandler(handlerTag).setView(newView, propsRef);
    }
  },

  updateGestureHandler(handlerTag, newConfig) {
    if ((0, _EnableExperimentalWebImplementation.isExperimentalWebImplementationEnabled)()) {
      _NodeManager.default.getHandler(handlerTag).updateGestureConfig(newConfig);

      _InteractionManager.default.getInstance().configureInteractions(_NodeManager.default.getHandler(handlerTag), newConfig);
    } else {
      HammerNodeManager.getHandler(handlerTag).updateGestureConfig(newConfig);
    }
  },

  getGestureHandlerNode(handlerTag) {
    if ((0, _EnableExperimentalWebImplementation.isExperimentalWebImplementationEnabled)()) {
      return _NodeManager.default.getHandler(handlerTag);
    } else {
      return HammerNodeManager.getHandler(handlerTag);
    }
  },

  dropGestureHandler(handlerTag) {
    if ((0, _EnableExperimentalWebImplementation.isExperimentalWebImplementationEnabled)()) {
      _NodeManager.default.dropGestureHandler(handlerTag);
    } else {
      HammerNodeManager.dropGestureHandler(handlerTag);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  flushOperations() {}

};
exports.default = _default;
//# sourceMappingURL=RNGestureHandlerModule.macos.js.map