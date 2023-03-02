// source from https://github.com/ecomfe/zrender/blob/master/src/core/platform.ts
// under BSD-3-Clause license
// add some patch for react native

import { DEFAULT_FONT_FAMILY, defaultWidthMapStr } from './font';

const DEFAULT_FONT_SIZE = 12;
const DEFAULT_FONT = DEFAULT_FONT_SIZE + 'px ' + DEFAULT_FONT_FAMILY;

const OFFSET = 20;
const SCALE = 100;

function getTextWidthMap(mapStr: string) {
  const map: Record<string, number> = {};
  if (typeof JSON === 'undefined') {
    return map;
  }
  for (let i = 0; i < mapStr.length; i++) {
    const char = String.fromCharCode(i + 32);
    const size = (mapStr.charCodeAt(i) - OFFSET) / SCALE;
    map[char] = size;
  }
  return map;
}
const DEFAULT_TEXT_WIDTH_MAP = getTextWidthMap(defaultWidthMapStr);

export const measureText = (function () {
  return function (text: string, font: string) {
    text = text || '';
    font = font || DEFAULT_FONT;
    const res = /([0-9]*?)px/.exec(font);
    const fontSize = res && res[1] ? +res[1] : DEFAULT_FONT_SIZE;
    let width = 0;
    if (font.indexOf('mono') >= 0) {
      width = fontSize * text.length;
    } else {
      for (var i = 0; i < text.length; i++) {
        var preCalcWidth = DEFAULT_TEXT_WIDTH_MAP[text[i] as string];
        width += preCalcWidth == null ? fontSize : preCalcWidth * fontSize;
      }
    }
    return { width: width };
  };
})();
