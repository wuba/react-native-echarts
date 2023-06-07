import { BlendMode } from "../../../skia/types";
import { DeclarationType, NodeType } from "../../types/NodeType";
import { JsiDeclarationNode } from "../Node";
import { enumKey } from "../datatypes";
import { ImageFilterDeclaration } from "./ImageFilters";
import { ShaderDeclaration } from "./Shaders";
export class BlendNode extends JsiDeclarationNode {
  constructor(ctx, props) {
    super(ctx, DeclarationType.ImageFilter, NodeType.Blend, props);
  }

  checkChild(child) {
    if (this._children.length > 0) {
      if (child.declarationType === DeclarationType.ImageFilter) {
        this.declarationType = DeclarationType.ImageFilter;
      } else {
        this.declarationType = DeclarationType.Shader;
      }
    }
  }

  addChild(child) {
    if (!(child instanceof JsiDeclarationNode) || child.declarationType !== DeclarationType.Shader && child.declarationType !== DeclarationType.ImageFilter) {
      throw new Error(`Cannot add child of type ${child.type} to ${this.type}`);
    }

    this.checkChild(child);
    super.addChild(child);
  }

  insertChildBefore(child, before) {
    if (!(child instanceof ImageFilterDeclaration) || !(child instanceof ShaderDeclaration)) {
      throw new Error(`Cannot add child of type ${child.type} to ${this.type}`);
    }

    this.checkChild(child);
    super.insertChildBefore(child, before);
  }

  materialize() {
    const {
      Skia
    } = this;
    const blend = BlendMode[enumKey(this.props.mode)];

    if (this.declarationType === DeclarationType.ImageFilter) {
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
//# sourceMappingURL=BlendNode.js.map