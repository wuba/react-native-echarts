/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const DeprecatedColorPropType = require('./DeprecatedColorPropType');
const DeprecatedLayoutPropTypes = require('./DeprecatedLayoutPropTypes');
const DeprecatedShadowPropTypesIOS = require('./DeprecatedShadowPropTypesIOS');
const DeprecatedTransformPropTypes = require('./DeprecatedTransformPropTypes');
const PropTypes = require('prop-types');

/**
 * @see facebook/react-native/Libraries/StyleSheet/StyleSheetTypes.js
 */
const DeprecatedViewStylePropTypes = {
  ...DeprecatedLayoutPropTypes,
  ...DeprecatedShadowPropTypesIOS,
  ...DeprecatedTransformPropTypes,
  backfaceVisibility: PropTypes.oneOf(['hidden', 'visible']),
  backgroundColor: DeprecatedColorPropType,
  borderBottomColor: DeprecatedColorPropType,
  borderBottomEndRadius: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
  borderBottomStartRadius: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  borderColor: DeprecatedColorPropType,
  borderCurve: PropTypes.oneOf(['circular', 'continuous']),
  borderEndColor: DeprecatedColorPropType,
  borderLeftColor: DeprecatedColorPropType,
  borderLeftWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  borderRightColor: DeprecatedColorPropType,
  borderRightWidth: PropTypes.number,
  borderStartColor: DeprecatedColorPropType,
  borderStyle: PropTypes.oneOf(['dashed', 'dotted', 'solid']),
  borderTopColor: DeprecatedColorPropType,
  borderTopEndRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderTopStartRadius: PropTypes.number,
  borderTopWidth: PropTypes.number,
  borderWidth: PropTypes.number,
  elevation: PropTypes.number,
  opacity: PropTypes.number,
  pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
};

module.exports = DeprecatedViewStylePropTypes;
