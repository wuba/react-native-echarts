/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

module.exports = {
  get ColorPropType() {
    return require('./DeprecatedColorPropType');
  },
  get EdgeInsetsPropType() {
    return require('./DeprecatedEdgeInsetsPropType');
  },
  get ImagePropTypes() {
    return require('./DeprecatedImagePropType');
  },
  get PointPropType() {
    return require('./DeprecatedPointPropType');
  },
  get TextInputPropTypes() {
    return require('./DeprecatedTextInputPropTypes');
  },
  get TextPropTypes() {
    return require('./DeprecatedTextPropTypes');
  },
  get ViewPropTypes() {
    return require('./DeprecatedViewPropTypes');
  },
};
