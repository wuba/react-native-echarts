import type { SkJSIInstance } from "./JsiInstance";
export declare enum BlurStyle {
    Normal = 0,
    Solid = 1,
    Outer = 2,
    Inner = 3
}
export declare const isMaskFilter: (obj: SkJSIInstance<string> | null) => obj is SkMaskFilter;
export declare type SkMaskFilter = SkJSIInstance<"MaskFilter">;
/**
 * See SkMaskFilter.h for more details.
 */
export interface MaskFilterFactory {
    /**
     * Create a blur maskfilter
     * @param style
     * @param sigma - Standard deviation of the Gaussian blur to apply. Must be > 0.
     * @param respectCTM - if true the blur's sigma is modified by the CTM.
     */
    MakeBlur(style: BlurStyle, sigma: number, respectCTM: boolean): SkMaskFilter;
}
