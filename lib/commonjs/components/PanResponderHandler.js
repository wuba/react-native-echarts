"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanResponderHandler = PanResponderHandler;
exports.usePanResponder = usePanResponder;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _events = require("./events");
var _styles = require("./styles");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function PanResponderHandler(_ref) {
  let {
    zrenderId
  } = _ref;
  const [panResponder] = usePanResponder(zrenderId);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, panResponder.panHandlers, {
    style: _styles.styles.GestureView
  }));
}
function usePanResponder(zrenderId) {
  const [zooming, setZooming] = (0, _react.useState)(false);
  const [moving, setMoving] = (0, _react.useState)(false);
  const pan = (0, _react.useRef)({
    initialX: 0,
    initialY: 0,
    prevDistance: 0
  });
  const panResponder = (0, _react.useMemo)(() => _reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: _ref2 => {
      let {
        nativeEvent
      } = _ref2;
      (0, _events.dispatchEvent)(zrenderId, ['mousedown', 'mousemove'], nativeEvent);
    },
    onPanResponderMove: _ref3 => {
      let {
        nativeEvent
      } = _ref3;
      const touches = nativeEvent.touches;
      const length = touches.length;
      if (length === 1) {
        if (!moving || zooming) {
          setMoving(true);
          setZooming(false);
        } else {
          (0, _events.dispatchEvent)(zrenderId, ['mousemove'], nativeEvent);
        }
      } else if (length === 2) {
        const [{
          locationX: x0,
          locationY: y0
        }, {
          locationX: x1,
          locationY: y1
        }] = touches;
        const distance = (0, _events.calcDistance)(x0, y0, x1, y1);
        const {
          x,
          y
        } = (0, _events.calcCenter)(x0, y0, x1, y1);
        if (!zooming) {
          pan.current = {
            initialX: x,
            initialY: y,
            prevDistance: distance
          };
          setZooming(true);
        } else {
          const {
            initialX,
            initialY,
            prevDistance
          } = pan.current;
          const delta = distance - prevDistance;
          pan.current.prevDistance = distance;
          (0, _events.dispatchEvent)(zrenderId, ['mousewheel'], nativeEvent, {
            zrX: initialX,
            zrY: initialY,
            zrDelta: delta / 120
          });
        }
      }
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: _ref4 => {
      let {
        nativeEvent
      } = _ref4;
      if (!zooming) {
        (0, _events.dispatchEvent)(zrenderId, ['mouseup', 'click'], nativeEvent);
      }
      setMoving(false);
      setZooming(false);
    },
    onPanResponderTerminate: () => {},
    onShouldBlockNativeResponder: () => {
      return false;
    }
  }), [moving, zooming, zrenderId, pan]);
  return [panResponder];
}
//# sourceMappingURL=PanResponderHandler.js.map