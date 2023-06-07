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
const PropTypes = require('prop-types');

/**
 * @see facebook/react-native/Libraries/StyleSheet/StyleSheetTypes.js
 */
const DeprecatedShadowPropTypesIOS = {
  shadowColor: DeprecatedColorPropType,
  shadowOffset: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  shadowOpacity: PropTypes.number,
  shadowRadius: PropTypes.number,
};

module.exports = DeprecatedShadowPropTypesIOS;
