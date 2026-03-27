const { TestEnvironment } = require('jest-environment-node');
const CanvasKitInit = require('canvaskit-wasm/bin/full/canvaskit');

let canvasKitPromise;

module.exports = class SkiaEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    canvasKitPromise ??= CanvasKitInit({});
    const canvasKit = await canvasKitPromise;
    this.global.CanvasKit = canvasKit;
    global.CanvasKit = canvasKit;
  }
};
