import type { AnimationState } from "../../../values/types";
/**
 * Calculates and returns a timing value based on the
 * input parameters. The timing value is a number between
 * 0 and 1.
 * @param t
 * @param duration
 * @param easing
 * @param loop
 * @param yoyo
 * @param onStop
 * @returns
 */
export declare const timing: (t: number, duration: number, easing: (t: number) => number, loop: boolean, yoyo: boolean, state: AnimationState) => {
    current: number;
    finished: boolean;
};
