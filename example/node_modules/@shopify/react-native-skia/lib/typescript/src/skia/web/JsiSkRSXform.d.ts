import type { CanvasKit } from "canvaskit-wasm";
import type { SkRSXform } from "../types";
import { HostObject } from "./Host";
export declare type RSXform = Float32Array;
export declare class JsiSkRSXform extends HostObject<RSXform, "RSXform"> implements SkRSXform {
    constructor(CanvasKit: CanvasKit, ref: RSXform);
}
