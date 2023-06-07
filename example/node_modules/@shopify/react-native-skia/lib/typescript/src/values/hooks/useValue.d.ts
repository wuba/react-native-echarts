import type { SkiaMutableValue } from "../types";
/**
 * Creates a new value that holds some data.
 * @param v Value to hold
 * @returns A Value of type of v
 */
export declare const useValue: <T>(v: T) => SkiaMutableValue<T>;
