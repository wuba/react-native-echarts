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
const DeprecatedViewStylePropTypes = require('./DeprecatedViewStylePropTypes');
const PropTypes = require('prop-types');

/**
 * @see facebook/react-native/Libraries/StyleSheet/StyleSheetTypes.js
 */
const DeprecatedTextStylePropTypes = {
  ...DeprecatedViewStylePropTypes,
  color: DeprecatedColorPropType,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontStyle: PropTypes.oneOf(['italic', 'normal']),
  fontVariant: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOf([
        'lining-nums',
        'oldstyle-nums',
        'proportional-nums',
        'small-caps',
        'stylistic-eight',
        'stylistic-eighteen',
        'stylistic-eleven',
        'stylistic-fifteen',
        'stylistic-five',
        'stylistic-four',
        'stylistic-fourteen',
        'stylistic-nine',
        'stylistic-nineteen',
        'stylistic-one',
        'stylistic-seven',
        'stylistic-seventeen',
        'stylistic-six',
        'stylistic-sixteen',
        'stylistic-ten',
        'stylistic-thirteen',
        'stylistic-three',
        'stylistic-twelve',
        'stylistic-twenty',
        'stylistic-two',
        'tabular-nums',
      ]),
    ),
    PropTypes.string,
  ]),
  fontWeight: PropTypes.oneOf([
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'black',
    'bold',
    'condensed',
    'condensedBold',
    'heavy',
    'light',
    'medium',
    'normal',
    'regular',
    'semibold',
    'thin',
    'ultralight',
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
  ]),
  includeFontPadding: PropTypes.bool,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  textAlign: PropTypes.oneOf(['auto', 'center', 'justify', 'left', 'right']),
  textAlignVertical: PropTypes.oneOf(['auto', 'bottom', 'center', 'top']),
  textDecorationColor: DeprecatedColorPropType,
  textDecorationLine: PropTypes.oneOf([
    'line-through',
    'none',
    'underline line-through',
    'underline',
  ]),
  textDecorationStyle: PropTypes.oneOf(['dashed', 'dotted', 'double', 'solid']),
  textShadowColor: DeprecatedColorPropType,
  textShadowOffset: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  textShadowRadius: PropTypes.number,
  textTransform: PropTypes.oneOf([
    'capitalize',
    'lowercase',
    'none',
    'uppercase',
  ]),
  userSelect: PropTypes.oneOf(['all', 'auto', 'contain', 'none', 'text']),
  verticalAlign: PropTypes.oneOf(['auto', 'bottom', 'middle', 'top']),
  writingDirection: PropTypes.oneOf(['auto', 'ltr', 'rtl']),
};

module.exports = DeprecatedTextStylePropTypes;
