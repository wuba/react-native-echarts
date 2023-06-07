import type { ComponentProps, ComponentType } from "react";
import { Suspense } from "react";
import { LoadSkiaWeb } from "./LoadSkiaWeb";
interface WithSkiaProps {
    fallback?: ComponentProps<typeof Suspense>["fallback"];
    getComponent: () => Promise<{
        default: ComponentType;
    }>;
    opts?: Parameters<typeof LoadSkiaWeb>[0];
}
export declare const WithSkiaWeb: ({ getComponent, fallback, opts, }: WithSkiaProps) => JSX.Element;
export {};
