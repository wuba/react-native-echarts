import { Host } from "./Host";
import { JsiSkSurface } from "./JsiSkSurface";
export class JsiSkSurfaceFactory extends Host {
  constructor(CanvasKit) {
    super(CanvasKit);
  }

  Make(width, height) {
    const surface = this.CanvasKit.MakeSurface(width, height);

    if (!surface) {
      throw new Error("Could not create surface");
    }

    return new JsiSkSurface(this.CanvasKit, surface);
  }

}
//# sourceMappingURL=JsiSkSurfaceFactory.js.map