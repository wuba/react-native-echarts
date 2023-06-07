export declare const ValueApi: import("./types").ISkiaValueApi;
export declare const createValue: <T>(initialValue: T) => import("./types").SkiaMutableValue<T>, createComputedValue: <R>(cb: () => R, values: import("./types").SkiaValue<unknown>[]) => import("./types").SkiaValue<R>;
