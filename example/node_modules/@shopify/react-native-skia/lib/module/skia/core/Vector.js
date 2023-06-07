import { Skia } from "../Skia";
export const vec = function () {
  let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let y = arguments.length > 1 ? arguments[1] : undefined;
  return Skia.Point(x, y !== null && y !== void 0 ? y : x);
};
export const point = vec;
export const neg = a => vec(-a.x, -a.y);
export const add = (a, b) => vec(a.x + b.x, a.y + b.y);
export const sub = (a, b) => vec(a.x - b.x, a.y - b.y);
export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const translate = _ref => {
  let {
    x,
    y
  } = _ref;
  return [{
    translateX: x
  }, {
    translateY: y
  }];
};
//# sourceMappingURL=Vector.js.map