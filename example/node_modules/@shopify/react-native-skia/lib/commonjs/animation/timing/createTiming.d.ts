import type { TimingConfig, RequiredAnimationParams, AnimationCallback } from "../types";
import type { SkiaMutableValue } from "../../values/types";
/**
 * Creates an animation that is driven by a clock value.
 * The value will be run from / to the value in params and modified
 * by the provided easing curve for the length of the duration. When
 * the value has reached its desired "to" value the animation
 * will be stopped. If loop is set to true, the animation will continue
 * to run until stopped.
 *
 * @param params Animation parameters
 * @param config Spring or timing configuration
 * @param value Optional value that the animation will update
 * @params an animation value that can be used to start/stop
 * the animation.
 */
export declare const createTiming: (params: RequiredAnimationParams & Required<TimingConfig>, value?: SkiaMutableValue<number>, callback?: AnimationCallback) => import("../../values/types").SkiaAnimation;
