import { AdaptedEvent } from '../interfaces';
export interface TrackerElement {
    lastX: number;
    lastY: number;
    timeStamp: number;
    velocityX: number;
    velocityY: number;
}
export default class PointerTracker {
    private trackedPointers;
    private touchEventsIds;
    private lastMovedPointerId;
    private cachedAverages;
    constructor();
    addToTracker(event: AdaptedEvent): void;
    removeFromTracker(pointerId: number): void;
    track(event: AdaptedEvent): void;
    private mapTouchEventId;
    private removeMappedTouchId;
    getMappedTouchEventId(touchEventId: number): number;
    getVelocityX(pointerId: number): number;
    getVelocityY(pointerId: number): number;
    /**
     * Returns X coordinate of last moved pointer
     */
    getLastX(): number;
    /**
     *
     * @param pointerId
     * Returns X coordinate of given pointer
     */
    getLastX(pointerId: number): number;
    /**
     * Returns Y coordinate of last moved pointer
     */
    getLastY(): number;
    /**
     *
     * @param pointerId
     * Returns Y coordinate of given pointer
     */
    getLastY(pointerId: number): number;
    getLastAvgX(): number;
    getLastAvgY(): number;
    getSumX(ignoredPointer?: number): number;
    getSumY(ignoredPointer?: number): number;
    getTrackedPointersCount(): number;
    getTrackedPointersID(): number[];
    getData(): Map<number, TrackerElement>;
    resetTracker(): void;
    static shareCommonPointers(stPointers: number[], ndPointers: number[]): boolean;
}
