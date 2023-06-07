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

const babelParser = require('@babel/parser');
const fs = require('fs');
const _require = require('../utils'),
  buildSchemaFromConfigType = _require.buildSchemaFromConfigType,
  getConfigType = _require.getConfigType,
  isModuleRegistryCall = _require.isModuleRegistryCall;
const _require2 = require('./components'),
  buildComponentSchema = _require2.buildComponentSchema;
const _require3 = require('./components/schema'),
  wrapComponentSchema = _require3.wrapComponentSchema;
const _require4 = require('./modules'),
  buildModuleSchema = _require4.buildModuleSchema;
function Visitor(infoMap) {
  return {
    CallExpression(node) {
      if (
        node.callee.type === 'Identifier' &&
        node.callee.name === 'codegenNativeComponent'
      ) {
        infoMap.isComponent = true;
      }
      if (isModuleRegistryCall(node)) {
        infoMap.isModule = true;
      }
    },
    TSInterfaceDeclaration(node) {
      if (
        Array.isArray(node.extends) &&
        node.extends.some(
          extension => extension.expression.name === 'TurboModule',
        )
      ) {
        infoMap.isModule = true;
      }
    },
  };
}
function buildSchema(contents, filename) {
  // Early return for non-Spec JavaScript files
  if (
    !contents.includes('codegenNativeComponent') &&
    !contents.includes('TurboModule')
  ) {
    return {
      modules: {},
    };
  }
  const ast = babelParser.parse(contents, {
    sourceType: 'module',
    plugins: ['typescript'],
  }).program;
  const configType = getConfigType(ast, Visitor);
  return buildSchemaFromConfigType(
    configType,
    filename,
    ast,
    wrapComponentSchema,
    buildComponentSchema,
    buildModuleSchema,
  );
}
function parseModuleFixture(filename) {
  const contents = fs.readFileSync(filename, 'utf8');
  return buildSchema(contents, 'path/NativeSampleTurboModule.ts');
}
function parseString(contents, filename) {
  return buildSchema(contents, filename);
}
module.exports = {
  buildSchema,
  parseModuleFixture,
  parseString,
};
