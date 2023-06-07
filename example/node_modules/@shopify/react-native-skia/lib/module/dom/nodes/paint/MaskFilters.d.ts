import type { SkMaskFilter } from "../../../skia/types";
import type { NodeContext } from "../Node";
import { JsiDeclarationNode } from "../Node";
import type { BlurMaskFilterProps } from "../../types";
export declare class BlurMaskFilterNode extends JsiDeclarationNode<BlurMaskFilterProps, SkMaskFilter> {
    constructor(ctx: NodeContext, props: BlurMaskFilterProps);
    materialize(): SkMaskFilter;
}
