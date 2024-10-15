import React, {
  ForwardedRef,
  useState,
  useImperativeHandle,
  forwardRef,
  memo,
  useCallback,
  useRef,
  ReactElement,
} from 'react';

import { Canvas, useCanvasRef } from '@shopify/react-native-skia';
import { View } from 'react-native';

import { GestureHandler } from '../components/GestureHandler';
import { dispatchEventsToZRender } from '../components/events';
import type { ChartElement, DispatchEvents, SkiaChartProps } from '../types';

export { SkiaRenderer } from './SkiaRenderer';
export * from '../types';

function SkiaComponent(
  props: SkiaChartProps,
  ref: ForwardedRef<(ChartElement & any) | null>
) {
  const {
    handleGesture = true,
    width: inlineWidth,
    height: inlineHeight,
    style,
    ...gestureProps
  } = props;
  const initialWidth = inlineWidth || (style?.width as number);
  const initialHeight = inlineHeight || (style?.height as number);
  const [children, setChildren] = useState<ReactElement[]>([]);
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
        patch: (elms: ReactElement[]) => {
          // console.log('patch', elms);
          setChildren(elms);
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

  return (
    <View testID="component" style={{ ...style, width, height }}>
      <Canvas
        style={{ ...style, width, height }}
        pointerEvents="auto"
        ref={canvasRef}
      >
        {children}
      </Canvas>
      {handleGesture ? (
        <GestureHandler dispatchEvents={dispatchEvents} {...gestureProps} />
      ) : null}
    </View>
  );
}

const SkiaChart = memo(forwardRef(SkiaComponent));
SkiaChart.displayName = 'SkiaChart';
export default SkiaChart;
