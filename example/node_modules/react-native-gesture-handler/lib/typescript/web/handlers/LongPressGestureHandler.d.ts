import { State } from '../../State';
import { AdaptedEvent, Config } from '../interfaces';
import GestureHandler from './GestureHandler';
export default class LongPressGestureHandler extends GestureHandler {
    private minDurationMs;
    private defaultMaxDistSq;
    private maxDistSq;
    private startX;
    private startY;
    private startTime;
    private previousTime;
    private activationTimeout;
    init(ref: number, propsRef: React.RefObject<unknown>): void;
    protected transformNativeEvent(): {
        x: number;
        y: number;
        absoluteX: number;
        absoluteY: number;
        duration: number;
    };
    updateGestureConfig({ enabled, ...props }: Config): void;
    protected resetConfig(): void;
    protected onStateChange(_newState: State, _oldState: State): void;
    protected onPointerDown(event: AdaptedEvent): void;
    protected onPointerMove(event: AdaptedEvent): void;
    protected onPointerUp(event: AdaptedEvent): void;
    private tryBegin;
    private tryActivate;
    private checkDistanceFail;
}
