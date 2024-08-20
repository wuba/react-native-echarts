import { PatternObject } from 'zrender/lib/graphic/Pattern';
import { GradientObject } from 'zrender/lib/graphic/Gradient';
import { BrushScope } from './core';
import Displayable from 'zrender/lib/graphic/Displayable';
import Path from 'zrender/lib/graphic/Path';
import { PainterBase } from 'zrender/lib/PainterBase';
import type Storage from 'zrender/lib/Storage';
import { logError } from 'zrender/lib/core/util';
import { isGradient, isPattern } from 'zrender/lib/svg/helper';
import { createBrushScope } from './core';
import { brush, getClipPath, setGradient } from './graphic';
import { ReactElement } from 'react';
import { Group, Rect } from '@shopify/react-native-skia';
import React from 'react';
let svgId = 0;

interface SVGPainterOption {
  width?: number;
  height?: number;
  ssr?: boolean;
}
type SVGPainterBackgroundColor = string | GradientObject | PatternObject;

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
  private _id: string;
  private _width: number;
  private _height: number;
  private _svgDom: any;
  private _backgroundColor: SVGPainterBackgroundColor = 'none';
  constructor(
    root: RootProps,
    storage: Storage,
    opts: SVGPainterOption,
    id: number
  ) {
    this.root = root;
    this.storage = storage;
    this._id = 'zr' + svgId++;
    // @ts-ignore
    this._svgDom = root.elm;
    this._svgDom.setZrenderId?.(id);
    this._width = 0;
    this._height = 0;
    this.resize(opts.width ?? 0, opts.height ?? 0);
  }
  getType() {
    return this.type;
  }
  setBackgroundColor(backgroundColor: SVGPainterBackgroundColor): void {
    this._backgroundColor = backgroundColor;
  }
  getViewportRoot: () => HTMLElement = () => {
    return this.root as HTMLElement;
  };
  getViewportRootOffset: () => { offsetLeft: number; offsetTop: number } =
    () => {
      return { offsetLeft: 0, offsetTop: 0 };
    };
  refresh(): void {
    const scope = createBrushScope(this._id);
    const list = this.storage.getDisplayList(true);
    const width = this._width;
    const height = this._height;
    let children: ReactElement[] = [];
    const bgVNode = createBackgroundVNode(
      width,
      height,
      this._backgroundColor,
      scope
    );
    bgVNode && children.push(bgVNode);
    this._paintList(list, scope, children);
    // @ts-ignore
    this.root.elm.patch(children);
  }
  _paintList(list: Displayable[], scope: BrushScope, out?: ReactElement[]) {
    const clipPathsGroupsStack: any[] = [];
    const outGroups: any[] = [];
    let clipPathsGroupsStackDepth = 0;
    let currentClipPathGroup;
    let prevClipPaths: Path[] | undefined = [];
    let clipGroupNodeIdx = 0;
    for (const displayable of list) {
      if (!displayable.invisible) {
        const clipPaths = displayable.__clipPaths;
        const len = (clipPaths && clipPaths.length) || 0;
        const prevLen = (prevClipPaths && prevClipPaths.length) || 0;
        let lca;
        // Find the lowest common ancestor
        for (lca = Math.max(len - 1, prevLen - 1); lca >= 0; lca--) {
          if (
            clipPaths &&
            prevClipPaths &&
            clipPaths[lca] === prevClipPaths[lca]
          ) {
            break;
          }
        }
        // pop the stack
        for (let i = prevLen - 1; i > lca; i--) {
          clipPathsGroupsStackDepth--;
          // svgEls.push(closeGroup);
          currentClipPathGroup =
            clipPathsGroupsStack[clipPathsGroupsStackDepth - 1];
        }
        // Pop clip path group for clipPaths not match the previous.
        for (let i = lca + 1; i < len; i++) {
          const clip = clipPaths && getClipPath(clipPaths[i], scope);
          const g = {
            id: 'clip-g-' + clipGroupNodeIdx++,
            clip,
            children: [],
            index: out?.length,
          };
          clipPathsGroupsStack[clipPathsGroupsStackDepth++] = g;
          outGroups.push(g);
          currentClipPathGroup = g;
        }
        prevClipPaths = clipPaths;
        const ret = brush(displayable, scope);
        if (ret) {
          if (ret instanceof Array) {
            (currentClipPathGroup ? currentClipPathGroup.children : out)?.push(
              ...ret
            );
          } else {
            (currentClipPathGroup ? currentClipPathGroup.children : out)?.push(
              ret
            );
          }
        }
      }
    }
    for (let i = outGroups.length - 1; i >= 0; i--) {
      const group = outGroups[i];
      out?.splice(
        group.index,
        0,
        <Group key={group.id} clip={group.clip}>
          {group.children}
        </Group>
      );
    }
  }
  clear(): void {}
  toDataURL(): string {
    return this._svgDom.makeImageSnapshot?.();
  }
  resize(width: number, height: number) {
    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      this._svgDom.setAttribute('width', width);
      this._svgDom.setAttribute('height', height);
    }
  }
  dispose(): void {}
  getWidth() {
    return this._width;
  }
  getHeight() {
    return this._height;
  }
  refreshHover = createMethodNotSupport(
    'refreshHover'
  ) as PainterBase['refreshHover'];
  configLayer = createMethodNotSupport(
    'configLayer'
  ) as PainterBase['configLayer'];
}

// Not supported methods
function createMethodNotSupport(method: string): any {
  return function () {
    if (process.env.NODE_ENV !== 'production') {
      logError('In SVG mode painter not support method "' + method + '"');
    }
  };
}

function createBackgroundVNode(
  width: number,
  height: number,
  backgroundColor: SVGPainterBackgroundColor,
  _scope: BrushScope
) {
  let bgVNode;
  if (backgroundColor && backgroundColor !== 'none') {
    const attrs: Record<string, string | number | boolean> = {};
    if (isGradient(backgroundColor)) {
      setGradient({ fill: backgroundColor as any }, attrs, 'fill');
    } else if (isPattern(backgroundColor)) {
      // todo
    } else {
      attrs.fill = backgroundColor;
    }
    if (typeof attrs.fill === 'string') {
      return (
        <Rect
          key="bg"
          x={0}
          y={0}
          width={width}
          height={height}
          color={attrs.fill}
        />
      );
    } else {
      return (
        <Rect key="bg" x={0} y={0} width={width} height={height}>
          {attrs.fill}
        </Rect>
      );
    }
  }
  return bgVNode;
}
