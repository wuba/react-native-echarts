import type { Color } from "../../skia";
export declare const interpolateColors: (value: number, inputRange: number[], _outputRange: Color[]) => Float32Array;
export declare const mixColors: (value: number, x: Color, y: Color) => Float32Array;
