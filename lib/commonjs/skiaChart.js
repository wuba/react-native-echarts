"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SVGRenderer", {
  enumerable: true,
  get: function () {
    return _SVGRenderer.SVGRenderer;
  }
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeSkia = require("@shopify/react-native-skia");
var _reactNative = require("react-native");
var _platform = require("zrender/lib/core/platform");
var _platform2 = require("./utils/platform");
var _GestureHandler = require("./components/GestureHandler");
var _SVGRenderer = require("./SVGRenderer");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import { DEFAULT_FONT_FAMILY } from './utils/font';

(0, _platform.setPlatformAPI)({
  measureText: _platform2.measureText
});
function getSkSvg(svg) {
  // TODO: 全局替换字体做法比较暴力，或者实用定义字体，可能某些场景字体设置失效，需要修复
  // if (svg) {
  //   svg = svg.replace(new RegExp(zrenderFontFamily, 'g'), DEFAULT_FONT_FAMILY)
  //   console.log('svg', svg)
  // }
  const initString = svg ? _reactNativeSkia.Skia.SVG.MakeFromString(svg) : undefined;
  return initString ?? undefined;
}
function SkiaComponent(props, ref) {
  const {
    svg,
    useRNGH = false
  } = props;
  const [svgString, setSvgString] = (0, _react.useState)(getSkSvg(svg));
  const [width, setWidth] = (0, _react.useState)(props.width ?? 0);
  const [height, setHeight] = (0, _react.useState)(props.height ?? 0);
  const [zrenderId, setZrenderId] = (0, _react.useState)(0);
  (0, _react.useImperativeHandle)(ref, () => ({
    elm: {
      setAttribute: (name, value) => {
        if (name === 'width') {
          setWidth(value);
        }
        if (name === 'height') {
          setHeight(value);
        }
      },
      setAttributeNS: (_name, _value) => {},
      removeAttribute: _name => {},
      patchString: (_oldVnode, vnode) => {
        const _svgString = getSkSvg(vnode);
        setSvgString(_svgString);
      },
      setZrenderId: id => {
        setZrenderId(id);
      }
    },
    viewprot: {}
  }), []);
  return svgString ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width,
      height
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Canvas, {
    style: {
      width,
      height
    },
    pointerEvents: "auto"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSkia.ImageSVG, {
    svg: svgString,
    x: 0,
    y: 0,
    width: width,
    height: height
  })), /*#__PURE__*/_react.default.createElement(_GestureHandler.GestureHandler, {
    zrenderId: zrenderId,
    useRNGH: useRNGH
  })) : null;
}
var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(SkiaComponent));
exports.default = _default;
//# sourceMappingURL=skiaChart.js.map