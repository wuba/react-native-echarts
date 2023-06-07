import type { SkJSIInstance } from "./JsiInstance";
import type { SkCanvas } from "./Canvas";
export declare enum MatrixIndex {
    ScaleX = 0,
    SkewX = 1,
    TransX = 2,
    SkewY = 3,
    ScaleY = 4,
    TransY = 5,
    Persp0 = 6,
    Persp1 = 7,
    Persp2 = 8
}
export declare const isMatrix: (obj: unknown) => obj is SkMatrix;
export interface SkMatrix extends SkJSIInstance<"Matrix"> {
    concat: (matrix: SkMatrix) => void;
    translate: (x: number, y: number) => void;
    scale: (x: number, y?: number) => void;
    skew: (x: number, y: number) => void;
    rotate: (theta: number) => void;
    identity: () => void;
    get: () => number[];
}
declare type Transform2dName = "translateX" | "translateY" | "scale" | "skewX" | "skewY" | "scaleX" | "scaleY" | "rotateZ" | "rotate";
declare type Transformations = {
    readonly [Name in Transform2dName]: number;
};
export declare type Transforms2d = readonly (Pick<Transformations, "translateX"> | Pick<Transformations, "translateY"> | Pick<Transformations, "scale"> | Pick<Transformations, "scaleX"> | Pick<Transformations, "scaleY"> | Pick<Transformations, "skewX"> | Pick<Transformations, "skewY"> | Pick<Transformations, "rotate">)[];
export interface TransformProp {
    transform?: Transforms2d;
}
export declare const processTransform: <T extends SkMatrix | SkCanvas>(m: T, transforms: Transforms2d) => T;
export declare const toDegrees: (rad: number) => number;
export {};
