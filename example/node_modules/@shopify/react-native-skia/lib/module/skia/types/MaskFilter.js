export let BlurStyle;

(function (BlurStyle) {
  BlurStyle[BlurStyle["Normal"] = 0] = "Normal";
  BlurStyle[BlurStyle["Solid"] = 1] = "Solid";
  BlurStyle[BlurStyle["Outer"] = 2] = "Outer";
  BlurStyle[BlurStyle["Inner"] = 3] = "Inner";
})(BlurStyle || (BlurStyle = {}));

export const isMaskFilter = obj => obj !== null && obj.__typename__ === "MaskFilter";
//# sourceMappingURL=MaskFilter.js.map