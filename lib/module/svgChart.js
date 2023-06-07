function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Svg, { Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask } from 'react-native-svg';
import React, { useState, useImperativeHandle, forwardRef, memo } from 'react';
import { Platform, View } from 'react-native';
import { setPlatformAPI
// DEFAULT_FONT_FAMILY as zrenderFontFamily,
} from 'zrender/lib/core/platform';
import { measureText } from './utils/platform';
// import { DEFAULT_FONT_FAMILY } from './utils/font';
import { GestureHandler } from './components/GestureHandler';
export { SVGRenderer } from './SVGRenderer';
setPlatformAPI({
  measureText
});
const tagMap = {
  svg: Svg,
  circle: Circle,
  ellipse: Ellipse,
  g: G,
  text: Text,
  tspan: TSpan,
  textPath: TextPath,
  path: Path,
  polygon: Polygon,
  polyline: Polyline,
  line: Line,
  rect: Rect,
  use: Use,
  image: Image,
  symbol: Symbol,
  defs: Defs,
  linearGradient: LinearGradient,
  radialGradient: RadialGradient,
  stop: Stop,
  clipPath: ClipPath,
  pattern: Pattern,
  mask: Mask
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
    return /*#__PURE__*/React.createElement(Text, attrs, text);
  }
  // fix: https://github.com/react-native-svg/react-native-svg/issues/983
  if (attrs.clipPath && !attrs.clipRule && Platform.OS === 'android') {
    attrs.clipRule = 'nonzero';
  }
  if (tag === 'path') {
    return /*#__PURE__*/React.createElement(Path, attrs);
  }
  if (tag === 'linearGradient' || tag === 'radialGradient') {
    // note: 强制刷新渐变
    // https://github.com/software-mansion/react-native-svg/issues/1762
    return /*#__PURE__*/React.createElement(Tag, attrs, children === null || children === void 0 ? void 0 : children.map(child => SvgEle({
      node: child
    })));
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({
    key: node.key
  }, attrs), children === null || children === void 0 ? void 0 : children.map(child => /*#__PURE__*/React.createElement(SvgEle, {
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
  return /*#__PURE__*/React.createElement(Svg, {
    width: width,
    height: height,
    viewBox: viewBox
  }, children === null || children === void 0 ? void 0 : children.map(child => /*#__PURE__*/React.createElement(SvgEle, {
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
  const [svgNode, setSvgNode] = useState(node);
  const width = Number((svgNode === null || svgNode === void 0 ? void 0 : (_svgNode$attrs = svgNode.attrs) === null || _svgNode$attrs === void 0 ? void 0 : _svgNode$attrs.width) ?? 0);
  const height = Number((svgNode === null || svgNode === void 0 ? void 0 : (_svgNode$attrs2 = svgNode.attrs) === null || _svgNode$attrs2 === void 0 ? void 0 : _svgNode$attrs2.height) ?? 0);
  const [zrenderId, setZrenderId] = useState(0);
  useImperativeHandle(ref, () => ({
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
  return svgNode ? /*#__PURE__*/React.createElement(View, {
    style: {
      width,
      height
    }
  }, /*#__PURE__*/React.createElement(SvgRoot, {
    node: svgNode
  }), /*#__PURE__*/React.createElement(GestureHandler, {
    zrenderId: zrenderId,
    useRNGH: useRNGH
  })) : null;
}
export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(SvgComponent));
//# sourceMappingURL=svgChart.js.map