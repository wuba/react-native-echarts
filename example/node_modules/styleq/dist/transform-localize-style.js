/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localizeStyle = localizeStyle;
var cache = new WeakMap();
var markerProp = '$$css$localize';
/**
 * The compiler polyfills logical properties and values, generating a class
 * name for both writing directions. The style objects are annotated by
 * the compiler as needing this runtime transform. The results are memoized.
 *
 * { '$$css$localize': true, float: [ 'float-left', 'float-right' ] }
 * => { float: 'float-left' }
 */

function compileStyle(style, isRTL) {
  // Create a new compiled style for styleq
  var compiledStyle = {};

  for (var prop in style) {
    if (prop !== markerProp) {
      var value = style[prop];

      if (Array.isArray(value)) {
        compiledStyle[prop] = isRTL ? value[1] : value[0];
      } else {
        compiledStyle[prop] = value;
      }
    }
  }

  return compiledStyle;
}

function localizeStyle(style, isRTL) {
  if (style[markerProp] != null) {
    var compiledStyleIndex = isRTL ? 1 : 0; // Check the cache in case we've already seen this object

    if (cache.has(style)) {
      var _cachedStyles = cache.get(style);

      var _compiledStyle = _cachedStyles[compiledStyleIndex];

      if (_compiledStyle == null) {
        // Update the missing cache entry
        _compiledStyle = compileStyle(style, isRTL);
        _cachedStyles[compiledStyleIndex] = _compiledStyle;
        cache.set(style, _cachedStyles);
      }

      return _compiledStyle;
    } // Create a new compiled style for styleq


    var compiledStyle = compileStyle(style, isRTL);
    var cachedStyles = new Array(2);
    cachedStyles[compiledStyleIndex] = compiledStyle;
    cache.set(style, cachedStyles);
    return compiledStyle;
  }

  return style;
}