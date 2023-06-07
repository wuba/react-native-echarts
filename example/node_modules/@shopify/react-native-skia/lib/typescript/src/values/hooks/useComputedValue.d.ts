/**
 * Creates a new computed value - a value that will calculate its value depending
 * on other values.
 * @param cb Callback to calculate new value
 * @param values Dependant values
 * @returns A readonly value
 */
export declare const useComputedValue: <R>(cb: () => R, values: unknown[]) => import("..").SkiaValue<R>;
