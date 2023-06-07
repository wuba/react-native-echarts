import { processTransform } from "../../../skia/types";
export const processTransformProps = (m3, props) => {
  const {
    transform,
    origin,
    matrix
  } = props;

  if (matrix) {
    if (origin) {
      m3.translate(origin.x, origin.y);
      m3.concat(matrix);
      m3.translate(-origin.x, -origin.y);
    } else {
      m3.concat(matrix);
    }
  } else if (transform) {
    if (origin) {
      m3.translate(origin.x, origin.y);
    }

    processTransform(m3, transform);

    if (origin) {
      m3.translate(-origin.x, -origin.y);
    }
  }
};
//# sourceMappingURL=Transform.js.map