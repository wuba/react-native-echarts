export let FilterMode;

(function (FilterMode) {
  FilterMode[FilterMode["Nearest"] = 0] = "Nearest";
  FilterMode[FilterMode["Linear"] = 1] = "Linear";
})(FilterMode || (FilterMode = {}));

export let MipmapMode;

(function (MipmapMode) {
  MipmapMode[MipmapMode["None"] = 0] = "None";
  MipmapMode[MipmapMode["Nearest"] = 1] = "Nearest";
  MipmapMode[MipmapMode["Linear"] = 2] = "Linear";
})(MipmapMode || (MipmapMode = {}));

export let ImageFormat;

(function (ImageFormat) {
  ImageFormat[ImageFormat["JPEG"] = 3] = "JPEG";
  ImageFormat[ImageFormat["PNG"] = 4] = "PNG";
  ImageFormat[ImageFormat["WEBP"] = 6] = "WEBP";
})(ImageFormat || (ImageFormat = {}));
//# sourceMappingURL=Image.js.map