import type { AnimationState, SkiaAnimation } from "../types";
import { RNSkClockValue } from "./RNSkClockValue";
export declare class RNSkAnimation<S extends AnimationState = AnimationState> extends RNSkClockValue implements SkiaAnimation {
    constructor(callback: (t: number, state: S | undefined) => S, raf: (callback: (time: number) => void) => number);
    private _callback;
    private _animationState;
    cancel(): void;
    protected update(nextValue: number): void;
}
