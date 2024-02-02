import React, {
  ForwardedRef,
  useState,
  useImperativeHandle,
  forwardRef,
  memo,
  useCallback,
  useRef,
} from 'react';

import {
  Canvas,
  ImageSVG,
  Skia,
  SkSVG,
  useCanvasRef,
} from '@shopify/react-native-skia';

import { View } from 'react-native';

import {
  setPlatformAPI,
  // DEFAULT_FONT_FAMILY as zrenderFontFamily,
} from 'zrender/lib/core/platform';
// import { DEFAULT_FONT_FAMILY } from './utils/font';
import { measureText } from './utils/platform';
import { GestureHandler } from './components/GestureHandler';
import { dispatchEventsToZRender } from './components/events';
import type { ChartElement, DispatchEvents, SkiaChartProps } from './types';

export { SVGRenderer } from './SVGRenderer';
export * from './types';

setPlatformAPI({ measureText });

function getSkSvg(svg?: string): SkSVG | undefined {
  // TODO: 全局替换字体做法比较暴力，或者实用定义字体，可能某些场景字体设置失效，需要修复
  // if (svg) {
  //   svg = svg.replace(new RegExp(zrenderFontFamily, 'g'), DEFAULT_FONT_FAMILY)
  //   console.log('svg', svg)
  // }
  const initString = svg ? Skia.SVG.MakeFromString(svg) : undefined;
  return initString ?? undefined;
}

function SkiaComponent(
  props: SkiaChartProps,
  ref: ForwardedRef<(ChartElement & any) | null>
) {
  const {
    svg,
    handleGesture = true,
    width: inlineWidth,
    height: inlineHeight,
    style,
    ...gestureProps
  } = props;
  const initialWidth = inlineWidth || (style?.width as number);
  const initialHeight = inlineHeight || (style?.height as number);
  const [svgString, setSvgString] = useState<SkSVG | undefined>(getSkSvg(svg));
  const [width, setWidth] = useState<number>(initialWidth ?? 0);
  const [height, setHeight] = useState<number>(initialHeight ?? 0);
  const zrenderId = useRef<number>();
  const canvasRef = useCanvasRef?.();

  const dispatchEvents = useCallback<DispatchEvents>(
    (types, nativeEvent, eventArgs) => {
      if (zrenderId.current === undefined) return;

      dispatchEventsToZRender(zrenderId.current, types, nativeEvent, eventArgs);
    },
    []
  );

  useImperativeHandle(
    ref,
    () => ({
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
          zrenderId.current = id;
        },
        makeImageSnapshot: () => {
          const image = canvasRef?.current?.makeImageSnapshot();
          return image
            ? `data:image/png;base64,${image.encodeToBase64()}`
            : null;
        },
      },
      viewprot: {},
      dispatchEvents,
      getChartSize: () => {
        return {
          width: initialWidth,
          height: initialHeight,
        };
      },
    }),
    [dispatchEvents, initialWidth, initialHeight, canvasRef]
  );

  return svgString ? (
    <View testID="component" style={{ ...style, width, height }}>
      <Canvas
        style={{ ...style, width, height }}
        pointerEvents="auto"
        ref={canvasRef}
      >
        <ImageSVG svg={svgString} x={0} y={0} width={width} height={height} />
      </Canvas>
      {handleGesture ? (
        <GestureHandler dispatchEvents={dispatchEvents} {...gestureProps} />
      ) : null}
    </View>
  ) : null;
}

const SkiaChart = memo(forwardRef(SkiaComponent));
SkiaChart.displayName = 'SkiaChart';
export default SkiaChart;
