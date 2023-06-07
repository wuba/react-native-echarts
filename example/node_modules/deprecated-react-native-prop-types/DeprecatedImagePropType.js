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
const DeprecatedEdgeInsetsPropType = require('./DeprecatedEdgeInsetsPropType');
const DeprecatedImageSourcePropType = require('./DeprecatedImageSourcePropType');
const DeprecatedImageStylePropTypes = require('./DeprecatedImageStylePropTypes');
const DeprecatedStyleSheetPropType = require('./DeprecatedStyleSheetPropType');
const DeprecatedViewPropTypes = require('./DeprecatedViewPropTypes');
const PropTypes = require('prop-types');

/**
 * @see facebook/react-native/Libraries/Image/ImageProps.js
 */
const DeprecatedImagePropType = {
  ...DeprecatedViewPropTypes,
  alt: PropTypes.string,
  blurRadius: PropTypes.number,
  capInsets: DeprecatedEdgeInsetsPropType,
  crossOrigin: PropTypes.oneOf(['anonymous', 'use-credentials']),
  defaultSource: DeprecatedImageSourcePropType,
  fadeDuration: PropTypes.number,
  height: PropTypes.number,
  internal_analyticTag: PropTypes.string,
  loadingIndicatorSource: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number,
  ]),
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onLoadEnd: PropTypes.func,
  onLoadStart: PropTypes.func,
  onPartialLoad: PropTypes.func,
  onProgress: PropTypes.func,
  progressiveRenderingEnabled: PropTypes.bool,
  referrerPolicy: PropTypes.oneOf([
    'no-referrer',
    'no-referrer-when-downgrade',
    'origin',
    'origin-when-cross-origin',
    'same-origin',
    'strict-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url',
  ]),
  resizeMethod: PropTypes.oneOf(['auto', 'resize', 'scale']),
  resizeMode: PropTypes.oneOf([
    'cover',
    'contain',
    'stretch',
    'repeat',
    'center',
  ]),
  source: DeprecatedImageSourcePropType,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  style: DeprecatedStyleSheetPropType(DeprecatedImageStylePropTypes),
  testID: PropTypes.string,
  tintColor: DeprecatedColorPropType,
  width: PropTypes.number,
};

module.exports = DeprecatedImagePropType;
