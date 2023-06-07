import type { SpringConfig } from "./types";
export declare const Spring: {
    Config: {
        Gentle: {
            mass: number;
            stiffness: number;
            damping: number;
            velocity: number;
        };
        Wobbly: {
            mass: number;
            stiffness: number;
            damping: number;
            velocity: number;
        };
        WobblySlow: {
            mass: number;
            stiffness: number;
            damping: number;
            velocity: number;
        };
        Stiff: {
            mass: number;
            stiffness: number;
            damping: number;
            velocity: number;
        };
        Default: {
            mass: number;
            stiffness: number;
            damping: number;
            velocity: number;
        };
    };
    Gentle: (config?: SpringConfig) => {
        mass: number;
        stiffness: number;
        velocity: number;
        damping: number;
    };
    Wobbly: (config?: SpringConfig) => {
        mass: number;
        stiffness: number;
        velocity: number;
        damping: number;
    };
    WobblySlow: (config?: SpringConfig) => {
        mass: number;
        stiffness: number;
        velocity: number;
        damping: number;
    };
    Stiff: (config?: SpringConfig) => {
        mass: number;
        stiffness: number;
        velocity: number;
        damping: number;
    };
    Default: (config?: SpringConfig) => {
        mass: number;
        stiffness: number;
        velocity: number;
        damping: number;
    };
};
