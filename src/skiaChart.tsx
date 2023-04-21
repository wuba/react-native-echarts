import React, { useState, useImperativeHandle, forwardRef, memo } from 'react';

import { Canvas, ImageSVG, Skia, SkSVG } from '@shopify/react-native-skia';

import { View } from 'react-native';

import {
  setPlatformAPI,
  // DEFAULT_FONT_FAMILY as zrenderFontFamily,
} from 'zrender/lib/core/platform';
// import { DEFAULT_FONT_FAMILY } from './utils/font';
import { measureText } from './utils/platform';
import { GestureHandler } from './components/GestureHandler';
export { SVGRenderer } from './SVGRenderer';

setPlatformAPI({ measureText });

interface SkiaProps {
  svg?: string;
  width?: number;
  height?: number;
  useRNGH?: boolean;
}

function getSkSvg(svg?: string): SkSVG | undefined {
  // TODO: 全局替换字体做法比较暴力，或者实用定义字体，可能某些场景字体设置失效，需要修复
  // if (svg) {
  //   svg = svg.replace(new RegExp(zrenderFontFamily, 'g'), DEFAULT_FONT_FAMILY)
  //   console.log('svg', svg)
  // }
  const initString = svg ? Skia.SVG.MakeFromString(svg) : undefined;
  return initString ?? undefined;
}

function SkiaComponent(props: SkiaProps, ref?: any) {
  const { svg, useRNGH = false } = props;
  const [svgString, setSvgString] = useState<SkSVG | undefined>(getSkSvg(svg));
  const [width, setWidth] = useState<number>(props.width ?? 0);
  const [height, setHeight] = useState<number>(props.height ?? 0);
  const [zrenderId, setZrenderId] = useState(0);

  useImperativeHandle(ref, () => ({
    elm: {
      setAttribute: (name: string, value: any) => {
        if (name === 'width') {
          setWidth(value);
        }
        if (name === 'height') {
          setHeight(value);
        }
      },
      setAttributeNS: (_name: string, _value: any) => {},
      removeAttribute: (_name: string) => {},
      patchString: (_oldVnode: string, vnode: string) => {
        const _svgString = getSkSvg(vnode);
        setSvgString(_svgString);
      },
      setZrenderId: (id: number) => {
        setZrenderId(id);
      },
    },
    viewprot: {},
  }));

  return svgString ? (
    <View style={{ width, height }}>
      <Canvas style={{ width, height }} pointerEvents="auto">
        <ImageSVG svg={svgString} x={0} y={0} width={width} height={height} />
      </Canvas>
      <GestureHandler zrenderId={zrenderId} useRNGH={useRNGH} />
    </View>
  ) : null;
}
export default memo(forwardRef(SkiaComponent));
