import { State } from '../../State';
import { Config, AdaptedEvent, PointerType } from '../interfaces';
import EventManager from '../tools/EventManager';
import PointerTracker from '../tools/PointerTracker';
export default abstract class GestureHandler {
    private lastSentState;
    protected currentState: State;
    protected shouldCancellWhenOutside: boolean;
    protected hasCustomActivationCriteria: boolean;
    protected enabled: boolean;
    private ref;
    private propsRef;
    private handlerTag;
    protected config: Config;
    protected view: HTMLElement;
    protected eventManagers: EventManager[];
    protected tracker: PointerTracker;
    protected activationIndex: number;
    protected awaiting: boolean;
    protected active: boolean;
    protected shouldResetProgress: boolean;
    protected pointerType: PointerType;
    constructor();
    protected init(ref: number, propsRef: React.RefObject<unknown>): void;
    private setView;
    private addEventManager;
    protected onCancel(): void;
    protected onReset(): void;
    protected resetProgress(): void;
    reset(): void;
    moveToState(newState: State, sendIfDisabled?: boolean): void;
    protected onStateChange(_newState: State, _oldState: State): void;
    begin(): void;
    /**
     * @param {boolean} sendIfDisabled - Used when handler becomes disabled. With this flag orchestrator will be forced to send fail event
     */
    fail(sendIfDisabled?: boolean): void;
    /**
     * @param {boolean} sendIfDisabled - Used when handler becomes disabled. With this flag orchestrator will be forced to send cancel event
     */
    cancel(sendIfDisabled?: boolean): void;
    activate(_force?: boolean): void;
    end(): void;
    isAwaiting(): boolean;
    setAwaiting(value: boolean): void;
    isActive(): boolean;
    setActive(value: boolean): void;
    getShouldResetProgress(): boolean;
    setShouldResetProgress(value: boolean): void;
    getActivationIndex(): number;
    setActivationIndex(value: number): void;
    shouldWaitForHandlerFailure(handler: GestureHandler): boolean;
    shouldRequireToWaitForFailure(handler: GestureHandler): boolean;
    shouldRecognizeSimultaneously(handler: GestureHandler): boolean;
    shouldBeCancelledByOther(handler: GestureHandler): boolean;
    protected onPointerDown(event: AdaptedEvent): void;
    protected onPointerAdd(event: AdaptedEvent): void;
    protected onPointerUp(event: AdaptedEvent): void;
    protected onPointerRemove(event: AdaptedEvent): void;
    protected onPointerMove(event: AdaptedEvent): void;
    protected onPointerOut(event: AdaptedEvent): void;
    protected onPointerEnter(event: AdaptedEvent): void;
    protected onPointerCancel(event: AdaptedEvent): void;
    protected onPointerOutOfBounds(event: AdaptedEvent): void;
    private tryToSendMoveEvent;
    sendTouchEvent(event: AdaptedEvent): void;
    sendEvent: (newState: State, oldState: State) => void;
    private transformEventData;
    private transformTouchEvent;
    private cancelTouches;
    protected transformNativeEvent(): {};
    updateGestureConfig({ enabled, ...props }: Config): void;
    protected checkCustomActivationCriteria(criterias: string[]): void;
    private validateHitSlops;
    private checkHitSlop;
    isPointerInBounds({ x, y }: {
        x: number;
        y: number;
    }): boolean;
    protected resetConfig(): void;
    getTag(): number;
    setTag(tag: number): void;
    protected getConfig(): Config;
    getShouldEnableGestureOnSetup(): boolean;
    getView(): HTMLElement;
    getEventManagers(): EventManager[];
    getTracker(): PointerTracker;
    getTrackedPointersID(): number[];
    getState(): State;
    isEnabled(): boolean;
    private isFinished;
    protected setShouldCancelWhenOutside(shouldCancel: boolean): void;
    protected getShouldCancelWhenOutside(): boolean;
    getPointerType(): PointerType;
}
