import type { CanvasKit, Image } from "canvaskit-wasm";
import type { ImageFormat, FilterMode, MipmapMode, SkImage, SkMatrix, SkShader, TileMode } from "../types";
import { HostObject } from "./Host";
export declare class JsiSkImage extends HostObject<Image, "Image"> implements SkImage {
    constructor(CanvasKit: CanvasKit, ref: Image);
    height(): number;
    width(): number;
    makeShaderOptions(tx: TileMode, ty: TileMode, fm: FilterMode, mm: MipmapMode, localMatrix?: SkMatrix): SkShader;
    makeShaderCubic(tx: TileMode, ty: TileMode, B: number, C: number, localMatrix?: SkMatrix): SkShader;
    encodeToBytes(fmt?: ImageFormat, quality?: number): Uint8Array;
    encodeToBase64(fmt?: ImageFormat, quality?: number): string;
}
