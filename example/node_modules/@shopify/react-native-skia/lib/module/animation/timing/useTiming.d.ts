import type { SkiaValue } from "../../values/types";
import type { AnimationParams, TimingConfig, AnimationCallback } from "../types";
/**
 * Creats an animation value that will run whenever
 * the animation parameters change. The animation start immediately.
 * @param toOrParams
 * @param config
 * @returns A value that is animated
 */
export declare const useTiming: (toOrParams: number | AnimationParams, config?: TimingConfig, callback?: AnimationCallback) => SkiaValue<number>;
