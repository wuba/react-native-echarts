"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MipmapMode = exports.ImageFormat = exports.FilterMode = void 0;
let FilterMode;
exports.FilterMode = FilterMode;

(function (FilterMode) {
  FilterMode[FilterMode["Nearest"] = 0] = "Nearest";
  FilterMode[FilterMode["Linear"] = 1] = "Linear";
})(FilterMode || (exports.FilterMode = FilterMode = {}));

let MipmapMode;
exports.MipmapMode = MipmapMode;

(function (MipmapMode) {
  MipmapMode[MipmapMode["None"] = 0] = "None";
  MipmapMode[MipmapMode["Nearest"] = 1] = "Nearest";
  MipmapMode[MipmapMode["Linear"] = 2] = "Linear";
})(MipmapMode || (exports.MipmapMode = MipmapMode = {}));

let ImageFormat;
exports.ImageFormat = ImageFormat;

(function (ImageFormat) {
  ImageFormat[ImageFormat["JPEG"] = 3] = "JPEG";
  ImageFormat[ImageFormat["PNG"] = 4] = "PNG";
  ImageFormat[ImageFormat["WEBP"] = 6] = "WEBP";
})(ImageFormat || (exports.ImageFormat = ImageFormat = {}));
//# sourceMappingURL=Image.js.map