import type { CanvasKit } from "canvaskit-wasm";
import type { SkData, SkSVG } from "../types";
import type { SVGFactory } from "../types/SVG/SVGFactory";
import { Host } from "./Host";
export declare class JsiSkSVGFactory extends Host implements SVGFactory {
    constructor(CanvasKit: CanvasKit);
    MakeFromData(_data: SkData): SkSVG | null;
    MakeFromString(_str: string): SkSVG | null;
}
