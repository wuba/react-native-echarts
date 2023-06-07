import { ValueOf } from '../typeUtils';
import { HammerGestures } from '../RNGestureHandlerModule.web';
export declare function getHandler(tag: number): import("./NativeViewGestureHandler").default | import("./PanGestureHandler").default | import("./TapGestureHandler").default | import("./LongPressGestureHandler").default | import("./PinchGestureHandler").default | import("./RotationGestureHandler").default | import("./FlingGestureHandler").default;
export declare function createGestureHandler(handlerTag: number, handler: InstanceType<ValueOf<typeof HammerGestures>>): void;
export declare function dropGestureHandler(handlerTag: number): void;
export declare function getNodes(): {
    [x: number]: import("./NativeViewGestureHandler").default | import("./PanGestureHandler").default | import("./TapGestureHandler").default | import("./LongPressGestureHandler").default | import("./PinchGestureHandler").default | import("./RotationGestureHandler").default | import("./FlingGestureHandler").default;
};
