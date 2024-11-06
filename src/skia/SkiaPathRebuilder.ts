import { PathRebuilder } from 'zrender/lib/core/PathProxy';
import { SkPath, Skia } from '@shopify/react-native-skia';
import { isAroundZero } from './helper';

const PI = Math.PI;
const PI2 = Math.PI * 2;
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
    anticlockwise: boolean = false
  ) {
    let dTheta = endAngle - startAngle;
    const clockwise = !anticlockwise;

    const dThetaPositive = Math.abs(dTheta);
    const isCircle =
      isAroundZero(dThetaPositive - PI2) ||
      (clockwise ? dTheta >= PI2 : -dTheta >= PI2);

    const useSmallArc = Math.abs(endAngle - startAngle) <= PI;

    const endX = x + radiusX * Math.cos(endAngle);
    const endY = y + radiusY * Math.sin(endAngle);

    const xAxisRotateInDegrees = (rotation * 180) / PI;
    if (isCircle) {
      const ovalRect = {
        x: x - radiusX,
        y: y - radiusY,
        width: radiusX * 2,
        height: radiusY * 2,
      };
      this.path.addOval(ovalRect, anticlockwise);
    } else {
      this.path.arcToRotated(
        radiusX,
        radiusY,
        xAxisRotateInDegrees,
        useSmallArc,
        anticlockwise,
        endX,
        endY
      );
    }
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
