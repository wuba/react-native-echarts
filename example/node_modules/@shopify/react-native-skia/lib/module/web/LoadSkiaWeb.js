// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CanvasKitInit from "canvaskit-wasm/bin/full/canvaskit";
export const LoadSkiaWeb = async opts => {
  if (global.CanvasKit !== undefined) {
    return;
  }

  const CanvasKit = await CanvasKitInit(opts); // The CanvasKit API is stored on the global object and used
  // to create the JsiSKApi in the Skia.web.ts file.

  global.CanvasKit = CanvasKit;
}; // We keep this function for backward compatibility

export const LoadSkia = LoadSkiaWeb;
//# sourceMappingURL=LoadSkiaWeb.js.map