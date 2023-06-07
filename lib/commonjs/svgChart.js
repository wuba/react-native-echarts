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
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _platform = require("zrender/lib/core/platform");
var _platform2 = require("./utils/platform");
var _GestureHandler = require("./components/GestureHandler");
var _SVGRenderer = require("./SVGRenderer");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // import { DEFAULT_FONT_FAMILY } from './utils/font';
(0, _platform.setPlatformAPI)({
  measureText: _platform2.measureText
});
const tagMap = {
  svg: _reactNativeSvg.default,
  circle: _reactNativeSvg.Circle,
  ellipse: _reactNativeSvg.Ellipse,
  g: _reactNativeSvg.G,
  text: _reactNativeSvg.Text,
  tspan: _reactNativeSvg.TSpan,
  textPath: _reactNativeSvg.TextPath,
  path: _reactNativeSvg.Path,
  polygon: _reactNativeSvg.Polygon,
  polyline: _reactNativeSvg.Polyline,
  line: _reactNativeSvg.Line,
  rect: _reactNativeSvg.Rect,
  use: _reactNativeSvg.Use,
  image: _reactNativeSvg.Image,
  symbol: _reactNativeSvg.Symbol,
  defs: _reactNativeSvg.Defs,
  linearGradient: _reactNativeSvg.LinearGradient,
  radialGradient: _reactNativeSvg.RadialGradient,
  stop: _reactNativeSvg.Stop,
  clipPath: _reactNativeSvg.ClipPath,
  pattern: _reactNativeSvg.Pattern,
  mask: _reactNativeSvg.Mask
};
function toCamelCase(str) {
  var reg = /-(\w)/g;
  return str.replace(reg, function (_, $1) {
    return $1.toUpperCase();
  });
}
const fontStyleReg = /([\w-]+):([\w-]+);/g;
function SvgEle(props) {
  const {
    node
  } = props;
  if (!node) return null;
  const {
    tag,
    text,
    children
  } = node;
  // const Tag = tagMap[tag as keyof typeof tagMap];
  // @ts-ignore
  const Tag = tagMap[tag];
  if (!Tag) return null;
  const attrs = Object.entries(node.attrs).reduce((carry, _ref) => {
    let [key, value] = _ref;
    carry[toCamelCase(key)] = value;
    return carry;
  }, {});
  if (tag === 'text') {
    if (attrs.style) {
      // TODO: 全局替换字体做法比较暴力，或者实用定义字体，可能某些场景字体设置失效，需要修复
      // attrs.style = attrs.style.replace(new RegExp(zrenderFontFamily, 'g'), DEFAULT_FONT_FAMILY);
      // console.log('attrs.style', attrs.style);

      [...attrs.style.matchAll(fontStyleReg)].forEach(_ref2 => {
        let [_, key, value] = _ref2;
        // 修复 text 属性无效的问题
        if (key !== 'font-family') {
          attrs[toCamelCase(key)] = value;
        }
      });
    }
    if (!attrs.alignmentBaseline && attrs.dominantBaseline) {
      attrs.alignmentBaseline = 'middle';
    }
    // fix: https://github.com/react-native-svg/react-native-svg/issues/1862
    if (attrs.paintOrder === 'stroke') {
      attrs.strokeWidth = 0;
    }
    // fixed svg fillOpacity bug in some render processes
    if (attrs.fillOpacity === undefined) {
      attrs.fillOpacity = 1;
    }
    return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Text, attrs, text);
  }
  // fix: https://github.com/react-native-svg/react-native-svg/issues/983
  if (attrs.clipPath && !attrs.clipRule && _reactNative.Platform.OS === 'android') {
    attrs.clipRule = 'nonzero';
  }
  if (tag === 'path') {
    return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, attrs);
  }
  if (tag === 'linearGradient' || tag === 'radialGradient') {
    // note: 强制刷新渐变
    // https://github.com/software-mansion/react-native-svg/issues/1762
    return /*#__PURE__*/_react.default.createElement(Tag, attrs, children === null || children === void 0 ? void 0 : children.map(child => SvgEle({
      node: child
    })));
  }
  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    key: node.key
  }, attrs), children === null || children === void 0 ? void 0 : children.map(child => /*#__PURE__*/_react.default.createElement(SvgEle, {
    key: child.key,
    node: child
  })));
}
function SvgRoot(props) {
  const {
    node
  } = props;
  const {
    attrs,
    children
  } = node;
  const {
    width,
    height,
    viewBox
  } = attrs;
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    width: width,
    height: height,
    viewBox: viewBox
  }, children === null || children === void 0 ? void 0 : children.map(child => /*#__PURE__*/_react.default.createElement(SvgEle, {
    key: child.key,
    node: child
  })));
}
function SvgComponent(props, ref) {
  var _svgNode$attrs, _svgNode$attrs2;
  const {
    node,
    useRNGH = false
  } = props;
  const [svgNode, setSvgNode] = (0, _react.useState)(node);
  const width = Number((svgNode === null || svgNode === void 0 ? void 0 : (_svgNode$attrs = svgNode.attrs) === null || _svgNode$attrs === void 0 ? void 0 : _svgNode$attrs.width) ?? 0);
  const height = Number((svgNode === null || svgNode === void 0 ? void 0 : (_svgNode$attrs2 = svgNode.attrs) === null || _svgNode$attrs2 === void 0 ? void 0 : _svgNode$attrs2.height) ?? 0);
  const [zrenderId, setZrenderId] = (0, _react.useState)(0);
  (0, _react.useImperativeHandle)(ref, () => ({
    elm: {
      setAttribute: (_name, _value) => {},
      setAttributeNS: (_name, _value) => {},
      removeAttribute: _name => {},
      patch: (_oldVnode, vnode) => {
        setSvgNode(vnode);
      },
      setZrenderId: id => {
        setZrenderId(id);
      }
    }
  }), []);
  return svgNode ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width,
      height
    }
  }, /*#__PURE__*/_react.default.createElement(SvgRoot, {
    node: svgNode
  }), /*#__PURE__*/_react.default.createElement(_GestureHandler.GestureHandler, {
    zrenderId: zrenderId,
    useRNGH: useRNGH
  })) : null;
}
var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(SvgComponent));
exports.default = _default;
//# sourceMappingURL=svgChart.js.map