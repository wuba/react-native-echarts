import type { ReactNode } from "react";
interface MaskProps {
    mode?: "luminance" | "alpha";
    clip?: boolean;
    mask: ReactNode | ReactNode[];
    children: ReactNode | ReactNode[];
}
export declare const Mask: ({ children, mask, mode, clip, }: MaskProps) => JSX.Element;
export {};
