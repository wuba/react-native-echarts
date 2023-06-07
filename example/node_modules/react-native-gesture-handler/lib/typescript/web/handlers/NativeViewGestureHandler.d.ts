import { AdaptedEvent, Config } from '../interfaces';
import GestureHandler from './GestureHandler';
export default class NativeViewGestureHandler extends GestureHandler {
    private buttonRole;
    private shouldActivateOnStart;
    private disallowInterruption;
    private startX;
    private startY;
    private minDistSq;
    init(ref: number, propsRef: React.RefObject<unknown>): void;
    updateGestureConfig({ enabled, ...props }: Config): void;
    protected resetConfig(): void;
    protected onPointerDown(event: AdaptedEvent): void;
    protected onPointerAdd(event: AdaptedEvent): void;
    private newPointerAction;
    protected onPointerMove(event: AdaptedEvent): void;
    protected onPointerOut(): void;
    protected onPointerUp(event: AdaptedEvent): void;
    protected onPointerRemove(event: AdaptedEvent): void;
    private onUp;
    protected onPointerCancel(event: AdaptedEvent): void;
    shouldRecognizeSimultaneously(handler: GestureHandler): boolean;
    shouldBeCancelledByOther(_handler: GestureHandler): boolean;
    disallowsInterruption(): boolean;
}
