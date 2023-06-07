import type { DependencyList } from "react";
import type { RNSkiaDrawCallback } from "./types";
/**
 * Creates a memoized callback for the onDraw handler of a Skia component.
 * @param callback The callback to memoize.
 * @param deps Dependencies for the callback.
 * */
export declare const useDrawCallback: (callback: RNSkiaDrawCallback, deps?: DependencyList) => RNSkiaDrawCallback;
