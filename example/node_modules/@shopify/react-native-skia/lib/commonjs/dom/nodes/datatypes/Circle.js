"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processCircle = exports.isCircleScalarDef = void 0;

const isCircleScalarDef = def => // We have an issue to check property existence on JSI backed instances
// eslint-disable-next-line @typescript-eslint/no-explicit-any
def.cx !== undefined;

exports.isCircleScalarDef = isCircleScalarDef;

const processCircle = (Skia, def) => {
  if (isCircleScalarDef(def)) {
    return {
      c: Skia.Point(def.cx, def.cy),
      r: def.r
    };
  }

  return { ...def,
    c: def.c ?? {
      x: 0,
      y: 0
    }
  };
};

exports.processCircle = processCircle;
//# sourceMappingURL=Circle.js.map