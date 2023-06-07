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
  flattenProperties = _require.flattenProperties,
  getSchemaInfo = _require.getSchemaInfo,
  getTypeAnnotation = _require.getTypeAnnotation;
function buildPropSchema(property, types) {
  const info = getSchemaInfo(property, types);
  if (info == null) {
    return null;
  }
  const name = info.name,
    optional = info.optional,
    typeAnnotation = info.typeAnnotation,
    defaultValue = info.defaultValue,
    withNullDefault = info.withNullDefault;
  return {
    name,
    optional,
    typeAnnotation: getTypeAnnotation(
      name,
      typeAnnotation,
      defaultValue,
      withNullDefault,
      types,
      buildPropSchema,
    ),
  };
}
function getProps(typeDefinition, types) {
  return flattenProperties(typeDefinition, types)
    .map(property => buildPropSchema(property, types))
    .filter(Boolean);
}
module.exports = {
  getProps,
};
