/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const deprecatedCreateStrictShapeTypeChecker = require('./deprecatedCreateStrictShapeTypeChecker');

function DeprecatedStyleSheetPropType(shape) {
  const shapePropType = deprecatedCreateStrictShapeTypeChecker(shape);
  return function(props, propName, componentName, location, ...rest) {
    let newProps = props;
    if (props[propName]) {
      // Just make a dummy prop object with only the flattened style
      newProps = {};
      newProps[propName] = flattenStyle(props[propName]);
    }
    return shapePropType(newProps, propName, componentName, location, ...rest);
  };
}

function flattenStyle(style) {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key];
      }
    }
  }
  return result;
}

module.exports = DeprecatedStyleSheetPropType;
