import type { DependencyList } from "react";
import type { TouchHandlers, TouchHandler } from "./types";
/**
 * Provides a callback for handling touch events in the Skia View.
 * This touch handler only handles single touches.
 * @param handlers Callbacks for the different touch states
 * @param deps optional Dependency array to update the handlers
 * @returns A function that can be used from within the onDraw callback to
 * update and handle touch events. Call it with the touches property from
 * the info object.
 */
export declare const useTouchHandler: (handlers: TouchHandlers, deps?: DependencyList) => TouchHandler;
/**
 * Provides a callback for handling touch events in the Skia View.
 * This touch handler handles multiple touches.
 * @param handlers Callbacks for the different touch states
 * @param deps optional Dependency array to update the handlers
 * @returns A function that can be used from within the onDraw callback to
 * update and handle touch events. Call it with the touches property from
 * the info object.
 */
export declare const useMultiTouchHandler: (handlers: TouchHandlers, deps?: DependencyList) => TouchHandler;
