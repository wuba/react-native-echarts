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
const DeprecatedStyleSheetPropType = require('./DeprecatedStyleSheetPropType');
const DeprecatedTextStylePropTypes = require('./DeprecatedTextStylePropTypes');
const {
  AccessibilityActionInfoPropType,
  AccessibilityRolePropType,
  AccessibilityStatePropType,
  AccessibilityValuePropType,
  RolePropType,
} = require('./DeprecatedViewAccessibility');
const PropTypes = require('prop-types');

/**
 * @see facebook/react-native/Libraries/Text/TextProps.js
 */
const DeprecatedTextPropTypes = {
  'aria-busy': PropTypes.bool,
  'aria-checked': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['mixed']),
  ]),
  'aria-disabled': PropTypes.bool,
  'aria-expanded': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-selected': PropTypes.bool,
  accessibilityActions: PropTypes.arrayOf(AccessibilityActionInfoPropType),
  accessibilityHint: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  accessibilityLanguage: PropTypes.string,
  accessibilityRole: AccessibilityRolePropType,
  accessibilityState: AccessibilityStatePropType,
  accessible: PropTypes.bool,
  adjustsFontSizeToFit: PropTypes.bool,
  allowFontScaling: PropTypes.bool,
  dataDetectorType: PropTypes.oneOf([
    'all',
    'email',
    'link',
    'none',
    'phoneNumber',
  ]),
  disabled: PropTypes.bool,
  dynamicTypeRamp: PropTypes.oneOf([
    'body',
    'callout',
    'caption1',
    'caption2',
    'footnote',
    'headline',
    'largeTitle',
    'subheadline',
    'title1',
    'title2',
    'title3',
  ]),
  ellipsizeMode: PropTypes.oneOf(['clip', 'head', 'middle', 'tail']),
  id: PropTypes.string,
  lineBreakStrategyIOS: PropTypes.oneOf([
    'hangul-word',
    'none',
    'push-out',
    'standard',
  ]),
  maxFontSizeMultiplier: PropTypes.number,
  minimumFontScale: PropTypes.number,
  nativeID: PropTypes.string,
  numberOfLines: PropTypes.number,
  onAccessibilityAction: PropTypes.func,
  onLayout: PropTypes.func,
  onLongPress: PropTypes.func,
  onMoveShouldSetResponder: PropTypes.func,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onResponderGrant: PropTypes.func,
  onResponderMove: PropTypes.func,
  onResponderRelease: PropTypes.func,
  onResponderTerminate: PropTypes.func,
  onResponderTerminationRequest: PropTypes.func,
  onStartShouldSetResponder: PropTypes.func,
  onTextLayout: PropTypes.func,
  pressRetentionOffset: DeprecatedEdgeInsetsPropType,
  role: RolePropType,
  selectable: PropTypes.bool,
  selectionColor: DeprecatedColorPropType,
  style: DeprecatedStyleSheetPropType(DeprecatedTextStylePropTypes),
  suppressHighlighting: PropTypes.bool,
  testID: PropTypes.string,
  textBreakStrategy: PropTypes.oneOf(['balanced', 'highQuality', 'simple']),
};

module.exports = DeprecatedTextPropTypes;
