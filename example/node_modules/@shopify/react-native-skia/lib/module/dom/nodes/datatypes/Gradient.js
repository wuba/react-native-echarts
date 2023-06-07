import { TileMode } from "../../../skia/types";
import { enumKey } from "./Enum";
import { processTransformProps } from "./Transform";
export const transformOrigin = (origin, transform) => [{
  translateX: origin.x
}, {
  translateY: origin.y
}, ...transform, {
  translateX: -origin.x
}, {
  translateY: -origin.y
}];
export const processGradientProps = (Skia, _ref) => {
  let {
    colors,
    positions,
    mode,
    flags,
    ...transform
  } = _ref;
  const localMatrix = Skia.Matrix();
  processTransformProps(localMatrix, transform);
  return {
    colors: colors.map(color => Skia.Color(color)),
    positions: positions !== null && positions !== void 0 ? positions : null,
    mode: TileMode[enumKey(mode !== null && mode !== void 0 ? mode : "clamp")],
    flags,
    localMatrix
  };
};
export const getRect = (Skia, props) => {
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
//# sourceMappingURL=Gradient.js.map