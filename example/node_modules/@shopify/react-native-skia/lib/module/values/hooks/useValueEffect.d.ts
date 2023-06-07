import type { SkiaValue } from "../types";
/**
 * Sets up an effect that will be run whenever the value changes
 * @param value Value to subscribe to changes on
 * @param cb Callback to run when value changes
 */
export declare const useValueEffect: <T>(value: SkiaValue<T>, cb: (v: T) => void) => void;
