import SVGPainter from 'zrender/lib/svg/Painter.js';
export function SVGRenderer(registers: any) {
  registers.registerPainter('svg', SVGPainter);
}
