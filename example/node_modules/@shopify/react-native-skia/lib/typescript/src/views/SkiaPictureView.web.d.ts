import type { SkCanvas } from "../skia/types";
import type { SkiaPictureViewProps } from "./types";
import { SkiaBaseWebView } from "./SkiaBaseWebView";
export declare class SkiaPictureView extends SkiaBaseWebView<SkiaPictureViewProps> {
    constructor(props: SkiaPictureViewProps);
    protected renderInCanvas(canvas: SkCanvas): void;
}
