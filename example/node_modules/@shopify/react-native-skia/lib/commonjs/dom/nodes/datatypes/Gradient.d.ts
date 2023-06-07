import type { Skia, SkRect, Transforms2d, Vector } from "../../../skia/types";
import { TileMode } from "../../../skia/types";
import type { GradientProps, ImageShaderProps } from "../../types";
export declare const transformOrigin: (origin: Vector, transform: Transforms2d) => (Pick<{
    readonly translateX: number;
    readonly translateY: number;
    readonly scale: number;
    readonly skewX: number;
    readonly skewY: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotateZ: number;
    readonly rotate: number;
}, "translateX"> | Pick<{
    readonly translateX: number;
    readonly translateY: number;
    readonly scale: number;
    readonly skewX: number;
    readonly skewY: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotateZ: number;
    readonly rotate: number;
}, "translateY"> | Pick<{
    readonly translateX: number;
    readonly translateY: number;
    readonly scale: number;
    readonly skewX: number;
    readonly skewY: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotateZ: number;
    readonly rotate: number;
}, "scale"> | Pick<{
    readonly translateX: number;
    readonly translateY: number;
    readonly scale: number;
    readonly skewX: number;
    readonly skewY: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotateZ: number;
    readonly rotate: number;
}, "scaleX"> | Pick<{
    readonly translateX: number;
    readonly translateY: number;
    readonly scale: number;
    readonly skewX: number;
    readonly skewY: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotateZ: number;
    readonly rotate: number;
}, "scaleY"> | Pick<{
    readonly translateX: number;
    readonly translateY: number;
    readonly scale: number;
    readonly skewX: number;
    readonly skewY: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotateZ: number;
    readonly rotate: number;
}, "skewX"> | Pick<{
    readonly translateX: number;
    readonly translateY: number;
    readonly scale: number;
    readonly skewX: number;
    readonly skewY: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotateZ: number;
    readonly rotate: number;
}, "skewY"> | Pick<{
    readonly translateX: number;
    readonly translateY: number;
    readonly scale: number;
    readonly skewX: number;
    readonly skewY: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotateZ: number;
    readonly rotate: number;
}, "rotate">)[];
export declare const processGradientProps: (Skia: Skia, { colors, positions, mode, flags, ...transform }: GradientProps) => {
    colors: Float32Array[];
    positions: number[] | null;
    mode: TileMode;
    flags: number | undefined;
    localMatrix: import("../../../skia/types").SkMatrix;
};
export declare const getRect: (Skia: Skia, props: Omit<ImageShaderProps, "tx" | "ty" | "fm" | "mm" | "fit" | "image">) => SkRect | undefined;
