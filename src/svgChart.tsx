import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React, { useState, useImperativeHandle, forwardRef, memo } from 'react';

import { Platform, View } from 'react-native';

import {
  setPlatformAPI,
  // DEFAULT_FONT_FAMILY as zrenderFontFamily,
} from 'zrender/lib/core/platform';
import { measureText } from './utils/platform';
// import { DEFAULT_FONT_FAMILY } from './utils/font';
import { GestureHandler } from './components/GestureHandler';
export { SVGRenderer } from './SVGRenderer';

setPlatformAPI({ measureText });

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
  mask: Mask,
};

type SVGVNodeAttrs = Record<string, string | number | undefined | boolean>;

function toCamelCase(str: string) {
  var reg = /-(\w)/g;
  return str.replace(reg, function (_: any, $1: string) {
    return $1.toUpperCase();
  });
}
export interface SVGVNode {
  tag: string;
  attrs: SVGVNodeAttrs;
  children?: SVGVNode[];
  text?: string;

  // For patching
  elm?: Node;
  key?: string;
}

interface SVGVNodeProps {
  node?: SVGVNode;
  useRNGH?: boolean;
}
interface SVGVEleProps {
  node: SVGVNode;
  touchStart?: any;
  touchMove?: any;
  touchEnd?: any;
}

const fontStyleReg = /([\w-]+):([\w-]+);/g;
function SvgEle(props: SVGVEleProps) {
  const { node } = props;
  if (!node) return null;
  const { tag, text, children } = node;
  // const Tag = tagMap[tag as keyof typeof tagMap];
  // @ts-ignore
  const Tag = tagMap[tag];
  if (!Tag) return null;
  const attrs: any = Object.entries(node.attrs).reduce(
    (carry, [key, value]) => {
      carry[toCamelCase(key)] = value;
      return carry;
    },
    {} as Record<string, any>
  );
  if (tag === 'text') {
    if (attrs.style) {
      // TODO: 全局替换字体做法比较暴力，或者实用定义字体，可能某些场景字体设置失效，需要修复
      // attrs.style = attrs.style.replace(new RegExp(zrenderFontFamily, 'g'), DEFAULT_FONT_FAMILY);
      // console.log('attrs.style', attrs.style);

      [...attrs.style.matchAll(fontStyleReg)].forEach(([_, key, value]) => {
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
    return <Text {...attrs}>{text}</Text>;
  }
  // fix: https://github.com/react-native-svg/react-native-svg/issues/983
  if (attrs.clipPath && !attrs.clipRule && Platform.OS === 'android') {
    attrs.clipRule = 'nonzero';
  }
  if (tag === 'path') {
    return <Path {...attrs} />;
  }
  if (tag === 'linearGradient' || tag === 'radialGradient') {
    // note: 强制刷新渐变
    // https://github.com/software-mansion/react-native-svg/issues/1762
    return (
      <Tag {...attrs}>
        {children?.map((child) =>
          SvgEle({
            node: child,
          })
        )}
      </Tag>
    );
  }
  return (
    <Tag key={node.key} {...attrs}>
      {children?.map((child) => (
        <SvgEle key={child.key} node={child} />
      ))}
    </Tag>
  );
}

function SvgRoot(props: SVGVEleProps) {
  const { node } = props;
  const { attrs, children } = node;
  const { width, height, viewBox } = attrs;
  return (
    <Svg
      width={width as string}
      height={height as string}
      viewBox={viewBox as string}
    >
      {children?.map((child) => (
        <SvgEle key={child.key} node={child} />
      ))}
    </Svg>
  );
}

function SvgComponent(props: SVGVNodeProps, ref?: any) {
  const { node, useRNGH = false } = props;
  const [svgNode, setSvgNode] = useState<SVGVNode | undefined>(node);
  const width = Number(svgNode?.attrs?.width ?? 0);
  const height = Number(svgNode?.attrs?.height ?? 0);
  const [zrenderId, setZrenderId] = useState(0);

  useImperativeHandle(ref, () => ({
    elm: {
      setAttribute: (_name: string, _value: any) => {},
      setAttributeNS: (_name: string, _value: any) => {},
      removeAttribute: (_name: string) => {},
      patch: (_oldVnode: SVGVNode, vnode: SVGVNode) => {
        setSvgNode(vnode);
      },
      setZrenderId: (id: number) => {
        setZrenderId(id);
      },
    },
  }));
  return svgNode ? (
    <View style={{ width, height }}>
      <SvgRoot node={svgNode} />
      <GestureHandler zrenderId={zrenderId} useRNGH={useRNGH} />
    </View>
  ) : null;
}
export default memo(forwardRef(SvgComponent));
