import type { SkCanvas } from "../skia/types";
import type { SkiaDrawViewProps, TouchInfo } from "./types";
import { SkiaBaseWebView } from "./SkiaBaseWebView";
export declare class SkiaView extends SkiaBaseWebView<SkiaDrawViewProps> {
    constructor(props: SkiaDrawViewProps);
    protected renderInCanvas(canvas: SkCanvas, touches: TouchInfo[]): void;
}
