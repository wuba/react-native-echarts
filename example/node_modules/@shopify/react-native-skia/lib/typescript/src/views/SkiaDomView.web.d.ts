import type { SkCanvas } from "../skia/types";
import { SkiaBaseWebView } from "./SkiaBaseWebView";
import type { SkiaDomViewProps, TouchInfo } from "./types";
export declare class SkiaDomView extends SkiaBaseWebView<SkiaDomViewProps> {
    constructor(props: SkiaDomViewProps);
    protected renderInCanvas(canvas: SkCanvas, touches: TouchInfo[]): void;
}
