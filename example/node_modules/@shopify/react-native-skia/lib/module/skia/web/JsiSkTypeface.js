import { HostObject } from "./Host";
export class JsiSkTypeface extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Typeface");
  }

  get bold() {
    console.warn("Typeface.bold is deprecated and will be removed in a future release. The property will return false.");
    return false;
  }

  get italic() {
    console.warn("Typeface.italic is deprecated and will be removed in a future release. The property will return false.");
    return false;
  }

}
//# sourceMappingURL=JsiSkTypeface.js.map