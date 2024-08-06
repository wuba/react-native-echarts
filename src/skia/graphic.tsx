import Displayable from 'zrender/lib/graphic/Displayable';
import { BrushScope } from './core';
import Path, { PathStyleProps } from 'zrender/lib/graphic/Path';
import ZRImage, { ImageStyleProps } from 'zrender/lib/graphic/Image';
import TSpan, { TSpanStyleProps } from 'zrender/lib/graphic/TSpan';
import { MatrixArray } from 'zrender/lib/core/matrix';
import {
  getPathPrecision,
  isGradient,
  isPattern,
  round3,
  round4,
  isAroundZero,
} from 'zrender/lib/svg/helper';
import SVGPathRebuilder from 'zrender/lib/svg/SVGPathRebuilder';
import { ReactElement } from 'react';
import mapStyleToAttrs from 'zrender/lib/svg/mapStyleToAttrs';
import {
  Path as SkiaPath,
  Text as SkiaText,
  matchFont,
} from '@shopify/react-native-skia';
import React from 'react';

const round = Math.round;

type SVGVNodeAttrs = Record<string, string | number | boolean>;

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
        // setGradient(style, attrs, key, scope);
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

  // setShadow(el, attrs, scope);
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

function setTransform(
  attrs: SVGVNodeAttrs,
  m: MatrixArray,
  compress?: boolean
) {
  if (m && !(noTranslate(m) && noRotateScale(m))) {
    const mul = compress ? 10 : 1e4;
    // Use translate possible to reduce the size a bit.
    attrs.transform = noRotateScale(m)
      ? [
          {
            translate: [round(m[4] * mul) / mul, round(m[5] * mul) / mul],
          },
        ]
      : [
          {
            translateX: round4(m[4]),
          },
          {
            translateY: round4(m[5]),
          },
          {
            scaleX: round3(m[0]),
          },
          {
            scaleY: round3(m[3]),
          },
          {
            skewX: round3(m[1]),
          },
          {
            skewY: round3(m[2]),
          },
        ];
  }
}

export function brush(el: Displayable, scope: BrushScope): ReactElement | null {
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

export function brushSVGPath(el: Path, scope: BrushScope): ReactElement | null {
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

  setTransform(attrs, el.transform);
  setStyleAttrs(attrs, style, el, scope);

  const pathColor = attrs.fill === 'none' ? attrs.stroke : attrs.fill;
  const pathStyle = attrs.fill === 'none' ? 'stroke' : 'fill';
  if (attrs.stroke) {
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
    if (!attrs.strokeWidth) {
      attrs.strokeWidth = 1;
    }
  }

  // @ts-ignore
  return (
    <SkiaPath
      {...attrs}
      key={el.id}
      path={d}
      color={pathColor}
      style={pathStyle}
    />
  );
}

export function brushSVGImage(
  el: ZRImage,
  scope: BrushScope
): ReactElement | null {
  return null;
}

export function brushSVGTSpan(
  el: TSpan,
  scope: BrushScope
): ReactElement | null {
  const {
    x,
    y,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    text,
    fill,
    textAlign,
  } = el.style;
  const font = matchFont({
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
  });
  const attrs: SVGVNodeAttrs = {};
  const { id } = el;
  setTransform(attrs, el.transform);
  const textWidth = font.measureText(text).width;
  const adjustX =
    textAlign === 'center'
      ? textWidth / 2
      : textAlign === 'start' || textAlign === 'left'
        ? 0
        : textWidth;
  return (
    <SkiaText
      {...attrs}
      key={id}
      x={x - adjustX}
      y={y}
      text={text}
      font={font}
      color={fill}
      textAlign={textAlign}
    />
  );
}