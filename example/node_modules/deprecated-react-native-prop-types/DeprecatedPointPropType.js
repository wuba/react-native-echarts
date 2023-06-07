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
 * @see facebook/react-native/Libraries/StyleSheet/StyleSheetTypes.js
 */
const PointPropType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
});

module.exports = PointPropType;
