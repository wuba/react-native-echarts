const fontStyle = (weight, width, slant) => ({
  weight,
  width,
  slant
});

export let FontWeight;

(function (FontWeight) {
  FontWeight[FontWeight["Invisible"] = 0] = "Invisible";
  FontWeight[FontWeight["Thin"] = 100] = "Thin";
  FontWeight[FontWeight["ExtraLight"] = 200] = "ExtraLight";
  FontWeight[FontWeight["Light"] = 300] = "Light";
  FontWeight[FontWeight["Normal"] = 400] = "Normal";
  FontWeight[FontWeight["Medium"] = 500] = "Medium";
  FontWeight[FontWeight["SemiBold"] = 600] = "SemiBold";
  FontWeight[FontWeight["Bold"] = 700] = "Bold";
  FontWeight[FontWeight["ExtraBold"] = 800] = "ExtraBold";
  FontWeight[FontWeight["Black"] = 900] = "Black";
  FontWeight[FontWeight["ExtraBlack"] = 1000] = "ExtraBlack";
})(FontWeight || (FontWeight = {}));

export let FontWidth;

(function (FontWidth) {
  FontWidth[FontWidth["UltraCondensed"] = 1] = "UltraCondensed";
  FontWidth[FontWidth["ExtraCondensed"] = 2] = "ExtraCondensed";
  FontWidth[FontWidth["Condensed"] = 3] = "Condensed";
  FontWidth[FontWidth["SemiCondensed"] = 4] = "SemiCondensed";
  FontWidth[FontWidth["Normal"] = 5] = "Normal";
  FontWidth[FontWidth["SemiExpanded"] = 6] = "SemiExpanded";
  FontWidth[FontWidth["Expanded"] = 7] = "Expanded";
  FontWidth[FontWidth["ExtraExpanded"] = 8] = "ExtraExpanded";
  FontWidth[FontWidth["UltraExpanded"] = 9] = "UltraExpanded";
})(FontWidth || (FontWidth = {}));

export let FontSlant;

(function (FontSlant) {
  FontSlant[FontSlant["Upright"] = 0] = "Upright";
  FontSlant[FontSlant["Italic"] = 1] = "Italic";
  FontSlant[FontSlant["Oblique"] = 2] = "Oblique";
})(FontSlant || (FontSlant = {}));

export let FontEdging;

(function (FontEdging) {
  FontEdging[FontEdging["Alias"] = 0] = "Alias";
  FontEdging[FontEdging["AntiAlias"] = 1] = "AntiAlias";
  FontEdging[FontEdging["SubpixelAntiAlias"] = 2] = "SubpixelAntiAlias";
})(FontEdging || (FontEdging = {}));

export let FontHinting;

(function (FontHinting) {
  FontHinting[FontHinting["None"] = 0] = "None";
  FontHinting[FontHinting["Slight"] = 1] = "Slight";
  FontHinting[FontHinting["Normal"] = 2] = "Normal";
  FontHinting[FontHinting["Full"] = 3] = "Full";
})(FontHinting || (FontHinting = {}));

export const FontStyle = {
  Normal: fontStyle(FontWeight.Normal, FontWidth.Normal, FontSlant.Upright),
  Bold: fontStyle(FontWeight.Bold, FontWidth.Normal, FontSlant.Upright),
  Italic: fontStyle(FontWeight.Normal, FontWidth.Normal, FontSlant.Italic),
  BoldItalic: fontStyle(FontWeight.Bold, FontWidth.Normal, FontSlant.Italic)
};
//# sourceMappingURL=Font.js.map