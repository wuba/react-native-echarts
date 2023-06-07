import { Host, NotImplementedOnRNWeb } from "./Host";
export class JsiSkSVGFactory extends Host {
  constructor(CanvasKit) {
    super(CanvasKit);
  }

  MakeFromData(_data) {
    throw new NotImplementedOnRNWeb();
  }

  MakeFromString(_str) {
    throw new NotImplementedOnRNWeb();
  }

}
//# sourceMappingURL=JsiSkSVGFactory.js.map