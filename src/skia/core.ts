export type CSSSelectorVNode = Record<string, string>;
export type CSSAnimationVNode = Record<string, Record<string, string>>;
import type { SkPath } from '@shopify/react-native-skia';
export type SVGVNodeAttrs = Record<
  string,
  string | number | undefined | boolean
>;
export interface SVGVNode {
  tag: string;
  attrs: SVGVNodeAttrs;
  children?: SVGVNode[];
  text?: string;

  // For patching
  elm?: Node;
  key: string;
}
export interface BrushScope {
  zrId: string;

  shadowCache: Record<string, string>;
  gradientCache: Record<string, string>;
  patternCache: Record<string, string>;
  clipPathCache: Record<string, SkPath>;

  defs: Record<string, SVGVNode>;

  cssNodes: Record<string, CSSSelectorVNode>;
  cssAnims: Record<string, Record<string, Record<string, string>>>;
  /**
   * Cache for css style string, mapping from style string to class name.
   */
  cssStyleCache: Record<string, string>;

  cssAnimIdx: number;

  shadowIdx: number;
  gradientIdx: number;
  patternIdx: number;
  clipPathIdx: number;
  // configs
  /**
   * If create animates nodes.
   */
  animation?: boolean;
  /**
   * If create emphasis styles.
   */
  emphasis?: boolean;

  /**
   * If will update. Some optimization for string generation can't be applied.
   */
  willUpdate?: boolean;

  /**
   * If compress the output string.
   */
  compress?: boolean;

  ssr?: boolean;
}

export function createBrushScope(zrId: string): BrushScope {
  return {
    zrId,
    shadowCache: {},
    patternCache: {},
    gradientCache: {},
    clipPathCache: {},
    defs: {},

    cssNodes: {},
    cssAnims: {},
    cssStyleCache: {},

    cssAnimIdx: 0,

    shadowIdx: 0,
    gradientIdx: 0,
    patternIdx: 0,
    clipPathIdx: 0,
  };
}
