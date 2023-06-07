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
const DeprecatedImageStylePropTypes = {
  ...DeprecatedLayoutPropTypes,
  ...DeprecatedShadowPropTypesIOS,
  ...DeprecatedTransformPropTypes,
  backfaceVisibility: PropTypes.oneOf(['hidden', 'visible']),
  backgroundColor: DeprecatedColorPropType,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
  borderColor: DeprecatedColorPropType,
  borderRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  objectFit: PropTypes.oneOf(['contain', 'cover', 'fill', 'scale-down']),
  opacity: PropTypes.number,
  overflow: PropTypes.oneOf(['hidden', 'visible']),
  overlayColor: PropTypes.string,
  tintColor: DeprecatedColorPropType,
  resizeMode: PropTypes.oneOf([
    'center',
    'contain',
    'cover',
    'repeat',
    'stretch',
  ]),
};

module.exports = DeprecatedImageStylePropTypes;
