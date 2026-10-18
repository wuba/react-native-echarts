import { Skia } from '@shopify/react-native-skia';
import type { SkPath } from '@shopify/react-native-skia';

const EPSILON = 1e-4;
export function isAroundZero(transform: number) {
  return transform < EPSILON && transform > -EPSILON;
}

export function dashPath(
  path: SkPath,
  on: number,
  off: number,
  phase: number
): SkPath {
  const factory = Skia.Path as typeof Skia.Path & {
    Dash?(path: SkPath, on: number, off: number, phase: number): SkPath | null;
  };
  if (factory.Dash) {
    return factory.Dash(path, on, off, phase) ?? path;
  }

  // Legacy dash() mutates the path. Keep the fill and cached geometry intact.
  const dashedPath = path.copy() as SkPath & {
    dash(on: number, off: number, phase: number): boolean;
  };
  return dashedPath.dash(on, off, phase) ? dashedPath : path;
}
