"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFont = void 0;

var _react = require("react");

var _Skia = require("../Skia");

var _Typeface = require("./Typeface");

/*global SkiaApi*/

/**
 * Returns a Skia Font object
 * */
const useFont = (font, size, onError) => {
  const typeface = (0, _Typeface.useTypeface)(font, onError);
  return (0, _react.useMemo)(() => {
    if (typeface && size) {
      return _Skia.Skia.Font(typeface, size);
    } else if (typeface && !size) {
      return _Skia.Skia.Font(typeface);
    } else {
      return null;
    }
  }, [size, typeface]);
};

exports.useFont = useFont;
//# sourceMappingURL=Font.js.map