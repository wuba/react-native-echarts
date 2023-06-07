import { Host, ckEnum, NotImplementedOnRNWeb } from "./Host";
import { JsiSkPath } from "./JsiSkPath";
export class JsiSkPathFactory extends Host {
  constructor(CanvasKit) {
    super(CanvasKit);
  }

  Make() {
    return new JsiSkPath(this.CanvasKit, new this.CanvasKit.Path());
  }

  MakeFromSVGString(str) {
    const path = this.CanvasKit.Path.MakeFromSVGString(str);

    if (path === null) {
      return null;
    }

    return new JsiSkPath(this.CanvasKit, path);
  }

  MakeFromOp(one, two, op) {
    const path = this.CanvasKit.Path.MakeFromOp(JsiSkPath.fromValue(one), JsiSkPath.fromValue(two), ckEnum(op));

    if (path === null) {
      return null;
    }

    return new JsiSkPath(this.CanvasKit, path);
  }

  MakeFromCmds(cmds) {
    const path = this.CanvasKit.Path.MakeFromCmds(cmds.flat());

    if (path === null) {
      return null;
    }

    return new JsiSkPath(this.CanvasKit, path);
  }

  MakeFromText(_text, _x, _y, _font) {
    throw new NotImplementedOnRNWeb();
  }

}
//# sourceMappingURL=JsiSkPathFactory.js.map