import SVGPainter from 'zrender/lib/svg/Painter';
export function SkiaRender(registers: any) {
  registers.registerPainter('skia', SVGPainter);
}
