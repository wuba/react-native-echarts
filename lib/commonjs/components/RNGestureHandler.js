"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RNGestureHandler = RNGestureHandler;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _events = require("./events");
var _styles = require("./styles");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function throttle(func, wait) {
  let lastExecution = 0;
  return function () {
    const now = Date.now();
    if (now - lastExecution >= wait) {
      lastExecution = now;
      func(...arguments);
    }
  };
}
function RNGestureHandler(_ref) {
  let {
    zrenderId,
    RNGH
  } = _ref;
  const {
    Gesture,
    GestureDetector
  } = RNGH;
  const dragGesture = (0, _react.useMemo)(() => Gesture.Pan().runOnJS(true).maxPointers(1).onBegin(e => {
    (0, _events.dispatchEvent)(zrenderId, ['mousedown', 'mousemove'], e);
  }).onUpdate(throttle(e => {
    (0, _events.dispatchEvent)(zrenderId, ['mousemove'], e);
  }, 50)).onEnd(e => {
    (0, _events.dispatchEvent)(zrenderId, ['mouseup'], e);
  }), [Gesture, zrenderId]);
  const pinchGesture = (0, _react.useMemo)(() => Gesture.Pinch().runOnJS(true).onUpdate(e => {
    (0, _events.dispatchEvent)(zrenderId, ['mousewheel'], e, {
      zrX: e.focalX,
      zrY: e.focalY,
      zrDelta: e.velocity / 20
    });
  }), [Gesture, zrenderId]);
  const tapGesture = (0, _react.useMemo)(() => Gesture.Tap().runOnJS(true).onStart(e => {
    (0, _events.dispatchEvent)(zrenderId, ['mousedown', 'mousemove'], e);
  }).onEnd(e => {
    (0, _events.dispatchEvent)(zrenderId, ['mouseup', 'click'], e);
  }), [Gesture, zrenderId]);
  const composed = Gesture.Race(pinchGesture, dragGesture, tapGesture);
  return /*#__PURE__*/_react.default.createElement(GestureDetector, {
    gesture: composed
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.GestureView
  }));
}
//# sourceMappingURL=RNGestureHandler.js.map