export const processRadius = (Skia, radius) => {
  if (typeof radius === "number") {
    return Skia.Point(radius, radius);
  }

  return radius;
};
//# sourceMappingURL=Radius.js.map