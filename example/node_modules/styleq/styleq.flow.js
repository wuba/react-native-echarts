/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export type CompiledStyle = {
  $$css: true,
  [key: string]: string,
};

export type InlineStyle = {
  $$css?: empty,
  [key: string]: number | string,
};

export type EitherStyle = CompiledStyle | InlineStyle;

export type StylesArray<+T> = T | $ReadOnlyArray<StylesArray<T>>;
export type Styles = StylesArray<EitherStyle | false | void>;
export type Style<+T = EitherStyle> = StylesArray<false | ?T>;

export type StyleqOptions = {
  disableCache?: boolean,
  disableMix?: boolean,
  transform?: (EitherStyle) => EitherStyle,
};

export type StyleqResult = [string, InlineStyle | null];
export type Styleq = (styles: Styles) => StyleqResult;

export type IStyleq = {
  (...styles: $ReadOnlyArray<Styles>): StyleqResult,
  factory: (options?: StyleqOptions) => Styleq,
};
