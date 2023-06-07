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
 * @see facebook/react-native/Libraries/Image/ImageSource.js
 */
const ImageURISourcePropType = PropTypes.shape({
  body: PropTypes.string,
  bundle: PropTypes.string,
  cache: PropTypes.oneOf([
    'default',
    'force-cache',
    'only-if-cached',
    'reload',
  ]),
  headers: PropTypes.objectOf(PropTypes.string),
  height: PropTypes.number,
  method: PropTypes.string,
  scale: PropTypes.number,
  uri: PropTypes.string,
  width: PropTypes.number,
});

const ImageSourcePropType = PropTypes.oneOfType([
  ImageURISourcePropType,
  PropTypes.number,
  PropTypes.arrayOf(ImageURISourcePropType),
]);

module.exports = ImageSourcePropType;
