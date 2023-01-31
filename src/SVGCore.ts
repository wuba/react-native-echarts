// source from https://github.com/ecomfe/zrender/blob/master/src/svg/core.ts
// under BSD-3-Clause license
// add some patch for skia
import { encodeXML } from 'entities';

export type SVGVNodeAttrs = Record<
  string,
  string | number | undefined | boolean
>;
export interface SVGVNode {
  tag: string;
  attrs: SVGVNodeAttrs;
  children?: SVGVNode[];
  text?: string;

  // For patching
  elm?: Node;
  key: string;
}

function createElementOpen(name: string, attrs?: SVGVNodeAttrs) {
  const attrsStr: string[] = [];
  if (attrs) {
    for (let key in attrs) {
      const val = attrs[key];
      let part = key;
      // Same with the logic in patch.
      if (val === false) {
        continue;
      } else if (val !== true && val != null) {
        part += `="${val}"`;
      }
      attrsStr.push(part);
    }
  }
  return `<${name} ${attrsStr.join(' ')}>`;
}

function createElementClose(name: string) {
  return `</${name}>`;
}

export function vNodeToString(
  oel: SVGVNode,
  opts?: {
    newline?: boolean;
  }
) {
  opts = opts || {};
  const S = opts.newline ? '\n' : '';
  function convertElToString(el: SVGVNode): string {
    const { children, tag, attrs } = el;
    // fix: https://github.com/Shopify/react-native-skia/issues/888
    if (attrs['stroke-width'] === 0) {
      attrs['stroke-opacity'] = 0;
    }
    if (tag === 'text') {
      if (typeof attrs.style === 'string') {
        const res = /font(-size)?:([\w\s])*?([0-9]*?)px/.exec(attrs.style);
        const fs = Number(res && res[3]);
        // fix: skia不支持 font:
        if (!res?.[1]) {
          attrs.style += ';font-size:' + fs + 'px';
        }
        // fix: https://github.com/Shopify/react-native-skia/issues/884
        if (attrs['dominant-baseline'] === 'central') {
          const dy = fs / 2 - 2;
          if (attrs.y) {
            attrs.y = Number(attrs.y) + dy;
            attrs['dominant-baseline'] = 'auto';
          } else if (attrs.transform) {
            attrs.transform = attrs.transform + ` translate(0, ${dy})`;
            attrs['dominant-baseline'] = 'auto';
          }
        }
      }
      // fix: https://github.com/react-native-svg/react-native-svg/issues/1862
      if (attrs['paint-order'] === 'stroke') {
        attrs['stroke-width'] = 0;
      }
      el.text = encodeXML(el.text || '');
    }
    return (
      createElementOpen(tag, attrs) +
      (el.text || '') +
      (children
        ? `${S}${children.map((child) => convertElToString(child)).join(S)}${S}`
        : '') +
      createElementClose(tag)
    );
  }
  return convertElToString(oel);
}
