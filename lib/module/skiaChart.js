import React, { useState, useImperativeHandle, forwardRef, memo } from 'react';
import { Canvas, ImageSVG, Skia } from '@shopify/react-native-skia';
import { View } from 'react-native';
import { setPlatformAPI
// DEFAULT_FONT_FAMILY as zrenderFontFamily,
} from 'zrender/lib/core/platform';
// import { DEFAULT_FONT_FAMILY } from './utils/font';
import { measureText } from './utils/platform';
import { GestureHandler } from './components/GestureHandler';
export { SVGRenderer } from './SVGRenderer';
setPlatformAPI({
  measureText
});
function getSkSvg(svg) {
  // TODO: 全局替换字体做法比较暴力，或者实用定义字体，可能某些场景字体设置失效，需要修复
  // if (svg) {
  //   svg = svg.replace(new RegExp(zrenderFontFamily, 'g'), DEFAULT_FONT_FAMILY)
  //   console.log('svg', svg)
  // }
  const initString = svg ? Skia.SVG.MakeFromString(svg) : undefined;
  return initString ?? undefined;
}
function SkiaComponent(props, ref) {
  const {
    svg,
    useRNGH = false
  } = props;
  const [svgString, setSvgString] = useState(getSkSvg(svg));
  const [width, setWidth] = useState(props.width ?? 0);
  const [height, setHeight] = useState(props.height ?? 0);
  const [zrenderId, setZrenderId] = useState(0);
  useImperativeHandle(ref, () => ({
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
  return svgString ? /*#__PURE__*/React.createElement(View, {
    style: {
      width,
      height
    }
  }, /*#__PURE__*/React.createElement(Canvas, {
    style: {
      width,
      height
    },
    pointerEvents: "auto"
  }, /*#__PURE__*/React.createElement(ImageSVG, {
    svg: svgString,
    x: 0,
    y: 0,
    width: width,
    height: height
  })), /*#__PURE__*/React.createElement(GestureHandler, {
    zrenderId: zrenderId,
    useRNGH: useRNGH
  })) : null;
}
export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(SkiaComponent));
//# sourceMappingURL=skiaChart.js.map