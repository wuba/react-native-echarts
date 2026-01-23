// source from https://github.com/ecomfe/zrender/blob/master/src/svg/core.ts
// under BSD-3-Clause license
// add some patch for skia

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

// Custom implementation of encodeXML to avoid issues with deprecated methods in entities package
// This is based on the entities package implementation but uses substring instead of substr
const xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
const xmlCodeMap = new Map([
  [34, '&quot;'],
  [38, '&amp;'],
  [39, '&apos;'],
  [60, '&lt;'],
  [62, '&gt;'],
]);

/**
 * Gets the Unicode code point at the specified index in a string.
 * Provides a fallback for environments that don't support String.prototype.codePointAt.
 * Handles surrogate pairs correctly to get the full Unicode code point.
 */
const getCodePoint =
  String.prototype.codePointAt != null
    ? (str: string, index: number) => str.codePointAt(index)!
    : // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      (str: string, index: number) =>
        // eslint-disable-next-line no-bitwise
        (str.charCodeAt(index) & 0xfc00) === 0xd800
          ? (str.charCodeAt(index) - 0xd800) * 0x400 +
            str.charCodeAt(index + 1) -
            0xdc00 +
            0x10000
          : str.charCodeAt(index);

/**
 * Encodes all non-ASCII characters and special XML characters using XML entities.
 * Special characters (<, >, &, ", ') are encoded as named entities.
 * Non-ASCII characters are encoded as numeric hexadecimal references (e.g., &#xfc;).
 *
 * @param str - The string to encode
 * @returns The encoded string with XML entities
 */
function encodeXML(str: string): string {
  let ret = '';
  let lastIdx = 0;
  let match;
  while ((match = xmlReplacer.exec(str)) !== null) {
    const i = match.index;
    const char = str.charCodeAt(i);
    const next = xmlCodeMap.get(char);
    if (next !== undefined) {
      ret += str.substring(lastIdx, i) + next;
      lastIdx = i + 1;
    } else {
      ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
      // Increase by 1 if we have a surrogate pair
      // eslint-disable-next-line no-bitwise
      lastIdx = xmlReplacer.lastIndex += Number((char & 0xfc00) === 0xd800);
    }
  }
  // Use substring instead of deprecated substr
  return ret + str.substring(lastIdx);
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
    if (tag === 'path') {
      // fix: https://github.com/Shopify/react-native-skia/issues/888
      if (attrs['stroke-width'] === 0) {
        attrs['stroke-opacity'] = 0;
      }
      // fix: https://github.com/wuba/react-native-echarts/issues/161
      if (attrs.fill === 'transparent') {
        attrs['fill-opacity'] = 0;
      }
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
