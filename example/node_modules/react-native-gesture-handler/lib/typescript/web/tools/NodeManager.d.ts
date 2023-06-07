import { ValueOf } from '../../typeUtils';
import { Gestures } from '../../RNGestureHandlerModule.web';
export default abstract class NodeManager {
    private static gestures;
    static getHandler(tag: number): import("../handlers/NativeViewGestureHandler").default | import("../handlers/PanGestureHandler").default | import("../handlers/TapGestureHandler").default | import("../handlers/LongPressGestureHandler").default | import("../handlers/PinchGestureHandler").default | import("../handlers/RotationGestureHandler").default | import("../handlers/FlingGestureHandler").default | import("../handlers/ManualGestureHandler").default;
    static createGestureHandler(handlerTag: number, handler: InstanceType<ValueOf<typeof Gestures>>): void;
    static dropGestureHandler(handlerTag: number): void;
    static getNodes(): {
        [x: number]: import("../handlers/NativeViewGestureHandler").default | import("../handlers/PanGestureHandler").default | import("../handlers/TapGestureHandler").default | import("../handlers/LongPressGestureHandler").default | import("../handlers/PinchGestureHandler").default | import("../handlers/RotationGestureHandler").default | import("../handlers/FlingGestureHandler").default | import("../handlers/ManualGestureHandler").default;
    };
}
