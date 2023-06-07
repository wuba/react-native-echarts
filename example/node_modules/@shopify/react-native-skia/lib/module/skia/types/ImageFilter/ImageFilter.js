export let TileMode;

(function (TileMode) {
  TileMode[TileMode["Clamp"] = 0] = "Clamp";
  TileMode[TileMode["Repeat"] = 1] = "Repeat";
  TileMode[TileMode["Mirror"] = 2] = "Mirror";
  TileMode[TileMode["Decal"] = 3] = "Decal";
})(TileMode || (TileMode = {}));

export const isImageFilter = obj => obj !== null && obj.__typename__ === "ImageFilter";
//# sourceMappingURL=ImageFilter.js.map