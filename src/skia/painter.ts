import { PatternObject } from 'zrender/lib/graphic/Pattern';
import { GradientObject } from 'zrender/lib/graphic/Gradient';
import { PainterBase } from 'zrender/lib/PainterBase';
import type Storage from 'zrender/lib/Storage';
import { createBrushScope } from './core';
import { brush } from './graphic';
import { ReactElement } from 'react';
let svgId = 0;

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

export class SkiaPainter implements PainterBase {
  type: string = 'svg';
  root: HTMLElement;
  storage: Storage;
  private _opts: SVGPainterOption;
  private _id: string;
  private _width: number
  private _height: number
  private _svgDom: any;
  constructor(
    root: RootProps,
    storage: Storage,
    opts: SVGPainterOption,
    id: number
  ) {
    this.root = root;
    this.storage = storage;
    this._opts = opts;
    this._id = 'zr' + svgId++;
    this._svgDom = root.elm;
    this._width = 0;
    this._height = 0;
    this.resize(opts.width ?? 0, opts.height ?? 0);
  }
  getType() {
    return this.type;
  }
  setBackgroundColor(backgroundColor: string | GradientObject | PatternObject): void {
  }
  getViewportRoot: () => HTMLElement = () => {
    return this.root as HTMLElement;
  }
  getViewportRootOffset: () => { offsetLeft: number; offsetTop: number } = () => {
    return { offsetLeft: 0, offsetTop: 0 };
  }
  refresh(): void {
    const scope = createBrushScope(this._id);
    const list = this.storage.getDisplayList(true);
    const children: ReactElement[] = [];
    for (const el of list) {
      if (!el.invisible) {
        const ret = brush(el, scope);
        if (ret) children.push(ret);
      }
    }
    // @ts-ignore
    this.root.elm.patch(children);
  }
  clear(): void {
  }
  toDataURL(base64?: boolean): string {
    return '';
  }
  resize(width: number, height: number) {
    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      this._svgDom.setAttribute('width', width);
      this._svgDom.setAttribute('height', height);
    }
  }
  dispose(): void {
  }
  getWidth() {
    return this._width;
  }
  getHeight() {
    return this._height;
  }
  refreshHover = createMethodNotSupport('refreshHover') as PainterBase['refreshHover'];
  configLayer = createMethodNotSupport('configLayer') as PainterBase['configLayer'];
}

// Not supported methods
function logError(...args: any[]) {
  if (typeof console !== 'undefined') {
    console.error.apply(console, args);
  }
}
function createMethodNotSupport(method: string): any {
  return function () {
    if (process.env.NODE_ENV !== 'production') {
      logError('In SVG mode painter not support method "' + method + '"');
    }
  };
}