"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformOrigin = exports.processGradientProps = exports.getRect = void 0;

var _types = require("../../../skia/types");

var _Enum = require("./Enum");

var _Transform = require("./Transform");

const transformOrigin = (origin, transform) => [{
  translateX: origin.x
}, {
  translateY: origin.y
}, ...transform, {
  translateX: -origin.x
}, {
  translateY: -origin.y
}];

exports.transformOrigin = transformOrigin;

const processGradientProps = (Skia, _ref) => {
  let {
    colors,
    positions,
    mode,
    flags,
    ...transform
  } = _ref;
  const localMatrix = Skia.Matrix();
  (0, _Transform.processTransformProps)(localMatrix, transform);
  return {
    colors: colors.map(color => Skia.Color(color)),
    positions: positions ?? null,
    mode: _types.TileMode[(0, _Enum.enumKey)(mode ?? "clamp")],
    flags,
    localMatrix
  };
};

exports.processGradientProps = processGradientProps;

const getRect = (Skia, props) => {
  const {
    x,
    y,
    width,
    height
  } = props;

  if (props.rect) {
    return props.rect;
  } else if (x !== undefined && y !== undefined && width !== undefined && height !== undefined) {
    return Skia.XYWHRect(x, y, width, height);
  } else {
    return undefined;
  }
};

exports.getRect = getRect;
//# sourceMappingURL=Gradient.js.map