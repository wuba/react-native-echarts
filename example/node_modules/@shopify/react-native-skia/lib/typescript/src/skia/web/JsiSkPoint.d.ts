import type { CanvasKit, Point } from "canvaskit-wasm";
import type { SkPoint } from "../types";
import { BaseHostObject } from "./Host";
export declare class JsiSkPoint extends BaseHostObject<Point, "Point"> implements SkPoint {
    static fromValue(point: SkPoint): Float32Array;
    constructor(CanvasKit: CanvasKit, ref: Point);
    get x(): number;
    get y(): number;
}
