export let AlphaType;

(function (AlphaType) {
  AlphaType[AlphaType["Unknown"] = 0] = "Unknown";
  AlphaType[AlphaType["Opaque"] = 1] = "Opaque";
  AlphaType[AlphaType["Premul"] = 2] = "Premul";
  AlphaType[AlphaType["Unpremul"] = 3] = "Unpremul";
})(AlphaType || (AlphaType = {}));

export let ColorType;

(function (ColorType) {
  ColorType[ColorType["Unknown"] = 0] = "Unknown";
  ColorType[ColorType["Alpha_8"] = 1] = "Alpha_8";
  ColorType[ColorType["RGB_565"] = 2] = "RGB_565";
  ColorType[ColorType["ARGB_4444"] = 3] = "ARGB_4444";
  ColorType[ColorType["RGBA_8888"] = 4] = "RGBA_8888";
  ColorType[ColorType["RGB_888x"] = 5] = "RGB_888x";
  ColorType[ColorType["BGRA_8888"] = 6] = "BGRA_8888";
  ColorType[ColorType["RGBA_1010102"] = 7] = "RGBA_1010102";
  ColorType[ColorType["BGRA_1010102"] = 8] = "BGRA_1010102";
  ColorType[ColorType["RGB_101010x"] = 9] = "RGB_101010x";
  ColorType[ColorType["BGR_101010x"] = 10] = "BGR_101010x";
  ColorType[ColorType["Gray_8"] = 11] = "Gray_8";
  ColorType[ColorType["RGBA_F16Norm"] = 12] = "RGBA_F16Norm";
  ColorType[ColorType["RGBA_F16"] = 13] = "RGBA_F16";
  ColorType[ColorType["RGBA_F32"] = 14] = "RGBA_F32";
  ColorType[ColorType["R8G8_unorm"] = 15] = "R8G8_unorm";
  ColorType[ColorType["A16_float"] = 16] = "A16_float";
  ColorType[ColorType["R16G16_float"] = 17] = "R16G16_float";
  ColorType[ColorType["A16_unorm"] = 18] = "A16_unorm";
  ColorType[ColorType["R16G16_unorm"] = 19] = "R16G16_unorm";
  ColorType[ColorType["R16G16B16A16_unorm"] = 20] = "R16G16B16A16_unorm";
  ColorType[ColorType["SRGBA_8888"] = 21] = "SRGBA_8888";
})(ColorType || (ColorType = {}));
//# sourceMappingURL=ImageFactory.js.map