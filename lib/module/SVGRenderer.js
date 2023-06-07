var _navigator;
import SVGPainter from 'zrender/lib/svg/Painter';
import { vNodeToString } from './SVGCore';
import { updateAttrs } from 'zrender/lib/svg/patch';
import { DOMParser } from '@xmldom/xmldom';
const isRn = ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : _navigator.product) === 'ReactNative';
globalThis.DOMParser = DOMParser;
class CustomSVGPainter extends SVGPainter {
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
      updateAttrs(null, this._oldVNode);
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
        this._svgDom.patchString(this._oldVNode, vNodeToString(vnode));
      }
      // @ts-ignore
      this._oldVNode = vnode;
    } else {
      super.refresh();
    }
  }
}
export function SVGRenderer(registers) {
  registers.registerPainter('svg', CustomSVGPainter);
}
//# sourceMappingURL=SVGRenderer.js.map