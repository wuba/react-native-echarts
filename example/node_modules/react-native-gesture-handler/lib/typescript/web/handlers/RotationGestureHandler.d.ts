import { AdaptedEvent, Config } from '../interfaces';
import GestureHandler from './GestureHandler';
export default class RotationGestureHandler extends GestureHandler {
    private rotation;
    private velocity;
    private cachedAnchorX;
    private cachedAnchorY;
    private rotationGestureListener;
    private rotationGestureDetector;
    init(ref: number, propsRef: React.RefObject<unknown>): void;
    updateGestureConfig({ enabled, ...props }: Config): void;
    protected transformNativeEvent(): {
        rotation: number;
        anchorX: number;
        anchorY: number;
        velocity: number;
    };
    getAnchorX(): number;
    getAnchorY(): number;
    protected onPointerDown(event: AdaptedEvent): void;
    protected onPointerAdd(event: AdaptedEvent): void;
    protected onPointerMove(event: AdaptedEvent): void;
    protected onPointerOutOfBounds(event: AdaptedEvent): void;
    protected onPointerUp(event: AdaptedEvent): void;
    protected onPointerRemove(event: AdaptedEvent): void;
    protected onPointerCancel(event: AdaptedEvent): void;
    protected tryBegin(): void;
    activate(_force?: boolean): void;
    protected onReset(): void;
}
