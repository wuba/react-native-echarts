export type SVGVNodeAttrs = Record<string, string | number | undefined | boolean>;
export interface SVGVNode {
    tag: string;
    attrs: SVGVNodeAttrs;
    children?: SVGVNode[];
    text?: string;
    elm?: Node;
    key: string;
}
export declare function vNodeToString(oel: SVGVNode, opts?: {
    newline?: boolean;
}): string;
//# sourceMappingURL=SVGCore.d.ts.map