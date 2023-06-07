import { UserSelect } from '../handlers/gestureHandlerCommon';
import { Directions } from '../Directions';
import { State } from '../State';
export interface HitSlop {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    horizontal?: number;
    vertical?: number;
    width?: number;
    height?: number;
}
export interface Handler {
    handlerTag: number;
}
declare type ConfigArgs = number | boolean | HitSlop | UserSelect | Directions | Handler[] | null | undefined;
export interface Config extends Record<string, ConfigArgs> {
    enabled?: boolean;
    simultaneousHandlers?: Handler[] | null;
    waitFor?: Handler[] | null;
    hitSlop?: HitSlop;
    shouldCancelWhenOutside?: boolean;
    userSelect?: UserSelect;
    activateAfterLongPress?: number;
    failOffsetXStart?: number;
    failOffsetYStart?: number;
    failOffsetXEnd?: number;
    failOffsetYEnd?: number;
    activeOffsetXStart?: number;
    activeOffsetXEnd?: number;
    activeOffsetYStart?: number;
    activeOffsetYEnd?: number;
    minPointers?: number;
    maxPointers?: number;
    minDist?: number;
    minDistSq?: number;
    minVelocity?: number;
    minVelocityX?: number;
    minVelocityY?: number;
    minVelocitySq?: number;
    maxDist?: number;
    maxDistSq?: number;
    numberOfPointers?: number;
    minDurationMs?: number;
    numberOfTaps?: number;
    maxDurationMs?: number;
    maxDelayMs?: number;
    maxDeltaX?: number;
    maxDeltaY?: number;
    shouldActivateOnStart?: boolean;
    disallowInterruption?: boolean;
    direction?: Directions;
}
declare type NativeEventArgs = number | State | boolean | undefined;
interface NativeEvent extends Record<string, NativeEventArgs> {
    numberOfPointers: number;
    state: State;
    pointerInside: boolean | undefined;
    handlerTag: number;
    target: number;
    oldState?: State;
}
export interface PointerData {
    id: number;
    x: number;
    y: number;
    absoluteX: number;
    absoluteY: number;
}
declare type TouchNativeArgs = number | State | TouchEventType | PointerData[];
interface NativeTouchEvent extends Record<string, TouchNativeArgs> {
    handlerTag: number;
    state: State;
    eventType: TouchEventType;
    changedTouches: PointerData[];
    allTouches: PointerData[];
    numberOfTouches: number;
}
export interface ResultEvent extends Record<string, NativeEvent | number> {
    nativeEvent: NativeEvent;
    timeStamp: number;
}
export interface ResultTouchEvent extends Record<string, NativeTouchEvent | number> {
    nativeEvent: NativeTouchEvent;
    timeStamp: number;
}
export interface PropsRef {
    onGestureHandlerEvent: () => void;
    onGestureHandlerStateChange: () => void;
}
export interface AdaptedEvent {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    pointerId: number;
    eventType: EventTypes;
    pointerType: PointerType;
    buttons: number;
    time: number;
    allTouches?: TouchList;
    changedTouches?: TouchList;
    touchEventType?: TouchEventType;
}
export declare enum MouseButtons {
    NONE = 0,
    LEFT = 1,
    RIGHT = 2,
    LEFT_RIGHT = 3,
    SCROLL = 4,
    SCROLL_LEFT = 5,
    SCROLL_RIGHT = 6,
    SCROLL_LEFT_RIGHT = 7
}
export declare enum EventTypes {
    DOWN = 0,
    ADDITIONAL_POINTER_DOWN = 1,
    UP = 2,
    ADDITIONAL_POINTER_UP = 3,
    MOVE = 4,
    ENTER = 5,
    OUT = 6,
    CANCEL = 7
}
export declare enum TouchEventType {
    UNDETERMINED = 0,
    DOWN = 1,
    MOVE = 2,
    UP = 3,
    CANCELLED = 4
}
export declare enum PointerType {
    NONE = "none",
    MOUSE = "mouse",
    TOUCH = "touch",
    PEN = "pen"
}
export {};
