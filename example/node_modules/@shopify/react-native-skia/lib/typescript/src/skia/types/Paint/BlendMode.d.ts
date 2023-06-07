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
export declare enum BlendMode {
    Clear = 0,
    Src = 1,
    Dst = 2,
    SrcOver = 3,
    DstOver = 4,
    SrcIn = 5,
    DstIn = 6,
    SrcOut = 7,
    DstOut = 8,
    SrcATop = 9,
    DstATop = 10,
    Xor = 11,
    Plus = 12,
    Modulate = 13,
    Screen = 14,
    Overlay = 15,
    Darken = 16,
    Lighten = 17,
    ColorDodge = 18,
    ColorBurn = 19,
    HardLight = 20,
    SoftLight = 21,
    Difference = 22,
    Exclusion = 23,
    Multiply = 24,
    Hue = 25,
    Saturation = 26,
    Color = 27,
    Luminosity = 28
}
