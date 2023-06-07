import { AdaptedEvent, Config } from '../interfaces';
import GestureHandler from './GestureHandler';
export default class PinchGestureHandler extends GestureHandler {
    private scale;
    private velocity;
    private startingSpan;
    private spanSlop;
    private scaleDetectorListener;
    private scaleGestureDetector;
    init(ref: number, propsRef: React.RefObject<unknown>): void;
    updateGestureConfig({ enabled, ...props }: Config): void;
    protected transformNativeEvent(): {
        focalX: number;
        focalY: number;
        velocity: number;
        scale: number;
    };
    protected onPointerDown(event: AdaptedEvent): void;
    protected onPointerAdd(event: AdaptedEvent): void;
    protected onPointerUp(event: AdaptedEvent): void;
    protected onPointerRemove(event: AdaptedEvent): void;
    protected onPointerMove(event: AdaptedEvent): void;
    protected onPointerOutOfBounds(event: AdaptedEvent): void;
    protected onPointerCancel(event: AdaptedEvent): void;
    private tryBegin;
    activate(force?: boolean): void;
    protected onReset(): void;
    protected resetProgress(): void;
}
