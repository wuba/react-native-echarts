import {
  useState,
  useImperativeHandle,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import type { ForwardedRef, ReactElement } from 'react';

import {
  Canvas,
  Group,
  drawAsImage,
  useCanvasRef,
} from '@shopify/react-native-skia';
import { View } from 'react-native';

import { GestureHandler } from '../components/GestureHandler';
import { dispatchEventsToZRender } from '../components/events';
import type { ChartElement, DispatchEvents, SkiaChartProps } from '../types';

export { SkiaRenderer } from './SkiaRenderer';
export * from '../types';

type RenderState = {
  children: ReactElement[];
  width: number;
  height: number;
};

function encodeSnapshot(
  image: { encodeToBase64: () => string } | null | undefined
) {
  return image ? `data:image/png;base64,${image.encodeToBase64()}` : null;
}

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
  const [renderState, setRenderState] = useState<RenderState>({
    children: [],
    width: initialWidth ?? 0,
    height: initialHeight ?? 0,
  });
  const childrenRef = useRef<ReactElement[]>([]);
  const widthRef = useRef<number>(initialWidth ?? 0);
  const heightRef = useRef<number>(initialHeight ?? 0);
  const zrenderId = useRef<number | undefined>(undefined);
  const canvasRef = useCanvasRef?.();

  const dispatchEvents = useCallback<DispatchEvents>(
    (types, nativeEvent, eventArgs) => {
      if (zrenderId.current === undefined) return;

      dispatchEventsToZRender(zrenderId.current, types, nativeEvent, eventArgs);
    },
    []
  );

  const updateRenderState = useCallback((patch: Partial<RenderState>) => {
    setRenderState((prevState) => {
      const nextState = {
        ...prevState,
        ...patch,
      };

      if (
        prevState.width === nextState.width &&
        prevState.height === nextState.height &&
        prevState.children === nextState.children
      ) {
        return prevState;
      }

      return nextState;
    });
  }, []);

  const surfaceStyle = useMemo(
    () => ({
      ...style,
      width: renderState.width,
      height: renderState.height,
    }),
    [renderState.height, renderState.width, style]
  );

  useImperativeHandle(
    ref,
    () => ({
      elm: {
        setAttribute: (name: string, value: any) => {
          if (name === 'width' && widthRef.current !== value) {
            widthRef.current = value;
            updateRenderState({ width: value });
          }
          if (name === 'height' && heightRef.current !== value) {
            heightRef.current = value;
            updateRenderState({ height: value });
          }
        },
        setAttributeNS: (_name: string, _value: any) => {},
        removeAttribute: (_name: string) => {},
        patch: (elms: ReactElement[]) => {
          if (childrenRef.current === elms) return;
          childrenRef.current = elms;
          updateRenderState({ children: elms });
        },
        setZrenderId: (id: number) => {
          zrenderId.current = id;
        },
        makeImageSnapshot: () => {
          return encodeSnapshot(canvasRef?.current?.makeImageSnapshot?.());
        },
        makeImageSnapshotAsync: async () => {
          const canvasImage =
            await canvasRef?.current?.makeImageSnapshotAsync?.();
          if (canvasImage) {
            return encodeSnapshot(canvasImage);
          }

          if (
            !widthRef.current ||
            !heightRef.current ||
            childrenRef.current.length === 0
          ) {
            return null;
          }

          const image = await drawAsImage(
            <Group>{childrenRef.current}</Group>,
            {
              width: widthRef.current,
              height: heightRef.current,
            }
          );

          return encodeSnapshot(image);
        },
      },
      viewprot: {},
      dispatchEvents,
      getChartSize: () => {
        return {
          width: widthRef.current,
          height: heightRef.current,
        };
      },
    }),
    [dispatchEvents, canvasRef, updateRenderState]
  );

  return (
    <View testID="component" style={surfaceStyle}>
      <Canvas style={surfaceStyle} pointerEvents="auto" ref={canvasRef}>
        {renderState.children}
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
