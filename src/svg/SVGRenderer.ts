import env from 'zrender/lib/core/env';
import SVGPainter from 'zrender/lib/svg/Painter';
import { vNodeToString } from './SVGCore';
import { updateAttrs } from 'zrender/lib/svg/patch';
import type Storage from 'zrender/lib/Storage';
import { DOMParser } from '@xmldom/xmldom';

env.svgSupported = true;

interface SVGPainterOption {
  width?: number;
  height?: number;
  ssr?: boolean;
}

interface RootProps extends HTMLElement {
  getChartSize: () => {
    width: number;
    height: number;
  };
}

global.DOMParser = DOMParser;
class CustomSVGPainter extends SVGPainter {
  constructor(
    root: RootProps,
    storage: Storage,
    opts: SVGPainterOption,
    id: number
  ) {
    // Prioritize taking the width and height set in the configuration;
    // if not available, then take the width and height set in the styles.
    const { width, height } = root.getChartSize();
    opts.width = opts.width || width;
    opts.height = opts.height || height;
    // @ts-ignore
    super(null, storage, opts);
    // @ts-ignore
    this._svgDom = this._oldVNode.elm = root.elm;
    // @ts-ignore
    this._svgDom.setZrenderId?.(id);
    // @ts-ignore
    updateAttrs(null, this._oldVNode);
    this.root = root;
  }
  refresh() {
    const vnode = this.renderToVNode({
      willUpdate: true,
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
  }
  toDataURL(base64?: boolean): string {
    // @ts-ignore
    return this._svgDom.makeImageSnapshot?.() || super.toDataURL(base64);
  }
}

export function SVGRenderer(registers: any) {
  registers.registerPainter('svg', CustomSVGPainter);
}
