import type { SkiaClockValue } from "../types";
import { RNSkReadonlyValue } from "./RNSkReadonlyValue";
export declare class RNSkClockValue extends RNSkReadonlyValue<number> implements SkiaClockValue {
    constructor(raf: (callback: (time: number) => void) => number);
    private _raf;
    private _start;
    private _stop;
    private _state;
    private notifyUpdate;
    protected tick(value: number): void;
    start(): void;
    stop(): void;
}
