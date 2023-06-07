import type { SkiaValue } from "../types";
export declare class RNSkReadonlyValue<T> implements SkiaValue<T> {
    constructor(value: T);
    private _current;
    private _listeners;
    private notifyListeners;
    protected update(nextValue: T): void;
    readonly __typename__ = "RNSkValue";
    get current(): T;
    addListener(cb: (value: T) => void): () => void;
    __invalidate(): void;
}
