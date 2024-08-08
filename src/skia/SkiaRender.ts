import { SkiaPainter } from './painter';

export function SkiaRender(registers: any) {
  registers.registerPainter('skia', SkiaPainter);
}
