"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkVertices = void 0;

var _Host = require("./Host");

var _JsiSkRect = require("./JsiSkRect");

class JsiSkVertices extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Vertices");
  }

  bounds() {
    return new _JsiSkRect.JsiSkRect(this.CanvasKit, this.ref.bounds());
  }

  uniqueID() {
    return this.ref.uniqueID();
  }

}

exports.JsiSkVertices = JsiSkVertices;
//# sourceMappingURL=JsiSkVertices.js.map