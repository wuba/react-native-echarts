import type {
  ComposedGesture,
  GestureType,
  PanGesture,
  PinchGesture,
  TapGesture,
} from 'react-native-gesture-handler';

export type HandlerName =
  | 'click'
  | 'dblclick'
  | 'mousewheel'
  | 'mouseout'
  | 'mouseup'
  | 'mousedown'
  | 'mousemove'
  | 'contextmenu';

export type DispatchEvents = (
  types: HandlerName[],
  nativeEvent: any,
  eventArgs?: any
) => void;

export type DefaultRNGestures = [PanGesture, PinchGesture, TapGesture];

export type RNGestureHandlerGestureValue =
  | ComposedGesture
  | GestureType
  | GestureType[];
export type RNGestureHandlerGestureFactory = (
  defaultGestures: DefaultRNGestures,
  dispatchEvents: DispatchEvents
) => ComposedGesture | GestureType | GestureType[];
export type RNGestureHandlerGesture =
  | RNGestureHandlerGestureValue
  | RNGestureHandlerGestureFactory;

export type GestureBuiltinProps = {
  useRNGH?: false;
  gesture?: never;
};

export type GestureRNGHProps = {
  useRNGH: true;
  gesture?: RNGestureHandlerGesture;
};

export type GestureProps = GestureBuiltinProps | GestureRNGHProps;

type BaseChartProps = {
  handleGesture?: boolean;
};

export type CommonChartProps = BaseChartProps & GestureProps;

export type SkiaChartProps = CommonChartProps & {
  svg?: string;
  width?: number;
  height?: number;
};

export type SVGVNodeAttrs = Record<
  string,
  string | number | undefined | boolean
>;

export interface SVGVNode {
  tag: string;
  attrs: SVGVNodeAttrs;
  children?: SVGVNode[];
  text?: string;

  // For patching
  elm?: Node;
  key?: string;
}

export type SVGChartProps = CommonChartProps & {
  node?: SVGVNode;
};

export type ChartElement = {
  dispatchEvents: DispatchEvents;
};
