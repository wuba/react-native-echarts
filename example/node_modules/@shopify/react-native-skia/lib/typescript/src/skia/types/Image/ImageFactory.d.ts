import type { SkData } from "../Data";
import type { SkImage } from "./Image";
export declare enum AlphaType {
    Unknown = 0,
    Opaque = 1,
    Premul = 2,
    Unpremul = 3
}
export declare enum ColorType {
    Unknown = 0,
    Alpha_8 = 1,
    RGB_565 = 2,
    ARGB_4444 = 3,
    RGBA_8888 = 4,
    RGB_888x = 5,
    BGRA_8888 = 6,
    RGBA_1010102 = 7,
    BGRA_1010102 = 8,
    RGB_101010x = 9,
    BGR_101010x = 10,
    Gray_8 = 11,
    RGBA_F16Norm = 12,
    RGBA_F16 = 13,
    RGBA_F32 = 14,
    R8G8_unorm = 15,
    A16_float = 16,
    R16G16_float = 17,
    A16_unorm = 18,
    R16G16_unorm = 19,
    R16G16B16A16_unorm = 20,
    SRGBA_8888 = 21
}
export interface ImageInfo {
    alphaType: AlphaType;
    colorType: ColorType;
    height: number;
    width: number;
}
export interface ImageFactory {
    /**
     * Return an Image backed by the encoded data, but attempt to defer decoding until the image
     * is actually used/drawn. This deferral allows the system to cache the result, either on the
     * CPU or on the GPU, depending on where the image is drawn.
     * This decoding uses the codecs that have been compiled into CanvasKit. If the bytes are
     * invalid (or an unrecognized codec), null will be returned. See Image.h for more details.
     * @param data - Data object with bytes of data
     * @returns If the encoded format is not supported, or subset is outside of the bounds of the decoded
     *  image, nullptr is returned.
     */
    MakeImageFromEncoded: (encoded: SkData) => SkImage | null;
    /**
     * Returns an image with the given pixel data and format.
     * Note that we will always make a copy of the pixel data, because of inconsistencies in
     * behavior between GPU and CPU (i.e. the pixel data will be turned into a GPU texture and
     * not modifiable after creation).
     *
     * @param info
     * @param data - bytes representing the pixel data.
     * @param bytesPerRow
     */
    MakeImage(info: ImageInfo, data: SkData, bytesPerRow: number): SkImage | null;
}
