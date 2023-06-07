import { HammerInputExt } from './GestureHandler';
import PressGestureHandler from './PressGestureHandler';
declare class NativeViewGestureHandler extends PressGestureHandler {
    get isNative(): boolean;
    onRawEvent(ev: HammerInputExt): void;
}
export default NativeViewGestureHandler;
