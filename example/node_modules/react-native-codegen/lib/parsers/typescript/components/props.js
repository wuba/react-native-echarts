/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */

'use strict';

const _require = require('./componentsUtils.js'),
  getSchemaInfo = _require.getSchemaInfo,
  getTypeAnnotation = _require.getTypeAnnotation;
function buildPropSchema(property, types) {
  const info = getSchemaInfo(property, types);
  const name = info.name,
    optional = info.optional,
    typeAnnotation = info.typeAnnotation,
    defaultValue = info.defaultValue;
  return {
    name,
    optional,
    typeAnnotation: getTypeAnnotation(
      name,
      typeAnnotation,
      defaultValue,
      types,
      buildPropSchema,
    ),
  };
}
function getProps(typeDefinition, types) {
  return typeDefinition.map(property => buildPropSchema(property, types));
}
module.exports = {
  getProps,
};
