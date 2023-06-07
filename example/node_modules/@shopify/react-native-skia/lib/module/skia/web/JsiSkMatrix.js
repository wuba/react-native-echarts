import { HostObject } from "./Host";
export class JsiSkMatrix extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Matrix");
  }

  concat(matrix) {
    this.ref.set(this.CanvasKit.Matrix.multiply(this.ref, JsiSkMatrix.fromValue(matrix)));
  }

  translate(x, y) {
    this.concat(new JsiSkMatrix(this.CanvasKit, Float32Array.of(...this.CanvasKit.Matrix.translated(x, y))));
  }

  scale(x, y) {
    this.concat(new JsiSkMatrix(this.CanvasKit, Float32Array.of(...this.CanvasKit.Matrix.scaled(x, y !== null && y !== void 0 ? y : x))));
  }

  skew(x, y) {
    this.concat(new JsiSkMatrix(this.CanvasKit, Float32Array.of(...this.CanvasKit.Matrix.skewed(x, y))));
  }

  rotate(value) {
    this.concat(new JsiSkMatrix(this.CanvasKit, Float32Array.of(...this.CanvasKit.Matrix.rotated(value))));
  }

  identity() {
    this.ref.set(this.CanvasKit.Matrix.identity());
  }

  get() {
    return Array.from(this.ref);
  }

}
//# sourceMappingURL=JsiSkMatrix.js.map