"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveLayerFlag = exports.ClipOp = void 0;
let ClipOp;
exports.ClipOp = ClipOp;

(function (ClipOp) {
  ClipOp[ClipOp["Difference"] = 0] = "Difference";
  ClipOp[ClipOp["Intersect"] = 1] = "Intersect";
})(ClipOp || (exports.ClipOp = ClipOp = {}));

let SaveLayerFlag;
exports.SaveLayerFlag = SaveLayerFlag;

(function (SaveLayerFlag) {
  SaveLayerFlag[SaveLayerFlag["SaveLayerInitWithPrevious"] = 4] = "SaveLayerInitWithPrevious";
  SaveLayerFlag[SaveLayerFlag["SaveLayerF16ColorType"] = 16] = "SaveLayerF16ColorType";
})(SaveLayerFlag || (exports.SaveLayerFlag = SaveLayerFlag = {}));
//# sourceMappingURL=Canvas.js.map