import { AdaptedEvent } from '../interfaces';
import PointerTracker from '../tools/PointerTracker';
export interface ScaleGestureListener {
    onScaleBegin: (detector: ScaleGestureDetector) => boolean;
    onScale: (detector: ScaleGestureDetector) => boolean;
    onScaleEnd: (detector: ScaleGestureDetector) => void;
}
export default class ScaleGestureDetector implements ScaleGestureListener {
    onScaleBegin: (detector: ScaleGestureDetector) => boolean;
    onScale: (detector: ScaleGestureDetector) => boolean;
    onScaleEnd: (detector: ScaleGestureDetector) => void;
    private focusX;
    private focusY;
    private currentSpan;
    private prevSpan;
    private initialSpan;
    private currentTime;
    private prevTime;
    private inProgress;
    private spanSlop;
    private minSpan;
    constructor(callbacks: ScaleGestureListener);
    onTouchEvent(event: AdaptedEvent, tracker: PointerTracker): boolean;
    getCurrentSpan(): number;
    getFocusX(): number;
    getFocusY(): number;
    getTimeDelta(): number;
    getScaleFactor(numOfPointers: number): number;
}
