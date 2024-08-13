import Displayable from 'zrender/lib/graphic/Displayable';
import { BrushScope } from './core';
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from '../utils/font';
import Path, { PathStyleProps } from 'zrender/lib/graphic/Path';
import ZRImage, { ImageStyleProps } from 'zrender/lib/graphic/Image';
import TSpan, { TSpanStyleProps } from 'zrender/lib/graphic/TSpan';
import { MatrixArray } from 'zrender/lib/core/matrix';
import { GradientObject } from 'zrender/lib/graphic/Gradient';
import {
  isString,
  isFunction,
  logError,
  retrieve2,
} from 'zrender/lib/core/util';
import { getLineDash } from 'zrender/lib/canvas/dashStyle';
import {
  getPathPrecision,
  isGradient,
  isPattern,
  hasShadow,
  isRadialGradient,
  isLinearGradient,
  isAroundZero,
} from 'zrender/lib/svg/helper';
import SVGPathRebuilder from 'zrender/lib/svg/SVGPathRebuilder';
import { ReactElement } from 'react';
import mapStyleToAttrs from 'zrender/lib/svg/mapStyleToAttrs';
import {
  Path as SkiaPath,
  Text as SkiaText,
  DashPathEffect,
  matchFont,
  Shadow,
  useImage,
  Image,
  LinearGradient,
  RadialGradient,
  Skia,
  processTransform3d,
  SkPath,
} from '@shopify/react-native-skia';
import React from 'react';

function isImageLike(val: any): val is HTMLImageElement {
  return val && isString(val.src);
}
function isCanvasLike(val: any): val is HTMLCanvasElement {
  return val && isFunction(val.toDataURL);
}

type SVGVNodeAttrs = Record<
  string,
  | string
  | number
  | boolean
  | Record<string, string | number | boolean>
  | ReactElement
>;

type AllStyleOption = PathStyleProps | TSpanStyleProps | ImageStyleProps;

function setStyleAttrs(
  attrs: SVGVNodeAttrs,
  style: AllStyleOption,
  el: Path | TSpan | ZRImage,
  scope: BrushScope
) {
  mapStyleToAttrs(
    (key, val) => {
      const isFillStroke = key === 'fill' || key === 'stroke';
      if (isFillStroke && isGradient(val)) {
        setGradient(style, attrs, key);
      } else if (isFillStroke && isPattern(val)) {
        // setPattern(el, attrs, key, scope);
      } else {
        attrs[key] = val;
      }
      if (isFillStroke && scope.ssr && val === 'none') {
        // When is none, it cannot be interacted when ssr
        // Setting `pointer-events` as `visible` to make it responding
        // See also https://www.w3.org/TR/SVG/interact.html#PointerEventsProperty
        attrs['pointer-events'] = 'visible';
      }
    },
    style,
    el,
    false
  );

  setShadow(el, attrs);
}

function setShadow(el: Displayable, attrs: SVGVNodeAttrs) {
  const style = el.style;
  if (hasShadow(style)) {
    const globalScale = el.getGlobalScale();
    const scaleX = globalScale[0];
    const scaleY = globalScale[1];
    if (!scaleX || !scaleY) {
      return;
    }

    const offsetX = style.shadowOffsetX || 0;
    const offsetY = style.shadowOffsetY || 0;
    const blur = style.shadowBlur;
    const stdDx = blur / 2 / scaleX;
    attrs.filter = {
      dx: offsetX / scaleX,
      dy: offsetY / scaleY,
      blur: stdDx,
      color: style.shadowColor,
    };
  }
}

function noRotateScale(m: MatrixArray) {
  return (
    isAroundZero(m[0] - 1) &&
    isAroundZero(m[1]) &&
    isAroundZero(m[2]) &&
    isAroundZero(m[3] - 1)
  );
}

function noTranslate(m: MatrixArray) {
  return isAroundZero(m[4]) && isAroundZero(m[5]);
}

function convertSvgMatrixToMatrix4(svgMatrix: MatrixArray) {
  const [a, b, c, d, e, f] = svgMatrix;
  return [a, c, 0, e, b, d, 0, f, 0, 0, 1, 0, 0, 0, 0, 1];
}

function setTransform(attrs: SVGVNodeAttrs, m: MatrixArray) {
  if (m && !(noTranslate(m) && noRotateScale(m))) {
    // Use translate possible to reduce the size a bit.
    attrs.transform = noRotateScale(m)
      ? [
          {
            translate: [m[4], m[5]],
          },
        ]
      : [
          {
            matrix: convertSvgMatrixToMatrix4(m),
          },
        ];
  }
}

export function brush(
  el: Displayable,
  scope: BrushScope
): ReactElement | ReactElement[] | null {
  if (el instanceof Path) {
    return brushSVGPath(el, scope);
  } else if (el instanceof ZRImage) {
    return brushSVGImage(el, scope);
  } else if (el instanceof TSpan) {
    return brushSVGTSpan(el, scope);
  }
  return null;
}

interface PathWithSVGBuildPath extends Path {
  __svgPathVersion: number;
  __svgPathBuilder: SVGPathRebuilder;
  __svgPathStrokePercent: number;
}

export function brushSVGPath(
  el: Path,
  scope: BrushScope,
  returnString = false
): ReactElement | ReactElement[] | null | SkPath {
  const style = el.style;
  const attrs: Record<string, string | number | boolean> = {};
  const strokePercent = el.style.strokePercent as number;
  const precision = (scope.compress && getPathPrecision(el)) || 4;

  const needBuildPath = !el.path || el.shapeChanged();
  if (!el.path) {
    el.createPathProxy();
  }
  const path = el.path;

  if (needBuildPath) {
    path.beginPath();
    el.buildPath(path, el.shape);
    el.pathUpdated();
  }
  const pathVersion = path.getVersion();
  const elExt = el as PathWithSVGBuildPath;

  let svgPathBuilder = elExt.__svgPathBuilder;
  if (
    elExt.__svgPathVersion !== pathVersion ||
    !svgPathBuilder ||
    strokePercent !== elExt.__svgPathStrokePercent
  ) {
    if (!svgPathBuilder) {
      svgPathBuilder = elExt.__svgPathBuilder = new SVGPathRebuilder();
    }
    svgPathBuilder.reset(precision);
    path.rebuildPath(svgPathBuilder, strokePercent);
    svgPathBuilder.generateStr();
    elExt.__svgPathVersion = pathVersion;
    elExt.__svgPathStrokePercent = strokePercent;
  }

  const d = svgPathBuilder.getStr();
  const p = Skia.Path.MakeFromSVGString(d);
  setTransform(attrs, el.transform);

  if (attrs.transform && (typeof attrs.fill === 'string' || returnString)) {
    p?.transform(processTransform3d(attrs.transform));
    attrs.transform = undefined;
  }
  if (returnString) {
    return p;
  }

  setStyleAttrs(attrs, style, el, scope);
  let paths: ReactElement[] = [];
  if (attrs.fill && attrs.fill !== 'none') {
    let effects: ReactElement[] = [];
    if (attrs.filter) {
      effects.push(<Shadow key={`d-${el.id}`} {...attrs.filter} />);
    }
    if (attrs['fill-opacity'] !== undefined) {
      attrs.opacity = attrs['fill-opacity'];
    }
    if (typeof attrs.fill === 'string') {
      paths.push(
        <SkiaPath
          {...attrs}
          key={`f-${el.id}`}
          path={p}
          color={attrs.fill}
          style="fill"
        >
          {effects}
        </SkiaPath>
      );
    } else {
      effects.push(attrs.fill);
      paths.push(
        <SkiaPath {...attrs} key={`f-${el.id}`} path={p} style="fill">
          {effects}
        </SkiaPath>
      );
    }
  }
  if (attrs.stroke) {
    let effects: ReactElement[] = [];
    if (attrs['stroke-width']) {
      attrs.strokeWidth = attrs['stroke-width'];
    }
    if (attrs['stroke-linecap']) {
      attrs.strokeCap = attrs['stroke-linecap'];
    }
    if (attrs['stroke-linejoin']) {
      attrs.strokeJoin = attrs['stroke-linejoin'];
    }
    if (attrs['stroke-miterlimit']) {
      attrs.strokeMiter = attrs['stroke-miterlimit'];
    }
    if (attrs['stroke-opacity'] !== undefined) {
      attrs.opacity = attrs['stroke-opacity'];
    }
    if (!attrs.strokeWidth) {
      attrs.strokeWidth = 1;
    }
    if (style.lineDash) {
      let [lineDash, lineDashOffset] = getLineDash(el);
      if (lineDash) {
        effects.push(
          <DashPathEffect
            key="stroke-dasharray"
            intervals={lineDash}
            phase={lineDashOffset}
          />
        );
      }
    }
    paths.push(
      <SkiaPath
        {...attrs}
        key={`s-${el.id}`}
        path={p}
        color={attrs.stroke}
        style={'stroke'}
      >
        {effects}
      </SkiaPath>
    );
  }

  return paths;
}

export function brushSVGImage(
  el: ZRImage,
  scope: BrushScope
): ReactElement | null {
  const { style, id, transform } = el;
  let image = style.image;

  if (image && !isString(image)) {
    if (isImageLike(image)) {
      image = image.src;
    }
    // heatmap layer in geo may be a canvas
    else if (isCanvasLike(image)) {
      image = image.toDataURL();
    }
  }

  if (!image) {
    return null;
  }

  const x = style.x || 0;
  const y = style.y || 0;

  const dw = style.width || 0;
  const dh = style.height || 0;

  const attrs: SVGVNodeAttrs = {
    width: dw,
    height: dh,
  };
  if (x) {
    attrs.x = x;
  }
  if (y) {
    attrs.y = y;
  }

  setTransform(attrs, transform);
  setStyleAttrs(attrs, style, el, scope);
  // setMetaData(attrs, el);
  // scope.animation && createCSSAnimation(el, attrs, scope);
  return <SkiaImage key={id} image={image} {...attrs} />;
}

function SkiaImage({ image, ...attrs }) {
  const href = useImage(image);
  return <Image image={href} {...attrs} />;
}

export function brushSVGTSpan(
  el: TSpan,
  scope: BrushScope
): ReactElement | null {
  const {
    x = 0,
    y = 0,
    fontFamily = DEFAULT_FONT_FAMILY,
    fontSize = DEFAULT_FONT_SIZE,
    fontStyle = 'normal',
    fontWeight = 'normal',
    text,
    fill,
    textAlign,
    textBaseline,
  } = el.style;
  if (!text) return null;
  const font = matchFont({
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
  });
  const attrs: SVGVNodeAttrs = {};
  const { id } = el;
  setTransform(attrs, el.transform);
  setStyleAttrs(attrs, el.style, el, scope);
  const { width: textWidth, height: textHeigh } = font.measureText(text);
  const adjustX =
    textAlign === 'center'
      ? textWidth / 2
      : textAlign === 'start' || textAlign === 'left'
        ? 0
        : textWidth;
  const adjustY =
    textBaseline === 'middle'
      ? textHeigh / 2
      : textBaseline === 'bottom'
        ? textHeigh
        : 0;
  if (attrs['fill-opacity'] !== undefined) {
    attrs.opacity = attrs['fill-opacity'];
  }
  return (
    <SkiaText
      {...attrs}
      key={id}
      x={x - adjustX}
      y={y + adjustY}
      text={text}
      font={font}
      color={fill}
    />
  );
}

export function setGradient(
  style: PathStyleProps,
  attrs: SVGVNodeAttrs,
  target: 'fill' | 'stroke'
) {
  const val = style[target] as GradientObject;
  const colors = val.colorStops.map((c) => c.color);
  const positions = val.colorStops.map((c) => c.offset);
  if (isLinearGradient(val)) {
    attrs[target] = (
      <LinearGradient
        key="lg"
        start={{
          x: val.x,
          y: val.y,
        }}
        end={{
          x: val.x2 * 100,
          y: val.y2 * 100,
        }}
        colors={colors}
        positions={positions}
      />
    );
  } else if (isRadialGradient(val)) {
    attrs[target] = (
      <RadialGradient
        key="rg"
        c={{
          x: retrieve2(val.x, 0.5),
          y: retrieve2(val.y, 0.5),
        }}
        r={retrieve2(val.r, 0.5)}
        colors={colors}
        positions={positions}
      />
    );
  } else {
    if (process.env.NODE_ENV !== 'production') {
      logError('Illegal gradient type.');
    }
    return;
  }
}
export function setClipPath(
  clipPath: Path,
  attrs: SVGVNodeAttrs,
  scope: BrushScope
) {
  const { clipPathCache, defs } = scope;
  let clipPathId = clipPathCache[clipPath.id];
  if (!clipPathId) {
    clipPathId = scope.zrId + '-c' + scope.clipPathIdx++;
    clipPathCache[clipPath.id] = clipPathId;
    defs[clipPathId] = brushSVGPath(clipPath, scope, true);
  }
  attrs['clip-path'] = defs[clipPathId];
}
