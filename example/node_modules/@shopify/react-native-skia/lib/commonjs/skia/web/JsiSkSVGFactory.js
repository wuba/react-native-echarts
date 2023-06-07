"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkSVGFactory = void 0;

var _Host = require("./Host");

class JsiSkSVGFactory extends _Host.Host {
  constructor(CanvasKit) {
    super(CanvasKit);
  }

  MakeFromData(_data) {
    throw new _Host.NotImplementedOnRNWeb();
  }

  MakeFromString(_str) {
    throw new _Host.NotImplementedOnRNWeb();
  }

}

exports.JsiSkSVGFactory = JsiSkSVGFactory;
//# sourceMappingURL=JsiSkSVGFactory.js.map