"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SumPathEffectNode = exports.Path2DPathEffectNode = exports.Path1DPathEffectNode = exports.Line2DPathEffectNode = exports.DiscretePathEffectNode = exports.DashPathEffectNode = exports.CornerPathEffectNode = void 0;

var _types = require("../../../skia/types");

var _Node = require("../Node");

var _types2 = require("../../types");

var _Enum = require("../datatypes/Enum");

var _datatypes = require("../datatypes");

class PathEffectDeclaration extends _Node.JsiDeclarationNode {
  constructor(ctx, type, props) {
    super(ctx, _types2.DeclarationType.PathEffect, type, props);
  }

  addChild(child) {
    if (!(child instanceof PathEffectDeclaration)) {
      throw new Error(`Cannot add child of type ${child.type} to ${this.type}`);
    }

    super.addChild(child);
  }

  insertChildBefore(child, before) {
    if (!(child instanceof PathEffectDeclaration)) {
      throw new Error(`Cannot add child of type ${child.type} to ${this.type}`);
    }

    super.insertChildBefore(child, before);
  }

  compose(pe) {
    const children = this._children;

    if (this._children.length === 0) {
      return pe;
    } else {
      return this.Skia.PathEffect.MakeCompose(pe, children.reduce((acc, child) => {
        if (acc === null) {
          return child.materialize();
        }

        return this.Skia.PathEffect.MakeCompose(acc, child.materialize());
      }, null));
    }
  }

  getOptionalChildInstance(index) {
    const child = this._children[index];

    if (!child) {
      return null;
    }

    return this.getMandatoryChildInstance(index);
  }

  getMandatoryChildInstance(index) {
    const child = this._children[index];

    if (child instanceof _Node.JsiDeclarationNode) {
      if (child.isPathEffect()) {
        return child.materialize();
      } else {
        throw new Error(`Found invalid child ${child.type} in ${this.type}`);
      }
    } else {
      throw new Error(`Found invalid child ${child.type} in ${this.type}`);
    }
  }

}

class DiscretePathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.DiscretePathEffect, props);
  }

  materialize() {
    const {
      length,
      deviation,
      seed
    } = this.props;
    const pe = this.Skia.PathEffect.MakeDiscrete(length, deviation, seed);
    return this.compose(pe);
  }

}

exports.DiscretePathEffectNode = DiscretePathEffectNode;

class Path2DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Path2DPathEffect, props);
  }

  materialize() {
    const {
      matrix
    } = this.props;
    const path = (0, _datatypes.processPath)(this.Skia, this.props.path);
    const pe = this.Skia.PathEffect.MakePath2D(matrix, path);

    if (pe === null) {
      return null;
    }

    return this.compose(pe);
  }

}

exports.Path2DPathEffectNode = Path2DPathEffectNode;

class DashPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.DashPathEffect, props);
  }

  materialize() {
    const {
      intervals,
      phase
    } = this.props;
    const pe = this.Skia.PathEffect.MakeDash(intervals, phase);
    return this.compose(pe);
  }

}

exports.DashPathEffectNode = DashPathEffectNode;

class CornerPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.CornerPathEffect, props);
  }

  materialize() {
    const {
      r
    } = this.props;
    const pe = this.Skia.PathEffect.MakeCorner(r);

    if (pe === null) {
      return null;
    }

    return this.compose(pe);
  }

}

exports.CornerPathEffectNode = CornerPathEffectNode;

class SumPathEffectNode extends PathEffectDeclaration {
  constructor(ctx) {
    super(ctx, _types2.NodeType.SumPathEffect, null);
  }

  materialize() {
    return this.Skia.PathEffect.MakeSum(this.getMandatoryChildInstance(0), this.getMandatoryChildInstance(1));
  }

}

exports.SumPathEffectNode = SumPathEffectNode;

class Line2DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Line2DPathEffect, props);
  }

  materialize() {
    const {
      width,
      matrix
    } = this.props;
    const pe = this.Skia.PathEffect.MakeLine2D(width, matrix);

    if (pe === null) {
      return null;
    }

    return this.compose(pe);
  }

}

exports.Line2DPathEffectNode = Line2DPathEffectNode;

class Path1DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Path1DPathEffect, props);
  }

  materialize() {
    const {
      advance,
      phase,
      style
    } = this.props;
    const path = (0, _datatypes.processPath)(this.Skia, this.props.path);
    const pe = this.Skia.PathEffect.MakePath1D(path, advance, phase, _types.Path1DEffectStyle[(0, _Enum.enumKey)(style)]);

    if (pe === null) {
      return null;
    }

    return this.compose(pe);
  }

}

exports.Path1DPathEffectNode = Path1DPathEffectNode;
//# sourceMappingURL=PathEffects.js.map