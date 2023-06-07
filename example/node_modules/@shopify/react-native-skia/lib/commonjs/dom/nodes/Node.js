"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiNode = exports.JsiDeclarationNode = void 0;

var _types = require("../types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiNode {
  constructor(ctx, type, props) {
    this.type = type;
    this.props = props;

    _defineProperty(this, "_children", []);

    _defineProperty(this, "Skia", void 0);

    _defineProperty(this, "depMgr", void 0);

    this.Skia = ctx.Skia;
    this.depMgr = ctx.depMgr;
  }

  setProps(props) {
    this.props = props;
  }

  setProp(name, v) {
    const hasChanged = this.props[name] !== v;
    this.props[name] = v;
    return hasChanged;
  }

  getProps() {
    return this.props;
  }

  children() {
    return this._children;
  }

  addChild(child) {
    this._children.push(child);
  }

  dispose() {
    this.depMgr.unsubscribeNode(this);

    this._children.forEach(child => child.dispose());
  }

  removeChild(child) {
    const index = this._children.indexOf(child);

    if (index !== -1) {
      const [node] = this._children.splice(index, 1);

      node.dispose();
    }
  }

  insertChildBefore(child, before) {
    const index = this._children.indexOf(child);

    if (index !== -1) {
      this._children.splice(index, 1);
    }

    const beforeIndex = this._children.indexOf(before);

    this._children.splice(beforeIndex, 0, child);
  }

}

exports.JsiNode = JsiNode;

class JsiDeclarationNode extends JsiNode {
  constructor(ctx, declarationType, type, props) {
    super(ctx, type, props);
    this.declarationType = declarationType;

    _defineProperty(this, "invalidate", () => {});
  }

  addChild(child) {
    if (!(child instanceof JsiDeclarationNode)) {
      throw new Error(`Cannot add child of type ${child.type} to ${this.type}`);
    }

    super.addChild(child);
    this.invalidate();
  }

  insertChildBefore(child, before) {
    if (!(child instanceof JsiDeclarationNode)) {
      throw new Error(`Cannot add child of type ${child.type} to ${this.type}`);
    }

    super.insertChildBefore(child, before);
    this.invalidate();
  }

  dispose() {
    this.invalidate();
    super.dispose();
  }

  setInvalidate(invalidate) {
    this.invalidate = invalidate;
  }

  setProps(props) {
    super.setProps(props);
    this.invalidate();
  }

  setProp(name, v) {
    const hasChanged = super.setProp(name, v);

    if (hasChanged) {
      this.invalidate();
    }

    return hasChanged;
  }

  isPaint() {
    return this.declarationType === _types.DeclarationType.Paint;
  }

  isImageFilter() {
    return this.declarationType === _types.DeclarationType.ImageFilter;
  }

  isColorFilter() {
    return this.declarationType === _types.DeclarationType.ColorFilter;
  }

  isShader() {
    return this.declarationType === _types.DeclarationType.Shader;
  }

  isMaskFilter() {
    return this.declarationType === _types.DeclarationType.MaskFilter;
  }

  isPathEffect() {
    return this.declarationType === _types.DeclarationType.PathEffect;
  }

}

exports.JsiDeclarationNode = JsiDeclarationNode;
//# sourceMappingURL=Node.js.map