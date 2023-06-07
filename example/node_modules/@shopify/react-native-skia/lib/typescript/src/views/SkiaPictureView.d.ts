import React from "react";
import type { SkRect } from "../skia/types";
import type { SkiaValue } from "../values";
import type { SkiaPictureViewProps } from "./types";
export declare class SkiaPictureView extends React.Component<SkiaPictureViewProps> {
    constructor(props: SkiaPictureViewProps);
    private _nativeId;
    get nativeId(): number;
    componentDidUpdate(prevProps: SkiaPictureViewProps): void;
    /**
     * Creates a snapshot from the canvas in the surface
     * @param rect Rect to use as bounds. Optional.
     * @returns An Image object.
     */
    makeImageSnapshot(rect?: SkRect): import("../skia/types").SkImage;
    /**
     * Sends a redraw request to the native SkiaView.
     */
    redraw(): void;
    /**
     * Registers one or move values as a dependant value of the Skia View. The view will
     * The view will redraw itself when any of the values change.
     * @param values Values to register
     */
    registerValues(values: SkiaValue<unknown>[]): () => void;
    render(): JSX.Element;
}
