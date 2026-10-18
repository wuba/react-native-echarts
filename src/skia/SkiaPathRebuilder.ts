import type { PathRebuilder } from 'zrender/lib/core/PathProxy.js';
import { Skia } from '@shopify/react-native-skia';
import type { InputMatrix, SkPath, SkRect } from '@shopify/react-native-skia';
import { isAroundZero } from './helper';

// Keep the shared mutable API local: older Skia versions do not export
// SkPathBuilder, while newer versions no longer expose these methods on SkPath.
interface MutablePath {
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  cubicTo(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): void;
  quadTo(x1: number, y1: number, x2: number, y2: number): void;
  addOval(rect: SkRect, anticlockwise?: boolean): void;
  arcToRotated(
    radiusX: number,
    radiusY: number,
    rotation: number,
    useSmallArc: boolean,
    anticlockwise: boolean,
    x: number,
    y: number
  ): void;
  addRect(rect: SkRect): void;
  close(): void;
  reset(): void;
  rewind?(): void;
  transform(matrix: InputMatrix): void;
  build?(): SkPath;
}

interface PathBuilderFactory {
  Make(): MutablePath & { build(): SkPath };
  MakeFromPath(path: SkPath): MutablePath & { build(): SkPath };
}

const PI = Math.PI;
const PI2 = Math.PI * 2;
export default class SkiaPathRebuilder implements PathRebuilder {
  private path: MutablePath;
  private pathBuilder: PathBuilderFactory | undefined;

  constructor() {
    const skia = Skia as typeof Skia & {
      PathBuilder?: PathBuilderFactory;
    };
    this.pathBuilder = skia.PathBuilder;
    this.path = this.pathBuilder
      ? this.pathBuilder.Make()
      : (Skia.Path.Make() as SkPath & MutablePath);
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
    if (this.path.rewind) {
      this.path.rewind();
    } else {
      this.path.reset();
    }
  }

  getPath(transform?: InputMatrix): SkPath {
    const path = this.path.build
      ? this.path.build()
      : (this.path as SkPath & MutablePath);
    if (!transform) {
      return path;
    }

    // Transform a copy so cached geometry can be reused with another transform.
    if (this.pathBuilder) {
      const builder = this.pathBuilder.MakeFromPath(path);
      builder.transform(transform);
      return builder.build();
    }
    const transformedPath = path.copy() as SkPath & MutablePath;
    transformedPath.transform(transform);
    return transformedPath;
  }
}
