import { SkiaPainter } from './painter';

export function SkiaRenderer(registers: any) {
  registers.registerPainter('skia', SkiaPainter);
}
