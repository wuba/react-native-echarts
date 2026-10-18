import type { ReactElement } from 'react';
import type { SkPath } from '@shopify/react-native-skia';
import Rect from 'zrender/lib/graphic/shape/Rect.js';
import { brushSVGPath, buildPath } from '../skia/graphic';
import { createBrushScope } from '../skia/core';

function createRect() {
  return new Rect({
    shape: { x: 1, y: 2, width: 30, height: 20 },
    style: { fill: 'red', stroke: 'blue', lineWidth: 2 },
  });
}

describe('Skia path rendering', () => {
  it('reuses geometry while applying the current clip transform', () => {
    const rect = createRect();
    for (const x of [10, 10, 20]) {
      expect(buildPath(rect, [{ translateX: x }]).getBounds()).toMatchObject({
        x: 1 + x,
        y: 2,
        width: 30,
        height: 20,
      });
    }
    expect(buildPath(rect, undefined).getBounds()).toMatchObject({
      x: 1,
      y: 2,
    });
    rect.setShape({ width: 40 });
    expect(buildPath(rect, [{ translateX: 10 }]).getBounds()).toMatchObject({
      x: 11,
      y: 2,
      width: 40,
      height: 20,
    });
  });

  it('keeps filled, dashed and subsequent solid paths independent', () => {
    const rect = createRect();
    const original = buildPath(rect, undefined).toSVGString();
    rect.setStyle({ lineDash: [5, 3], lineDashOffset: 0.5 });
    const render = () =>
      brushSVGPath(rect, createBrushScope('test')) as ReactElement<{
        path: SkPath;
      }>[];
    const first = render();
    expect(first).toHaveLength(2);
    expect(first[0]!.props.path.toSVGString()).toBe(original);
    expect(first[1]!.props.path.toSVGString()).not.toBe(original);
    const second = render();
    expect(second[0]!.props.path.toSVGString()).toBe(original);
    expect(second[1]!.props.path.toSVGString()).toBe(
      first[1]!.props.path.toSVGString()
    );
    rect.setStyle({ lineDash: false });
    const solid = render();
    expect(solid[0]!.props.path.toSVGString()).toBe(original);
    expect(solid[1]!.props.path.toSVGString()).toBe(original);
  });
});
