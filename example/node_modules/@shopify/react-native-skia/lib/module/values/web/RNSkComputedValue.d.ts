import type { DependencyList } from "react";
import { RNSkReadonlyValue } from "./RNSkReadonlyValue";
export declare class RNSkComputedValue<T> extends RNSkReadonlyValue<T> {
    constructor(callback: () => T, dependencies: DependencyList);
    private dependecyUpdated;
    private _callback;
    private _unsubscribers;
    unsubscribe(): void;
    __invalidate(): void;
}
