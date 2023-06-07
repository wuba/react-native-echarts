/**
 * Options used for Path.stroke(). If an option is omitted, a sensible default will be used.
 */
export let FillType;

(function (FillType) {
  FillType[FillType["Winding"] = 0] = "Winding";
  FillType[FillType["EvenOdd"] = 1] = "EvenOdd";
  FillType[FillType["InverseWinding"] = 2] = "InverseWinding";
  FillType[FillType["InverseEvenOdd"] = 3] = "InverseEvenOdd";
})(FillType || (FillType = {}));

export let PathOp;

(function (PathOp) {
  PathOp[PathOp["Difference"] = 0] = "Difference";
  PathOp[PathOp["Intersect"] = 1] = "Intersect";
  PathOp[PathOp["Union"] = 2] = "Union";
  PathOp[PathOp["XOR"] = 3] = "XOR";
  PathOp[PathOp["ReverseDifference"] = 4] = "ReverseDifference";
})(PathOp || (PathOp = {}));

export let PathVerb;

(function (PathVerb) {
  PathVerb[PathVerb["Move"] = 0] = "Move";
  PathVerb[PathVerb["Line"] = 1] = "Line";
  PathVerb[PathVerb["Quad"] = 2] = "Quad";
  PathVerb[PathVerb["Conic"] = 3] = "Conic";
  PathVerb[PathVerb["Cubic"] = 4] = "Cubic";
  PathVerb[PathVerb["Close"] = 5] = "Close";
})(PathVerb || (PathVerb = {}));

export const isPath = obj => obj !== null && obj.__typename__ === "Path";
//# sourceMappingURL=Path.js.map