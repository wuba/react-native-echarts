import type { TimingConfig } from "../types";
/**
 * Configures a looped timing value. The value will go back and forth
 * between 0 and 1 and back.
 * @param config Timing configuration for easing and duration
 * @returns A value that can be used for further animations
 */
export declare const useLoop: (config?: TimingConfig) => import("../..").SkiaValue<number>;
