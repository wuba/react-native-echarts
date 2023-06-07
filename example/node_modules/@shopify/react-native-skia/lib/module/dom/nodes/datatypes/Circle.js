export const isCircleScalarDef = def => // We have an issue to check property existence on JSI backed instances
// eslint-disable-next-line @typescript-eslint/no-explicit-any
def.cx !== undefined;
export const processCircle = (Skia, def) => {
  var _def$c;

  if (isCircleScalarDef(def)) {
    return {
      c: Skia.Point(def.cx, def.cy),
      r: def.r
    };
  }

  return { ...def,
    c: (_def$c = def.c) !== null && _def$c !== void 0 ? _def$c : {
      x: 0,
      y: 0
    }
  };
};
//# sourceMappingURL=Circle.js.map