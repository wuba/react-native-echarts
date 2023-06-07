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

const _require = require('./parseTopLevelType'),
  parseTopLevelType = _require.parseTopLevelType;

/**
 * TODO(T108222691): Use flow-types for @babel/parser
 */

function getTypes(ast) {
  return ast.body.reduce((types, node) => {
    switch (node.type) {
      case 'ExportNamedDeclaration': {
        if (node.declaration) {
          switch (node.declaration.type) {
            case 'TSTypeAliasDeclaration':
            case 'TSInterfaceDeclaration':
            case 'TSEnumDeclaration': {
              types[node.declaration.id.name] = node.declaration;
              break;
            }
          }
        }
        break;
      }
      case 'TSTypeAliasDeclaration':
      case 'TSInterfaceDeclaration':
      case 'TSEnumDeclaration': {
        types[node.id.name] = node;
        break;
      }
    }
    return types;
  }, {});
}

// $FlowFixMe[unclear-type] Use flow-types for @babel/parser

const invariant = require('invariant');
function resolveTypeAnnotation(
  // TODO(T108222691): Use flow-types for @babel/parser
  typeAnnotation,
  types,
) {
  invariant(
    typeAnnotation != null,
    'resolveTypeAnnotation(): typeAnnotation cannot be null',
  );
  let node =
    typeAnnotation.type === 'TSTypeAnnotation'
      ? typeAnnotation.typeAnnotation
      : typeAnnotation;
  let nullable = false;
  let typeAliasResolutionStatus = {
    successful: false,
  };
  for (;;) {
    const topLevelType = parseTopLevelType(node);
    nullable = nullable || topLevelType.optional;
    node = topLevelType.type;
    if (node.type === 'TSTypeReference') {
      typeAliasResolutionStatus = {
        successful: true,
        aliasName: node.typeName.name,
      };
      const resolvedTypeAnnotation = types[node.typeName.name];
      if (
        resolvedTypeAnnotation == null ||
        resolvedTypeAnnotation.type === 'TSEnumDeclaration'
      ) {
        break;
      }
      invariant(
        resolvedTypeAnnotation.type === 'TSTypeAliasDeclaration',
        `GenericTypeAnnotation '${node.typeName.name}' must resolve to a TSTypeAliasDeclaration. Instead, it resolved to a '${resolvedTypeAnnotation.type}'`,
      );
      node = resolvedTypeAnnotation.typeAnnotation;
    } else {
      break;
    }
  }
  return {
    nullable: nullable,
    typeAnnotation: node,
    typeAliasResolutionStatus,
  };
}
module.exports = {
  resolveTypeAnnotation,
  getTypes,
};
