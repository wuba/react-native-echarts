"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polar2Cartesian = exports.polar2Canvas = exports.cartesian2Polar = exports.cartesian2Canvas = exports.canvas2Polar = exports.canvas2Cartesian = void 0;

const canvas2Cartesian = (v, center) => ({
  x: v.x - center.x,
  y: -1 * (v.y - center.y)
});

exports.canvas2Cartesian = canvas2Cartesian;

const cartesian2Canvas = (v, center) => ({
  x: v.x + center.x,
  y: -1 * v.y + center.y
});

exports.cartesian2Canvas = cartesian2Canvas;

const cartesian2Polar = v => ({
  theta: Math.atan2(v.y, v.x),
  radius: Math.sqrt(v.x ** 2 + v.y ** 2)
});

exports.cartesian2Polar = cartesian2Polar;

const polar2Cartesian = p => ({
  x: p.radius * Math.cos(p.theta),
  y: p.radius * Math.sin(p.theta)
});

exports.polar2Cartesian = polar2Cartesian;

const polar2Canvas = (p, center) => cartesian2Canvas(polar2Cartesian(p), center);

exports.polar2Canvas = polar2Canvas;

const canvas2Polar = (v, center) => cartesian2Polar(canvas2Cartesian(v, center));

exports.canvas2Polar = canvas2Polar;
//# sourceMappingURL=Coordinates.js.map