import type { CanvasKit, Rect } from "canvaskit-wasm";
import type { SkRect } from "../types";
import { BaseHostObject } from "./Host";
export declare class JsiSkRect extends BaseHostObject<Rect, "Rect"> implements SkRect {
    static fromValue(CanvasKit: CanvasKit, rect: SkRect): Float32Array;
    constructor(CanvasKit: CanvasKit, ref: Rect);
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
}
