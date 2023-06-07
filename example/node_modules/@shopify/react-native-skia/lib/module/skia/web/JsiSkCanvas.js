import { ckEnum, HostObject } from "./Host";
import { JsiSkPaint } from "./JsiSkPaint";
import { JsiSkRect } from "./JsiSkRect";
import { JsiSkRRect } from "./JsiSkRRect";
import { JsiSkImage } from "./JsiSkImage";
import { JsiSkVertices } from "./JsiSkVertices";
import { JsiSkPath } from "./JsiSkPath";
import { JsiSkFont } from "./JsiSkFont";
import { JsiSkTextBlob } from "./JsiSkTextBlob";
import { JsiSkPicture } from "./JsiSkPicture";
import { JsiSkMatrix } from "./JsiSkMatrix";
import { JsiSkImageFilter } from "./JsiSkImageFilter";
import { JsiSkPoint } from "./JsiSkPoint";
export class JsiSkCanvas extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Canvas");
  }

  drawRect(rect, paint) {
    this.ref.drawRect(JsiSkRect.fromValue(this.CanvasKit, rect), JsiSkPaint.fromValue(paint));
  }

  drawImage(image, x, y, paint) {
    this.ref.drawImage(JsiSkImage.fromValue(image), x, y, paint ? JsiSkPaint.fromValue(paint) : paint);
  }

  drawImageRect(img, src, dest, paint, fastSample) {
    this.ref.drawImageRect(JsiSkImage.fromValue(img), JsiSkRect.fromValue(this.CanvasKit, src), JsiSkRect.fromValue(this.CanvasKit, dest), JsiSkPaint.fromValue(paint), fastSample);
  }

  drawImageCubic(img, left, top, B, C, paint) {
    this.ref.drawImageCubic(JsiSkImage.fromValue(img), left, top, B, C, paint ? JsiSkPaint.fromValue(paint) : paint);
  }

  drawImageOptions(img, left, top, fm, mm, paint) {
    this.ref.drawImageOptions(JsiSkImage.fromValue(img), left, top, ckEnum(fm), ckEnum(mm), paint ? JsiSkPaint.fromValue(paint) : paint);
  }

  drawImageNine(img, center, dest, filter, paint) {
    this.ref.drawImageNine(JsiSkImage.fromValue(img), Array.from(JsiSkRect.fromValue(this.CanvasKit, center)), JsiSkRect.fromValue(this.CanvasKit, dest), ckEnum(filter), paint ? JsiSkPaint.fromValue(paint) : paint);
  }

  drawImageRectCubic(img, src, dest, B, C, paint) {
    this.ref.drawImageRectCubic(JsiSkImage.fromValue(img), JsiSkRect.fromValue(this.CanvasKit, src), JsiSkRect.fromValue(this.CanvasKit, dest), B, C, paint ? JsiSkPaint.fromValue(paint) : paint);
  }

  drawImageRectOptions(img, src, dest, fm, mm, paint) {
    this.ref.drawImageRectOptions(JsiSkImage.fromValue(img), JsiSkRect.fromValue(this.CanvasKit, src), JsiSkRect.fromValue(this.CanvasKit, dest), ckEnum(fm), ckEnum(mm), paint ? JsiSkPaint.fromValue(paint) : paint);
  }

  drawPaint(paint) {
    this.ref.drawPaint(JsiSkPaint.fromValue(paint));
  }

  drawLine(x0, y0, x1, y1, paint) {
    this.ref.drawLine(x0, y0, x1, y1, JsiSkPaint.fromValue(paint));
  }

  drawCircle(cx, cy, radius, paint) {
    this.ref.drawCircle(cx, cy, radius, JsiSkPaint.fromValue(paint));
  }

  drawVertices(verts, mode, paint) {
    this.ref.drawVertices(JsiSkVertices.fromValue(verts), ckEnum(mode), JsiSkPaint.fromValue(paint));
  }

  drawPatch(cubics, colors, texs, mode, paint) {
    this.ref.drawPatch(cubics.map(_ref => {
      let {
        x,
        y
      } = _ref;
      return [x, y];
    }).flat(), colors, texs ? texs.flatMap(p => Array.from(JsiSkPoint.fromValue(p))) : texs, mode ? ckEnum(mode) : null, paint ? JsiSkPaint.fromValue(paint) : undefined);
  }

  restoreToCount(saveCount) {
    this.ref.restoreToCount(saveCount);
  }

  drawPoints(mode, points, paint) {
    this.ref.drawPoints(ckEnum(mode), points.map(_ref2 => {
      let {
        x,
        y
      } = _ref2;
      return [x, y];
    }).flat(), JsiSkPaint.fromValue(paint));
  }

  drawArc(oval, startAngle, sweepAngle, useCenter, paint) {
    this.ref.drawArc(JsiSkRect.fromValue(this.CanvasKit, oval), startAngle, sweepAngle, useCenter, JsiSkPaint.fromValue(paint));
  }

  drawRRect(rrect, paint) {
    this.ref.drawRRect(JsiSkRRect.fromValue(this.CanvasKit, rrect), JsiSkPaint.fromValue(paint));
  }

  drawDRRect(outer, inner, paint) {
    this.ref.drawDRRect(JsiSkRRect.fromValue(this.CanvasKit, outer), JsiSkRRect.fromValue(this.CanvasKit, inner), JsiSkPaint.fromValue(paint));
  }

  drawOval(oval, paint) {
    this.ref.drawOval(JsiSkRect.fromValue(this.CanvasKit, oval), JsiSkPaint.fromValue(paint));
  }

  drawPath(path, paint) {
    this.ref.drawPath(JsiSkPath.fromValue(path), JsiSkPaint.fromValue(paint));
  }

  drawText(str, x, y, paint, font) {
    this.ref.drawText(str, x, y, JsiSkPaint.fromValue(paint), JsiSkFont.fromValue(font));
  }

  drawTextBlob(blob, x, y, paint) {
    this.ref.drawTextBlob(JsiSkTextBlob.fromValue(blob), x, y, JsiSkPaint.fromValue(paint));
  }

  drawGlyphs(glyphs, positions, x, y, font, paint) {
    this.ref.drawGlyphs(glyphs, positions.map(p => [p.x, p.y]).flat(), x, y, JsiSkFont.fromValue(font), JsiSkPaint.fromValue(paint));
  }

  drawSvg(_svgDom, _width, _height) {
    throw new Error("drawSvg is not implemented on React Native Web");
  }

  save() {
    return this.ref.save();
  }

  saveLayer(paint, bounds, backdrop, flags) {
    return this.ref.saveLayer(paint ? JsiSkPaint.fromValue(paint) : undefined, bounds ? JsiSkRect.fromValue(this.CanvasKit, bounds) : bounds, backdrop ? JsiSkImageFilter.fromValue(backdrop) : backdrop, flags);
  }

  restore() {
    this.ref.restore();
  }

  rotate(rotationInDegrees, rx, ry) {
    this.ref.rotate(rotationInDegrees, rx, ry);
  }

  scale(sx, sy) {
    this.ref.scale(sx, sy);
  }

  skew(sx, sy) {
    this.ref.skew(sx, sy);
  }

  translate(dx, dy) {
    this.ref.translate(dx, dy);
  }

  drawColor(color, blendMode) {
    this.ref.drawColor(color, blendMode ? ckEnum(blendMode) : undefined);
  }

  clear(color) {
    this.ref.clear(color);
  }

  clipPath(path, op, doAntiAlias) {
    this.ref.clipPath(JsiSkPath.fromValue(path), ckEnum(op), doAntiAlias);
  }

  clipRect(rect, op, doAntiAlias) {
    this.ref.clipRect(JsiSkRect.fromValue(this.CanvasKit, rect), ckEnum(op), doAntiAlias);
  }

  clipRRect(rrect, op, doAntiAlias) {
    this.ref.clipRRect(JsiSkRRect.fromValue(this.CanvasKit, rrect), ckEnum(op), doAntiAlias);
  }

  concat(m) {
    this.ref.concat(JsiSkMatrix.fromValue(m));
  }

  drawPicture(skp) {
    this.ref.drawPicture(JsiSkPicture.fromValue(skp));
  }

}
//# sourceMappingURL=JsiSkCanvas.js.map