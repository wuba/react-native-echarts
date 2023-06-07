import { useTiming } from "../timing";
import { Spring } from "./Spring";
import { createSpringEasing } from "./functions/spring";
/**
 * Creats a spring based animation value that will run whenever
 * the animation parameters change.
 * @param toOrParams
 * @param config
 * @returns
 */

export const useSpring = (toOrParams, config, callback) => useTiming(toOrParams, createSpringEasing(config !== null && config !== void 0 ? config : Spring.Config.Default), callback);
//# sourceMappingURL=useSpring.js.map