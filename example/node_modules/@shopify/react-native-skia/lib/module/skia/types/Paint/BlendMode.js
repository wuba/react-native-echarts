/**
 *  Blends are operators that take in two colors (source, destination) and
 * return a new color. Many of these operate the same on all 4 components: red,
 * green, blue, alpha. For these, we just document what happens to one
 * component, rather than naming each one separately.
 *
 *  Different SkColorTypes have different representations for color components:
 *      8-bit: 0..255
 *      6-bit: 0..63
 *      5-bit: 0..31
 *      4-bit: 0..15
 *     floats: 0...1
 *
 *  The documentation is expressed as if the component values are always 0..1
 * (floats).
 *
 *  For brevity, the documentation uses the following abbreviations
 *  s  : source
 *  d  : destination
 *  sa : source alpha
 *  da : destination alpha
 *
 *  Results are abbreviated
 *  r  : if all 4 components are computed in the same manner
 *  ra : result alpha component
 *  rc : result "color": red, green, blue components
 */
export let BlendMode;

(function (BlendMode) {
  BlendMode[BlendMode["Clear"] = 0] = "Clear";
  BlendMode[BlendMode["Src"] = 1] = "Src";
  BlendMode[BlendMode["Dst"] = 2] = "Dst";
  BlendMode[BlendMode["SrcOver"] = 3] = "SrcOver";
  BlendMode[BlendMode["DstOver"] = 4] = "DstOver";
  BlendMode[BlendMode["SrcIn"] = 5] = "SrcIn";
  BlendMode[BlendMode["DstIn"] = 6] = "DstIn";
  BlendMode[BlendMode["SrcOut"] = 7] = "SrcOut";
  BlendMode[BlendMode["DstOut"] = 8] = "DstOut";
  BlendMode[BlendMode["SrcATop"] = 9] = "SrcATop";
  BlendMode[BlendMode["DstATop"] = 10] = "DstATop";
  BlendMode[BlendMode["Xor"] = 11] = "Xor";
  BlendMode[BlendMode["Plus"] = 12] = "Plus";
  BlendMode[BlendMode["Modulate"] = 13] = "Modulate";
  BlendMode[BlendMode["Screen"] = 14] = "Screen";
  BlendMode[BlendMode["Overlay"] = 15] = "Overlay";
  BlendMode[BlendMode["Darken"] = 16] = "Darken";
  BlendMode[BlendMode["Lighten"] = 17] = "Lighten";
  BlendMode[BlendMode["ColorDodge"] = 18] = "ColorDodge";
  BlendMode[BlendMode["ColorBurn"] = 19] = "ColorBurn";
  BlendMode[BlendMode["HardLight"] = 20] = "HardLight";
  BlendMode[BlendMode["SoftLight"] = 21] = "SoftLight";
  BlendMode[BlendMode["Difference"] = 22] = "Difference";
  BlendMode[BlendMode["Exclusion"] = 23] = "Exclusion";
  BlendMode[BlendMode["Multiply"] = 24] = "Multiply";
  BlendMode[BlendMode["Hue"] = 25] = "Hue";
  BlendMode[BlendMode["Saturation"] = 26] = "Saturation";
  BlendMode[BlendMode["Color"] = 27] = "Color";
  BlendMode[BlendMode["Luminosity"] = 28] = "Luminosity";
})(BlendMode || (BlendMode = {}));
//# sourceMappingURL=BlendMode.js.map