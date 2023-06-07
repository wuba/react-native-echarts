"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vNodeToString = vNodeToString;
var _entities = require("entities");
// source from https://github.com/ecomfe/zrender/blob/master/src/svg/core.ts
// under BSD-3-Clause license
// add some patch for skia

function createElementOpen(name, attrs) {
  const attrsStr = [];
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
function createElementClose(name) {
  return `</${name}>`;
}
function vNodeToString(oel, opts) {
  opts = opts || {};
  const S = opts.newline ? '\n' : '';
  function convertElToString(el) {
    const {
      children,
      tag,
      attrs
    } = el;
    // fix: https://github.com/Shopify/react-native-skia/issues/888
    if (attrs['stroke-width'] === 0) {
      attrs['stroke-opacity'] = 0;
    }
    if (tag === 'text') {
      if (typeof attrs.style === 'string') {
        const res = /font(-size)?:([\w\s])*?([0-9]*?)px/.exec(attrs.style);
        const fs = Number(res && res[3]);
        // fix: skia不支持 font:
        if (!(res !== null && res !== void 0 && res[1])) {
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
      el.text = (0, _entities.encodeXML)(el.text || '');
    }
    return createElementOpen(tag, attrs) + (el.text || '') + (children ? `${S}${children.map(child => convertElToString(child)).join(S)}${S}` : '') + createElementClose(tag);
  }
  return convertElToString(oel);
}
//# sourceMappingURL=SVGCore.js.map