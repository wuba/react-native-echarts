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

const _require = require('../parseTopLevelType'),
  parseTopLevelType = _require.parseTopLevelType;
const _require2 = require('./componentsUtils.js'),
  flattenProperties = _require2.flattenProperties;
function extendsForProp(prop, types) {
  if (!prop.expression) {
    console.log('null', prop);
  }
  const name = prop.expression.name;
  if (types[name] != null) {
    // This type is locally defined in the file
    return null;
  }
  switch (name) {
    case 'ViewProps':
      return {
        type: 'ReactNativeBuiltInType',
        knownTypeName: 'ReactNativeCoreViewProps',
      };
    default: {
      throw new Error(`Unable to handle prop spread: ${name}`);
    }
  }
}
function isEvent(typeAnnotation) {
  if (typeAnnotation.type !== 'TSTypeReference') {
    return false;
  }
  const eventNames = new Set(['BubblingEventHandler', 'DirectEventHandler']);
  return eventNames.has(typeAnnotation.typeName.name);
}
function isProp(name, typeAnnotation) {
  if (typeAnnotation.type !== 'TSTypeReference') {
    return true;
  }
  const isStyle =
    name === 'style' &&
    typeAnnotation.type === 'GenericTypeAnnotation' &&
    typeAnnotation.typeName.name === 'ViewStyleProp';
  return !isStyle;
}

// $FlowFixMe[unclear-type] TODO(T108222691): Use flow-types for @babel/parser

function categorizeProps(typeDefinition, types, extendsProps, props, events) {
  const remaining = [];
  for (const prop of typeDefinition) {
    // find extends
    if (prop.type === 'TSExpressionWithTypeArguments') {
      const extend = extendsForProp(prop, types);
      if (extend) {
        extendsProps.push(extend);
        continue;
      }
    }
    remaining.push(prop);
  }

  // find events and props
  for (const prop of flattenProperties(remaining, types)) {
    if (prop.type === 'TSPropertySignature') {
      const topLevelType = parseTopLevelType(
        prop.typeAnnotation.typeAnnotation,
        types,
      );
      if (isEvent(topLevelType.type)) {
        events.push(prop);
      } else if (isProp(prop.key.name, prop)) {
        props.push(prop);
      }
    }
  }
}
module.exports = {
  categorizeProps,
};
