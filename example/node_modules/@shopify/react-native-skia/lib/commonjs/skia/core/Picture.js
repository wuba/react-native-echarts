"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPicture = void 0;

var _Skia = require("../Skia");

/**
 * Memoizes and returns an SkPicture that can be drawn to another canvas.
 * @param rect Picture bounds
 * @param cb Callback for drawing to the canvas
 * @returns SkPicture
 */
const createPicture = (rect, cb) => {
  const recorder = _Skia.Skia.PictureRecorder();

  const canvas = recorder.beginRecording(rect);
  cb(canvas);
  return recorder.finishRecordingAsPicture();
};

exports.createPicture = createPicture;
//# sourceMappingURL=Picture.js.map