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
  isGradient,
  isPattern,
  hasShadow,
  isRadialGradient,
  isLinearGradient,
} from 'zrender/lib/svg/helper';
import SkiaPathRebuilder from './SkiaPathRebuilder';
import { ReactElement } from 'react';
import mapStyleToAttrs from 'zrender/lib/svg/mapStyleToAttrs';
import {
  Skia,
  Path as SkiaPath,
  Shadow,
  useImage,
  Image,
  LinearGradient,
  RadialGradient,
  processTransform3d,
  Transforms3d,
  Matrix4,
  SkPath,
  SkiaProps,
  ImageProps,
  Paragraph,
  FontWeight,
  FontSlant,
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
  | SkPath
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
}

function getShadow(el: Displayable): ReactElement | undefined {
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
    return (
      <Shadow
        key={`s-${el.id}`}
        dx={offsetX / scaleX}
        dy={offsetY / scaleY}
        blur={stdDx}
        color={style.shadowColor}
      />
    );
  }
  return;
}

function convertSvgMatrixToMatrix4(svgMatrix: MatrixArray): Matrix4 {
  const [a, b, c, d, e, f] = svgMatrix as [
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  return [a, c, 0, e, b, d, 0, f, 0, 0, 1, 0, 0, 0, 0, 1];
}

function getTransform(m: MatrixArray): Transforms3d | undefined {
  if (m) {
    return [
      {
        matrix: convertSvgMatrixToMatrix4(m),
      },
    ];
  }
  return;
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
  __svgPathBuilder: SkiaPathRebuilder;
  __svgPathStrokePercent: number;
}

export function buildPath(
  el: Path,
  transform: Transforms3d | undefined
): SkPath {
  const style = el.style;
  const strokePercent = style.strokePercent as number;
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
  const __svgPathVersion = elExt.__svgPathVersion;
  let svgPathBuilder = elExt.__svgPathBuilder;
  if (
    elExt.__svgPathVersion !== pathVersion ||
    !svgPathBuilder ||
    strokePercent !== elExt.__svgPathStrokePercent
  ) {
    if (!svgPathBuilder) {
      svgPathBuilder = elExt.__svgPathBuilder = new SkiaPathRebuilder();
    }
    svgPathBuilder.reset();
    path.rebuildPath(svgPathBuilder, strokePercent);
    elExt.__svgPathVersion = pathVersion;
    elExt.__svgPathStrokePercent = strokePercent;
  }
  const p = svgPathBuilder.getPath();
  if (transform && !__svgPathVersion) {
    p?.transform(processTransform3d(transform));
  }
  return p;
}

export function brushSVGPath(
  el: Path,
  scope: BrushScope
): ReactElement | ReactElement[] | null {
  const style = el.style;
  const attrs: SVGVNodeAttrs = {};
  const transform = getTransform(el.transform);
  const p = buildPath(
    el,
    typeof attrs.fill === 'string' || typeof attrs.stroke === 'string'
      ? transform
      : undefined
  );
  attrs.path = p;
  setStyleAttrs(attrs, style, el, scope);
  const shadow = getShadow(el);
  let paths: ReactElement[] = [];
  if (attrs.fill && attrs.fill !== 'none') {
    const effects: ReactElement[] = [];
    if (shadow) effects.push(shadow);
    const fillEffect = typeof attrs.fill === 'string' ? null : attrs.fill;
    if (fillEffect) effects.push(fillEffect as ReactElement);
    paths.push(
      <SkiaPath
        opacity={(attrs['fill-opacity'] as number) ?? 1}
        key={`f-${el.id}`}
        path={p}
        color={typeof attrs.fill === 'string' ? attrs.fill : undefined}
        style="fill"
        transform={transform}
      >
        {effects}
      </SkiaPath>
    );
  }
  if (attrs.stroke && attrs['stroke-width'] !== 0) {
    const effects: ReactElement[] = [];
    if (shadow) effects.push(shadow);
    if (style.lineDash) {
      const [lineDash, lineDashOffset] = getLineDash(el);
      if (lineDash) p.dash(lineDash[0] || 0, lineDash[1] || 0, lineDashOffset);
    }
    const strokeColor =
      typeof attrs.stroke === 'string' ? attrs.stroke : undefined;
    if (!strokeColor) {
      effects.push(attrs.stroke as ReactElement);
    }
    paths.push(
      <SkiaPath
        opacity={(attrs['stroke-opacity'] as number) ?? 1}
        strokeMiter={attrs['stroke-miterlimit'] as number}
        strokeCap={attrs['stroke-linecap'] as any}
        strokeJoin={attrs['stroke-linejoin'] as any}
        strokeWidth={(attrs['stroke-width'] as number) ?? 1}
        transform={transform}
        key={`s-${el.id}`}
        path={p}
        color={strokeColor}
        style="stroke"
      >
        {effects}
      </SkiaPath>
    );
  }
  return style.strokeFirst ? paths.reverse() : paths;
}

export function brushSVGImage(
  el: ZRImage,
  scope: BrushScope
): ReactElement | null {
  const { style, id } = el;
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

  const attrs: SVGVNodeAttrs = {};

  const transform = getTransform(el.transform);
  setStyleAttrs(attrs, style, el, scope);
  const effects: ReactElement[] = [];
  const shadow = getShadow(el);
  if (shadow) effects.push(shadow);
  // setMetaData(attrs, el);
  // scope.animation && createCSSAnimation(el, attrs, scope);
  return (
    <SkiaImage
      image={null}
      key={id}
      href={image as string}
      transform={transform}
      x={x}
      y={y}
      width={dw}
      height={dh}
      {...attrs}
    >
      {effects}
    </SkiaImage>
  );
}
type CustomImageProps = SkiaProps<ImageProps> & {
  href: string;
  height?: number;
  width?: number;
  children?: ReactElement[];
};
function SkiaImage({ href, children, ...attrs }: CustomImageProps) {
  let skiaImage = useImage(href);
  // Base64 image
  if (href.indexOf(';base64') > -1) {
    const base64Data = href.split(',')[1] || '';
    const binaryData = Skia.Data.fromBase64(base64Data);
    skiaImage = Skia.Image.MakeImageFromEncoded(binaryData);
  }
  const imageInfo = skiaImage?.getImageInfo();
  if (imageInfo && !attrs.width) {
    const { height: oriHeight, width: oriWidth } = imageInfo;
    attrs.width = attrs.height ? (attrs.height / oriHeight) * oriWidth : 0;
  }
  // attrs.fit = 'fill'; // Here you can set 'Image' fit mode
  return (
    <Image {...attrs} image={skiaImage}>
      {children}
    </Image>
  );
}

const createFontSlant = (fontStyle: TSpanStyleProps['fontStyle']) => {
  switch (fontStyle) {
    case 'italic':
      return FontSlant.Italic;
    case 'oblique':
      return FontSlant.Oblique;
    default:
      return FontSlant.Upright;
  }
};

const createFontWeight = (fontWeight: TSpanStyleProps['fontWeight']) => {
  if (typeof fontWeight === 'string') {
    switch (fontWeight) {
      case 'normal':
        return FontWeight.Normal;
      case 'bold':
        return FontWeight.Bold;
      case 'bolder':
        return FontWeight.ExtraBold;
      case 'lighter':
        return FontWeight.Light;
      default:
        return parseInt(fontWeight, 10);
    }
  }
  return fontWeight;
};

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
  const attrs: SVGVNodeAttrs = {};
  const { id } = el;
  const transform = getTransform(el.transform);
  setStyleAttrs(attrs, el.style, el, scope);

  const para = Skia.ParagraphBuilder.Make({})
    .pushStyle({
      heightMultiplier: 1,
      fontFamilies: [fontFamily],
      fontSize:
        typeof fontSize === 'string' ? parseInt(fontSize, 10) : fontSize,
      color: typeof fill === 'string' ? Skia.Color(fill) : undefined,
      fontStyle: {
        weight: createFontWeight(fontWeight),
        slant: createFontSlant(fontStyle),
      },
    })
    .addText(text)
    .build();
  para.layout(Infinity);
  const textHeight = para.getHeight();
  const textWidth = para.getLongestLine();
  const adjustX =
    textAlign === 'center'
      ? -textWidth / 2
      : textAlign === 'start' || textAlign === 'left'
        ? 0
        : -textWidth;
  const adjustY =
    textBaseline === 'middle'
      ? -textHeight / 2
      : textBaseline === 'top'
        ? 0
        : -textHeight;
  if (attrs['fill-opacity'] !== undefined) {
    attrs.opacity = attrs['fill-opacity'];
  }
  return (
    <Paragraph
      key={id}
      {...attrs}
      transform={transform}
      paragraph={para}
      x={x + adjustX}
      y={y + adjustY}
      width={Math.ceil(textWidth)}
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
    let start = {
      x: val.x,
      y: val.y,
    };
    let end = {
      x: val.x2,
      y: val.y2,
    };
    if (!val.global) {
      const { width, height, x, y } = (attrs.path as SkPath)?.getBounds();
      start = {
        x: start.x * width + x,
        y: start.y * height + y,
      };
      end = {
        x: end.x * width + x,
        y: end.y * height + y,
      };
    }
    attrs[target] = (
      <LinearGradient
        key="lg"
        start={start}
        end={end}
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
export function getClipPath(clipPath: Path | undefined, scope: BrushScope) {
  if (!clipPath) {
    return;
  }
  const { clipPathCache } = scope;
  if (!clipPathCache[clipPath.id]) {
    const transform = getTransform(clipPath.transform);
    clipPathCache[clipPath.id] = buildPath(clipPath, transform);
  }
  return clipPathCache[clipPath.id];
}
