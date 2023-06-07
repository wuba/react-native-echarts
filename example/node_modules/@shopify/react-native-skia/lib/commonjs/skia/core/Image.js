"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useImage = void 0;

var _Skia = require("../Skia");

var _Data = require("./Data");

const imgFactory = _Skia.Skia.Image.MakeImageFromEncoded.bind(_Skia.Skia.Image);
/**
 * Returns a Skia Image object
 * */


const useImage = (source, onError) => (0, _Data.useRawData)(source, imgFactory, onError);

exports.useImage = useImage;
//# sourceMappingURL=Image.js.map