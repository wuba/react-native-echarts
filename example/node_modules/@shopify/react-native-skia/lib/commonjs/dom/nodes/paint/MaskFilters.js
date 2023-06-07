"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlurMaskFilterNode = void 0;

var _types = require("../../../skia/types");

var _Node = require("../Node");

var _types2 = require("../../types");

var _datatypes = require("../datatypes");

class BlurMaskFilterNode extends _Node.JsiDeclarationNode {
  constructor(ctx, props) {
    super(ctx, _types2.DeclarationType.MaskFilter, _types2.NodeType.BlurMaskFilter, props);
  }

  materialize() {
    const {
      style,
      blur,
      respectCTM
    } = this.props;
    return this.Skia.MaskFilter.MakeBlur(_types.BlurStyle[(0, _datatypes.enumKey)(style)], blur, respectCTM);
  }

}

exports.BlurMaskFilterNode = BlurMaskFilterNode;
//# sourceMappingURL=MaskFilters.js.map