import SVGPainter from 'zrender/lib/svg/Painter';
export function SkiaRenderer(registers: any) {
  registers.registerPainter('skia', SVGPainter);
}
