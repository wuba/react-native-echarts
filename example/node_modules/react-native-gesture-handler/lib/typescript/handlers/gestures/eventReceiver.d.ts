import { GestureTouchEvent, GestureUpdateEvent, GestureStateChangeEvent } from '../gestureHandlerCommon';
export declare function onGestureHandlerEvent(event: GestureUpdateEvent | GestureStateChangeEvent | GestureTouchEvent): void;
export declare function startListening(): void;
export declare function stopListening(): void;
