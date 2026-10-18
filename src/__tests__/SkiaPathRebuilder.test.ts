import { Skia, processTransform3d } from '@shopify/react-native-skia';
import type { SkPath } from '@shopify/react-native-skia';
import SkiaPathRebuilder from '../skia/SkiaPathRebuilder';
import { dashPath } from '../skia/helper';

function createMutablePath() {
  return {
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    cubicTo: jest.fn(),
    quadTo: jest.fn(),
    addOval: jest.fn(),
    arcToRotated: jest.fn(),
    addRect: jest.fn(),
    close: jest.fn(),
    reset: jest.fn(),
    transform: jest.fn(),
  };
}

const originalPathBuilder = Object.getOwnPropertyDescriptor(
  Skia,
  'PathBuilder'
);
const originalDash = Object.getOwnPropertyDescriptor(Skia.Path, 'Dash');

afterEach(() => {
  jest.restoreAllMocks();
  if (originalPathBuilder) {
    Object.defineProperty(Skia, 'PathBuilder', originalPathBuilder);
  } else {
    Reflect.deleteProperty(Skia, 'PathBuilder');
  }
  if (originalDash) {
    Object.defineProperty(Skia.Path, 'Dash', originalDash);
  } else {
    Reflect.deleteProperty(Skia.Path, 'Dash');
  }
});

describe.each(['legacy', 'builder'] as const)('%s path API', (api) => {
  function setup() {
    const mutable = createMutablePath();
    const transformed = createMutablePath();
    const transformedPath = { name: 'transformed path' } as unknown as SkPath;
    const snapshot = { name: 'immutable path' } as unknown as SkPath;
    const build = jest.fn(() => snapshot);
    const rewind = jest.fn();
    const copy = jest.fn(() => transformed);
    const legacy = { ...mutable, rewind, copy };
    const factory = {
      Make: jest.fn(() => ({ ...mutable, build })),
      MakeFromPath: jest.fn(() => ({
        ...transformed,
        build: jest.fn(() => transformedPath),
      })),
    };
    Object.defineProperty(Skia, 'PathBuilder', {
      configurable: true,
      value: api === 'builder' ? factory : undefined,
    });
    const make = jest
      .spyOn(Skia.Path, 'Make')
      .mockReturnValue(legacy as unknown as SkPath);
    const rebuilder = new SkiaPathRebuilder();
    return {
      rebuilder,
      mutable,
      legacy,
      snapshot,
      transformed,
      transformedPath,
      make,
      factory,
      build,
      rewind,
      copy,
    };
  }

  it('selects the available factory and returns a drawable path repeatedly', () => {
    const { rebuilder, make, factory, snapshot, legacy, build } = setup();
    const expected = api === 'builder' ? snapshot : legacy;
    expect(rebuilder.getPath()).toBe(expected);
    expect(rebuilder.getPath()).toBe(expected);
    expect(make).toHaveBeenCalledTimes(api === 'legacy' ? 1 : 0);
    expect(factory.Make).toHaveBeenCalledTimes(api === 'builder' ? 1 : 0);
    expect(build).toHaveBeenCalledTimes(api === 'builder' ? 2 : 0);
  });

  it('forwards lines, curves, rectangles and closing commands', () => {
    const { rebuilder, mutable } = setup();
    rebuilder.moveTo(1, 2);
    rebuilder.lineTo(3, 4);
    rebuilder.bezierCurveTo(5, 6, 7, 8, 9, 10);
    rebuilder.quadraticCurveTo(11, 12, 13, 14);
    rebuilder.rect(15, 16, 17, 18);
    rebuilder.closePath();
    expect(mutable.moveTo).toHaveBeenCalledWith(1, 2);
    expect(mutable.lineTo).toHaveBeenCalledWith(3, 4);
    expect(mutable.cubicTo).toHaveBeenCalledWith(5, 6, 7, 8, 9, 10);
    expect(mutable.quadTo).toHaveBeenCalledWith(11, 12, 13, 14);
    expect(mutable.addRect).toHaveBeenCalledWith({
      x: 15,
      y: 16,
      width: 17,
      height: 18,
    });
    expect(mutable.close).toHaveBeenCalledTimes(1);
  });

  it('forwards complete circles and rotated partial ellipses', () => {
    const { rebuilder, mutable } = setup();
    rebuilder.arc(10, 20, 5, 0, Math.PI * 2, false);
    rebuilder.ellipse(10, 20, 5, 3, Math.PI / 4, 0, Math.PI, true);
    expect(mutable.addOval).toHaveBeenCalledWith(
      { x: 5, y: 15, width: 10, height: 10 },
      false
    );
    expect(mutable.arcToRotated).toHaveBeenCalledWith(
      5,
      3,
      45,
      true,
      true,
      5,
      20
    );
  });

  it('resets and falls back to reset when rewind is unavailable', () => {
    const { rebuilder, mutable, rewind } = setup();
    rebuilder.reset();
    rebuilder.rewind();
    expect(mutable.reset).toHaveBeenCalledTimes(api === 'builder' ? 2 : 1);
    expect(rewind).toHaveBeenCalledTimes(api === 'legacy' ? 1 : 0);
  });

  it('transforms a copy without mutating cached local coordinates', () => {
    const { rebuilder, mutable, transformed, transformedPath, copy, factory } =
      setup();
    const matrix = processTransform3d([{ translateX: 10 }]);
    const result = rebuilder.getPath(matrix);
    expect(mutable.transform).not.toHaveBeenCalled();
    expect(transformed.transform).toHaveBeenCalledWith(matrix);
    expect(copy).toHaveBeenCalledTimes(api === 'legacy' ? 1 : 0);
    expect(factory.MakeFromPath).toHaveBeenCalledTimes(
      api === 'builder' ? 1 : 0
    );
    expect(result).toBe(api === 'builder' ? transformedPath : transformed);
  });
});

describe('installed Skia path implementation', () => {
  it('retains geometry across reads and supports subsequent drawing', () => {
    const rebuilder = new SkiaPathRebuilder();
    rebuilder.moveTo(1, 2);
    rebuilder.lineTo(10, 20);
    const first = rebuilder.getPath().toSVGString();
    expect(rebuilder.getPath().toSVGString()).toBe(first);
    rebuilder.lineTo(30, 40);
    const lastPoint = rebuilder.getPath().getLastPt();
    expect(lastPoint.x).toBe(30);
    expect(lastPoint.y).toBe(40);
    expect(rebuilder.getPath().toSVGString()).not.toBe(first);
  });

  it.each(['reset', 'rewind'] as const)(
    'clears and reuses paths with %s',
    (method) => {
      const rebuilder = new SkiaPathRebuilder();
      rebuilder.rect(1, 2, 3, 4);
      expect(rebuilder.getPath().isEmpty()).toBe(false);
      rebuilder[method]();
      expect(rebuilder.getPath().isEmpty()).toBe(true);
      rebuilder.rect(5, 6, 7, 8);
      expect(rebuilder.getPath().getBounds()).toMatchObject({
        x: 5,
        y: 6,
        width: 7,
        height: 8,
      });
    }
  );

  it('applies transforms without accumulating them or changing the source', () => {
    const rebuilder = new SkiaPathRebuilder();
    rebuilder.rect(1, 2, 3, 4);
    const matrix = processTransform3d([{ translateX: 10 }, { translateY: 20 }]);
    for (let i = 0; i < 2; i++) {
      expect(rebuilder.getPath(matrix).getBounds()).toMatchObject({
        x: 11,
        y: 22,
        width: 3,
        height: 4,
      });
    }
    expect(rebuilder.getPath().getBounds()).toMatchObject({ x: 1, y: 2 });
  });

  it('dashes a copy while retaining fractional offsets and the original fill', () => {
    const rebuilder = new SkiaPathRebuilder();
    rebuilder.rect(0, 0, 30, 20);
    const path = rebuilder.getPath();
    const original = path.toSVGString();
    const dashed = dashPath(path, 5, 3, 0.5);
    expect(dashed.toSVGString()).not.toBe(original);
    expect(path.toSVGString()).toBe(original);
    expect(dashPath(path, 5, 3, 0.5).toSVGString()).toBe(dashed.toSVGString());
    expect(dashPath(path, 5, 3, 0).toSVGString()).not.toBe(
      dashed.toSVGString()
    );
  });
});

describe('dash API compatibility', () => {
  it.each([true, false])('uses static Dash with success=%s', (success) => {
    const path = {} as SkPath;
    const result = {} as SkPath;
    const dash = jest.fn(() => (success ? result : null));
    Object.defineProperty(Skia.Path, 'Dash', {
      configurable: true,
      value: dash,
    });
    expect(dashPath(path, 2, 3, 0.5)).toBe(success ? result : path);
    expect(dash).toHaveBeenCalledWith(path, 2, 3, 0.5);
  });

  it.each([true, false])('uses a legacy copy with success=%s', (success) => {
    Object.defineProperty(Skia.Path, 'Dash', {
      configurable: true,
      value: undefined,
    });
    const copy = { dash: jest.fn(() => success) };
    const path = { copy: jest.fn(() => copy) } as unknown as SkPath;
    expect(dashPath(path, 2, 3, 0.5)).toBe(success ? copy : path);
    expect(copy.dash).toHaveBeenCalledWith(2, 3, 0.5);
  });
});
