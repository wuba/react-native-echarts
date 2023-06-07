import type { SkiaMutableValue } from "../../values/types";
import type { DecayConfig } from "./types";
/**
 * Runs a decay animation from the current value to zero with the given decay
 * configuration.
 * @param value value to animate
 * @param config Configuration or default configuration
 * @returns Animation
 */
export declare const runDecay: (value: SkiaMutableValue<number>, config?: DecayConfig) => import("../../values/types").SkiaAnimation;
