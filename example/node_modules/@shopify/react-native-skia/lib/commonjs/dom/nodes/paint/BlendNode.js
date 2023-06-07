"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlendNode = void 0;

var _types = require("../../../skia/types");

var _NodeType = require("../../types/NodeType");

var _Node = require("../Node");

var _datatypes = require("../datatypes");

var _ImageFilters = require("./ImageFilters");

var _Shaders = require("./Shaders");

class BlendNode extends _Node.JsiDeclarationNode {
  constructor(ctx, props) {
    super(ctx, _NodeType.DeclarationType.ImageFilter, _NodeType.NodeType.Blend, props);
  }

  checkChild(child) {
    if (this._children.length > 0) {
      if (child.declarationType === _NodeType.DeclarationType.ImageFilter) {
        this.declarationType = _NodeType.DeclarationType.ImageFilter;
      } else {
        this.declarationType = _NodeType.DeclarationType.Shader;
      }
    }
  }

  addChild(child) {
    if (!(child instanceof _Node.JsiDeclarationNode) || child.declarationType !== _NodeType.DeclarationType.Shader && child.declarationType !== _NodeType.DeclarationType.ImageFilter) {
      throw new Error(`Cannot add child of type ${child.type} to ${this.type}`);
    }

    this.checkChild(child);
    super.addChild(child);
  }

  insertChildBefore(child, before) {
    if (!(child instanceof _ImageFilters.ImageFilterDeclaration) || !(child instanceof _Shaders.ShaderDeclaration)) {
      throw new Error(`Cannot add child of type ${child.type} to ${this.type}`);
    }

    this.checkChild(child);
    super.insertChildBefore(child, before);
  }

  materialize() {
    const {
      Skia
    } = this;

    const blend = _types.BlendMode[(0, _datatypes.enumKey)(this.props.mode)];

    if (this.declarationType === _NodeType.DeclarationType.ImageFilter) {
      return this._children.reverse().reduce((inner, outer) => {
        if (inner === null) {
          return outer.materialize();
        }

        return Skia.ImageFilter.MakeBlend(blend, outer.materialize(), inner);
      }, null);
    } else {
      return this._children.reverse().reduce((inner, outer) => {
        if (inner === null) {
          return outer.materialize();
        }

        return Skia.Shader.MakeBlend(blend, outer.materialize(), inner);
      }, null);
    }
  }

}

exports.BlendNode = BlendNode;
//# sourceMappingURL=BlendNode.js.map