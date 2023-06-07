import type { CanvasKit } from "canvaskit-wasm";
import type { SkData, ImageInfo } from "../types";
import type { ImageFactory } from "../types/Image/ImageFactory";
import { Host } from "./Host";
import { JsiSkImage } from "./JsiSkImage";
export declare class JsiSkImageFactory extends Host implements ImageFactory {
    constructor(CanvasKit: CanvasKit);
    MakeImageFromEncoded(encoded: SkData): JsiSkImage | null;
    MakeImage(info: ImageInfo, data: SkData, bytesPerRow: number): JsiSkImage | null;
}
