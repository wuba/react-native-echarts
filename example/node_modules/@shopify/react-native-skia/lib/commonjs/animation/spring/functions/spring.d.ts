import type { SpringConfig } from "../types";
import type { TimingConfig } from "../../types";
/**
 * @description Returns a cached jsContext function for a spring with duration
 * @param mass The mass of the spring
 * @param stiffness The stiffness of the spring
 * @param damping Spring damping
 * @param velocity The initial velocity
 */
export declare const createSpringEasing: (params: Partial<SpringConfig>) => TimingConfig;
