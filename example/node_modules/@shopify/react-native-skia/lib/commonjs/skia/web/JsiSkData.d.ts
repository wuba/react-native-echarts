import type { CanvasKit } from "canvaskit-wasm";
import type { SkData } from "../types";
import { HostObject } from "./Host";
declare type Data = ArrayBuffer;
export declare class JsiSkData extends HostObject<Data, "Data"> implements SkData {
    constructor(CanvasKit: CanvasKit, ref: Data);
}
export {};
