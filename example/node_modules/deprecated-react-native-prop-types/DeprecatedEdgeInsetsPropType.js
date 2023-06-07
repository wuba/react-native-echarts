/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const PropTypes = require('prop-types');

/**
 * @see facebook/react-native/Libraries/StyleSheet/Rect.js
 */
const DeprecatedEdgeInsetsPropType = PropTypes.shape({
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
});

module.exports = DeprecatedEdgeInsetsPropType;
