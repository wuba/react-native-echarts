import React from 'react';
export { SVGRenderer } from './SVGRenderer';
type SVGVNodeAttrs = Record<string, string | number | undefined | boolean>;
export interface SVGVNode {
    tag: string;
    attrs: SVGVNodeAttrs;
    children?: SVGVNode[];
    text?: string;
    elm?: Node;
    key?: string;
}
interface SVGVNodeProps {
    node?: SVGVNode;
    useRNGH?: boolean;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<SVGVNodeProps & React.RefAttributes<unknown>>>;
export default _default;
//# sourceMappingURL=svgChart.d.ts.map