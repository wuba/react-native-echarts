export let PaintStyle;

(function (PaintStyle) {
  PaintStyle[PaintStyle["Fill"] = 0] = "Fill";
  PaintStyle[PaintStyle["Stroke"] = 1] = "Stroke";
})(PaintStyle || (PaintStyle = {}));

export let StrokeCap;

(function (StrokeCap) {
  StrokeCap[StrokeCap["Butt"] = 0] = "Butt";
  StrokeCap[StrokeCap["Round"] = 1] = "Round";
  StrokeCap[StrokeCap["Square"] = 2] = "Square";
})(StrokeCap || (StrokeCap = {}));

export let StrokeJoin;

(function (StrokeJoin) {
  StrokeJoin[StrokeJoin["Miter"] = 0] = "Miter";
  StrokeJoin[StrokeJoin["Round"] = 1] = "Round";
  StrokeJoin[StrokeJoin["Bevel"] = 2] = "Bevel";
})(StrokeJoin || (StrokeJoin = {}));

export const isPaint = obj => obj !== null && obj.__typename__ === "Paint";
//# sourceMappingURL=Paint.js.map