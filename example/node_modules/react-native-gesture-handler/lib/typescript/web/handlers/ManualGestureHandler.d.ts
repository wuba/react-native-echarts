import { AdaptedEvent, Config } from '../interfaces';
import GestureHandler from './GestureHandler';
export default class ManualGestureHandler extends GestureHandler {
    init(ref: number, propsRef: React.RefObject<unknown>): void;
    updateGestureConfig({ enabled, ...props }: Config): void;
    protected onPointerDown(event: AdaptedEvent): void;
    protected onPointerAdd(event: AdaptedEvent): void;
    protected onPointerMove(event: AdaptedEvent): void;
    protected onPointerOutOfBounds(event: AdaptedEvent): void;
    protected onPointerUp(event: AdaptedEvent): void;
    protected onPointerRemove(event: AdaptedEvent): void;
    protected onPointerCancel(event: AdaptedEvent): void;
}
