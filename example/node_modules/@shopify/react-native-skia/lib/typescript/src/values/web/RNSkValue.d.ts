import type { SkiaAnimation, SkiaValue } from "../types";
import { RNSkReadonlyValue } from "./RNSkReadonlyValue";
export declare class RNSkValue<T> extends RNSkReadonlyValue<T> implements SkiaValue<T> {
    constructor(value: T);
    set current(value: T);
    get current(): T;
    private _unsubscribe;
    private unsubscribe;
    private subscribe;
    private animationDidUpdate;
    private _animation;
    get animation(): SkiaAnimation | undefined;
    set animation(v: SkiaAnimation | undefined);
}
