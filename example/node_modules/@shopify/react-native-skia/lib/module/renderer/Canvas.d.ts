import React from "react";
import type { RefObject, ReactNode } from "react";
import { SkiaDomView } from "../views";
import type { TouchHandler, SkiaBaseViewProps } from "../views";
export declare const useCanvasRef: () => React.RefObject<SkiaDomView>;
export interface CanvasProps extends SkiaBaseViewProps {
    ref?: RefObject<SkiaDomView>;
    children: ReactNode;
    onTouch?: TouchHandler;
}
export declare const Canvas: React.FC<CanvasProps & React.RefAttributes<SkiaDomView>>;
