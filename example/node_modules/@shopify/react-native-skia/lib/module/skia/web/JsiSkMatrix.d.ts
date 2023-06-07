import type { CanvasKit, Matrix3x3 } from "canvaskit-wasm";
import type { SkMatrix } from "../types";
import { HostObject } from "./Host";
export declare class JsiSkMatrix extends HostObject<Matrix3x3, "Matrix"> implements SkMatrix {
    constructor(CanvasKit: CanvasKit, ref: Matrix3x3);
    concat(matrix: SkMatrix): void;
    translate(x: number, y: number): void;
    scale(x: number, y?: number): void;
    skew(x: number, y: number): void;
    rotate(value: number): void;
    identity(): void;
    get(): number[];
}
