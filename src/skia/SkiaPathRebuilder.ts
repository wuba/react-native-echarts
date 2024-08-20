import { PathRebuilder } from 'zrender/lib/core/PathProxy';
import { SkPath, Skia } from '@shopify/react-native-skia';

export default class SkiaPathRebuilder implements PathRebuilder {
  private path: SkPath;

  constructor() {
    this.path = Skia.Path.Make();
  }

  moveTo(x: number, y: number): void {
    this.path.moveTo(x, y);
  }

  lineTo(x: number, y: number): void {
    this.path.lineTo(x, y);
  }

  bezierCurveTo(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): void {
    this.path.cubicTo(x1, y1, x2, y2, x3, y3);
  }

  quadraticCurveTo(x1: number, y1: number, x2: number, y2: number): void {
    this.path.quadTo(x1, y1, x2, y2);
  }

  arc(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
    anticlockwise: boolean
  ): void {
    this.ellipse(cx, cy, r, r, 0, startAngle, endAngle, anticlockwise);
  }

  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise: boolean = false
  ) {
    const useSmallArc = Math.abs(endAngle - startAngle) <= Math.PI;

    const endX = x + radiusX * Math.cos(endAngle);
    const endY = y + radiusY * Math.sin(endAngle);

    const xAxisRotateInDegrees = (rotation * 180) / Math.PI;

    this.path.arcToRotated(
      radiusX,
      radiusY,
      xAxisRotateInDegrees,
      useSmallArc,
      counterclockwise,
      endX,
      endY
    );
  }

  rect(x: number, y: number, width: number, height: number): void {
    this.path.addRect({
      x,
      y,
      width,
      height,
    });
  }

  closePath(): void {
    this.path.close();
  }

  reset() {
    this.path.reset();
  }

  rewind(): void {
    this.path.rewind();
  }

  getPath(): SkPath {
    return this.path;
  }
}
