import { Skia } from "../Skia";

/**
 * Memoizes and returns an SkPicture that can be drawn to another canvas.
 * @param rect Picture bounds
 * @param cb Callback for drawing to the canvas
 * @returns SkPicture
 */
export const createPicture = (rect, cb) => {
  const recorder = Skia.PictureRecorder();
  const canvas = recorder.beginRecording(rect);
  cb(canvas);
  return recorder.finishRecordingAsPicture();
};
//# sourceMappingURL=Picture.js.map