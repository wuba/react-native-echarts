import { AdaptedEvent } from '../interfaces';
import PointerTracker from '../tools/PointerTracker';
export interface RotationGestureListener {
    onRotationBegin: (detector: RotationGestureDetector) => boolean;
    onRotation: (detector: RotationGestureDetector) => boolean;
    onRotationEnd: (detector: RotationGestureDetector) => void;
}
export default class RotationGestureDetector implements RotationGestureListener {
    onRotationBegin: (detector: RotationGestureDetector) => boolean;
    onRotation: (detector: RotationGestureDetector) => boolean;
    onRotationEnd: (detector: RotationGestureDetector) => void;
    private currentTime;
    private previousTime;
    private previousAngle;
    private rotation;
    private anchorX;
    private anchorY;
    private isInProgress;
    private keyPointers;
    constructor(callbacks: RotationGestureListener);
    private updateCurrent;
    private finish;
    private setKeyPointers;
    onTouchEvent(event: AdaptedEvent, tracker: PointerTracker): boolean;
    getTimeDelta(): number;
    getAnchorX(): number;
    getAnchorY(): number;
    getRotation(): number;
    reset(): void;
}
