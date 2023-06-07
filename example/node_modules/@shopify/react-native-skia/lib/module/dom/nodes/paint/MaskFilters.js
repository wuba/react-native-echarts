import { BlurStyle } from "../../../skia/types";
import { JsiDeclarationNode } from "../Node";
import { DeclarationType, NodeType } from "../../types";
import { enumKey } from "../datatypes";
export class BlurMaskFilterNode extends JsiDeclarationNode {
  constructor(ctx, props) {
    super(ctx, DeclarationType.MaskFilter, NodeType.BlurMaskFilter, props);
  }

  materialize() {
    const {
      style,
      blur,
      respectCTM
    } = this.props;
    return this.Skia.MaskFilter.MakeBlur(BlurStyle[enumKey(style)], blur, respectCTM);
  }

}
//# sourceMappingURL=MaskFilters.js.map