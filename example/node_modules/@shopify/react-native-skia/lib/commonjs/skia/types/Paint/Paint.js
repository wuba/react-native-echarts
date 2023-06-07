"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPaint = exports.StrokeJoin = exports.StrokeCap = exports.PaintStyle = void 0;
let PaintStyle;
exports.PaintStyle = PaintStyle;

(function (PaintStyle) {
  PaintStyle[PaintStyle["Fill"] = 0] = "Fill";
  PaintStyle[PaintStyle["Stroke"] = 1] = "Stroke";
})(PaintStyle || (exports.PaintStyle = PaintStyle = {}));

let StrokeCap;
exports.StrokeCap = StrokeCap;

(function (StrokeCap) {
  StrokeCap[StrokeCap["Butt"] = 0] = "Butt";
  StrokeCap[StrokeCap["Round"] = 1] = "Round";
  StrokeCap[StrokeCap["Square"] = 2] = "Square";
})(StrokeCap || (exports.StrokeCap = StrokeCap = {}));

let StrokeJoin;
exports.StrokeJoin = StrokeJoin;

(function (StrokeJoin) {
  StrokeJoin[StrokeJoin["Miter"] = 0] = "Miter";
  StrokeJoin[StrokeJoin["Round"] = 1] = "Round";
  StrokeJoin[StrokeJoin["Bevel"] = 2] = "Bevel";
})(StrokeJoin || (exports.StrokeJoin = StrokeJoin = {}));

const isPaint = obj => obj !== null && obj.__typename__ === "Paint";

exports.isPaint = isPaint;
//# sourceMappingURL=Paint.js.map