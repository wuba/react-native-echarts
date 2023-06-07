"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkContourMeasureIter = void 0;

var _Host = require("./Host");

var _JsiSkContourMeasure = require("./JsiSkContourMeasure");

class JsiSkContourMeasureIter extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "ContourMeasureIter");
  }

  next() {
    const result = this.ref.next();

    if (result === null) {
      return null;
    }

    return new _JsiSkContourMeasure.JsiSkContourMeasure(this.CanvasKit, result);
  }

}

exports.JsiSkContourMeasureIter = JsiSkContourMeasureIter;
//# sourceMappingURL=JsiSkContourMeasureIter.js.map