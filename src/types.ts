import type { GestureType } from 'react-native-gesture-handler';

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
  props?: any
) => void;

type RNGestureHandlerGestureValue = GestureType | GestureType[];
type RNGestureHandlerGestureFactory = (
  defaultGestures: GestureType[],
  dispatchEvents: DispatchEvents
) => GestureType | GestureType[];
export type RNGestureHandlerGesture =
  | RNGestureHandlerGestureValue
  | RNGestureHandlerGestureFactory;

export type GestureBuiltinProps = {
  useRNGH?: false;
  gesture?: never;
};

export type GestureRNGHProps = {
  useRNGH?: true;
  gesture?: RNGestureHandlerGesture;
};

export type GestureProps = GestureBuiltinProps | GestureRNGHProps;

type BaseChartProps = {
  handleGesture?: boolean;
};

export type CommonChartProps = BaseChartProps & GestureProps;

export type ChartElement = {
  dispatchEvents: DispatchEvents;
};
