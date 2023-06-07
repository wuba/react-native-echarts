import { HostObject, ckEnum } from "./Host";
import { JsiSkPaint } from "./JsiSkPaint";
import { JsiSkPoint } from "./JsiSkPoint";
import { JsiSkRect } from "./JsiSkRect";
import { JsiSkTypeface } from "./JsiSkTypeface";
export class JsiSkFont extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Font");
  }

  getTextWidth(text, paint) {
    const ids = this.getGlyphIDs(text);
    const widths = this.getGlyphWidths(ids, paint);
    return widths.reduce((a, b) => a + b, 0);
  }

  getMetrics() {
    const result = this.ref.getMetrics();
    return {
      ascent: result.ascent,
      descent: result.descent,
      leading: result.leading,
      bounds: result.bounds ? new JsiSkRect(this.CanvasKit, result.bounds) : undefined
    };
  }

  getGlyphIDs(str, numCodePoints) {
    // TODO: Fix return value in the C++ implementation
    return [...this.ref.getGlyphIDs(str, numCodePoints)];
  } // TODO: Fix return value in the C++ implementation, it return float32


  getGlyphWidths(glyphs, paint) {
    return [...this.ref.getGlyphWidths(glyphs, paint ? JsiSkPaint.fromValue(paint) : null)];
  }

  getGlyphIntercepts(glyphs, positions, top, bottom) {
    return [...this.ref.getGlyphIntercepts(glyphs, positions.map(p => Array.from(JsiSkPoint.fromValue(p))).flat(), top, bottom)];
  }

  getScaleX() {
    return this.ref.getScaleX();
  }

  getSize() {
    return this.ref.getSize();
  }

  getSkewX() {
    return this.ref.getSkewX();
  }

  isEmbolden() {
    return this.ref.isEmbolden();
  }

  getTypeface() {
    const tf = this.ref.getTypeface();
    return tf ? new JsiSkTypeface(this.CanvasKit, tf) : null;
  }

  setEdging(edging) {
    this.ref.setEdging(ckEnum(edging));
  }

  setEmbeddedBitmaps(embeddedBitmaps) {
    this.ref.setEmbeddedBitmaps(embeddedBitmaps);
  }

  setHinting(hinting) {
    this.ref.setHinting(ckEnum(hinting));
  }

  setLinearMetrics(linearMetrics) {
    this.ref.setLinearMetrics(linearMetrics);
  }

  setScaleX(sx) {
    this.ref.setScaleX(sx);
  }

  setSize(points) {
    this.ref.setSize(points);
  }

  setSkewX(sx) {
    this.ref.setSkewX(sx);
  }

  setEmbolden(embolden) {
    this.ref.setEmbolden(embolden);
  }

  setSubpixel(subpixel) {
    this.ref.setSubpixel(subpixel);
  }

  setTypeface(face) {
    this.ref.setTypeface(face ? JsiSkTypeface.fromValue(face) : null);
  }

}
//# sourceMappingURL=JsiSkFont.js.map