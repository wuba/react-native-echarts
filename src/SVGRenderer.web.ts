import SVGPainter from 'zrender/lib/svg/Painter';
export function SVGRenderer(registers: any) {
  registers.registerPainter('svg', SVGPainter);
}
