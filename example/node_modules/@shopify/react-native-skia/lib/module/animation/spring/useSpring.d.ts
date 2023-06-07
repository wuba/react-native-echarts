import type { SkiaValue } from "../../values/types";
import type { SpringConfig, AnimationParams, AnimationCallback } from "../types";
/**
 * Creats a spring based animation value that will run whenever
 * the animation parameters change.
 * @param toOrParams
 * @param config
 * @returns
 */
export declare const useSpring: (toOrParams: number | AnimationParams, config?: SpringConfig, callback?: AnimationCallback) => SkiaValue<number>;
