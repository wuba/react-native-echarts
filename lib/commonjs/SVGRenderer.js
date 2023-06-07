"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGRenderer = SVGRenderer;
var _Painter = _interopRequireDefault(require("zrender/lib/svg/Painter"));
var _SVGCore = require("./SVGCore");
var _patch = require("zrender/lib/svg/patch");
var _xmldom = require("@xmldom/xmldom");
var _navigator;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const isRn = ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : _navigator.product) === 'ReactNative';
globalThis.DOMParser = _xmldom.DOMParser;
class CustomSVGPainter extends _Painter.default {
  constructor(root, storage, opts, id) {
    if (isRn) {
      var _this$_svgDom$setZren, _this$_svgDom;
      // @ts-ignore
      super(null, storage, opts);
      // @ts-ignore
      this._svgDom = this._oldVNode.elm = root.elm;
      // @ts-ignore
      (_this$_svgDom$setZren = (_this$_svgDom = this._svgDom).setZrenderId) === null || _this$_svgDom$setZren === void 0 ? void 0 : _this$_svgDom$setZren.call(_this$_svgDom, id);
      // @ts-ignore
      (0, _patch.updateAttrs)(null, this._oldVNode);
      this.root = root;
    } else {
      super(root, storage, opts);
    }
  }
  refresh() {
    if (isRn) {
      const vnode = this.renderToVNode({
        willUpdate: true
      });
      // Disable user selection.
      vnode.attrs.style = 'position:absolute;left:0;top:0;user-select:none';
      // @ts-ignore
      if (this._svgDom.patch) {
        // @ts-ignore
        this._svgDom.patch(this._oldVNode, vnode);
        // @ts-ignore
      } else if (this._svgDom.patchString) {
        // @ts-ignore
        this._svgDom.patchString(this._oldVNode, (0, _SVGCore.vNodeToString)(vnode));
      }
      // @ts-ignore
      this._oldVNode = vnode;
    } else {
      super.refresh();
    }
  }
}
function SVGRenderer(registers) {
  registers.registerPainter('svg', CustomSVGPainter);
}
//# sourceMappingURL=SVGRenderer.js.map