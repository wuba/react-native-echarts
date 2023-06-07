import * as React from 'react';
import { GestureResponderEvent } from 'react-native';
import { NumberArray, NumberProp } from './lib/extract/types';
declare type BlurEvent = Object;
declare type FocusEvent = Object;
declare type PressEvent = Object;
declare type LayoutEvent = Object;
declare type EdgeInsetsProp = Object;
interface BaseProps {
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityIgnoresInvertColors?: boolean;
    accessibilityRole?: string;
    accessibilityState?: Object;
    delayLongPress?: number;
    delayPressIn?: number;
    delayPressOut?: number;
    disabled?: boolean;
    hitSlop?: EdgeInsetsProp;
    nativeID?: string;
    touchSoundDisabled?: boolean;
    onBlur?: (e: BlurEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onLayout?: (event: LayoutEvent) => object;
    onLongPress?: (event: PressEvent) => object;
    onClick?: (event: PressEvent) => object;
    onPress?: (event: PressEvent) => object;
    onPressIn?: (event: PressEvent) => object;
    onPressOut?: (event: PressEvent) => object;
    pressRetentionOffset?: EdgeInsetsProp;
    rejectResponderTermination?: boolean;
    translate: NumberArray;
    translateX: NumberProp;
    translateY: NumberProp;
    scale: NumberArray;
    rotation: NumberArray;
    skewX: NumberProp;
    skewY: NumberProp;
    originX: NumberProp;
    originY: NumberProp;
    fontStyle?: string;
    fontWeight?: NumberProp;
    fontSize?: NumberProp;
    fontFamily?: string;
    forwardedRef: {};
    style: Iterable<{}>;
}
export declare class WebShape<P extends BaseProps = BaseProps, C = {}> extends React.Component<P, C> {
    [x: string]: unknown;
    _remeasureMetricsOnActivation: () => void;
    touchableHandleStartShouldSetResponder?: (e: GestureResponderEvent) => boolean;
    touchableHandleResponderMove?: (e: GestureResponderEvent) => void;
    touchableHandleResponderGrant?: (e: GestureResponderEvent) => void;
    touchableHandleResponderRelease?: (e: GestureResponderEvent) => void;
    touchableHandleResponderTerminate?: (e: GestureResponderEvent) => void;
    touchableHandleResponderTerminationRequest?: (e: GestureResponderEvent) => boolean;
    constructor(props: P, context: C);
}
export declare class Circle extends WebShape {
    render(): JSX.Element;
}
export declare class ClipPath extends WebShape {
    render(): JSX.Element;
}
export declare class Defs extends WebShape {
    render(): JSX.Element;
}
export declare class Ellipse extends WebShape {
    render(): JSX.Element;
}
export declare class G extends WebShape<BaseProps & {
    x?: NumberProp;
    y?: NumberProp;
    translate?: string;
}> {
    render(): JSX.Element;
}
export declare class Image extends WebShape {
    render(): JSX.Element;
}
export declare class Line extends WebShape {
    render(): JSX.Element;
}
export declare class LinearGradient extends WebShape {
    render(): JSX.Element;
}
export declare class Path extends WebShape {
    render(): JSX.Element;
}
export declare class Polygon extends WebShape {
    render(): JSX.Element;
}
export declare class Polyline extends WebShape {
    render(): JSX.Element;
}
export declare class RadialGradient extends WebShape {
    render(): JSX.Element;
}
export declare class Rect extends WebShape {
    render(): JSX.Element;
}
export declare class Stop extends WebShape {
    render(): JSX.Element;
}
export declare class Svg extends WebShape {
    render(): JSX.Element;
}
export declare class Symbol extends WebShape {
    render(): JSX.Element;
}
export declare class Text extends WebShape {
    render(): JSX.Element;
}
export declare class TSpan extends WebShape {
    render(): JSX.Element;
}
export declare class TextPath extends WebShape {
    render(): JSX.Element;
}
export declare class Use extends WebShape {
    render(): JSX.Element;
}
export declare class Mask extends WebShape {
    render(): JSX.Element;
}
export declare class ForeignObject extends WebShape {
    render(): JSX.Element;
}
export declare class Marker extends WebShape {
    render(): JSX.Element;
}
export declare class Pattern extends WebShape {
    render(): JSX.Element;
}
export default Svg;
