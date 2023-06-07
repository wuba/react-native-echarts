/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 *
 */

'use strict';

const _require = require('./errors'),
  MissingTypeParameterGenericParserError =
    _require.MissingTypeParameterGenericParserError,
  MoreThanOneTypeParameterGenericParserError =
    _require.MoreThanOneTypeParameterGenericParserError,
  UnsupportedUnionTypeAnnotationParserError =
    _require.UnsupportedUnionTypeAnnotationParserError;
const _require2 = require('./errors'),
  UnsupportedObjectPropertyTypeAnnotationParserError =
    _require2.UnsupportedObjectPropertyTypeAnnotationParserError;
const invariant = require('invariant');
const _require3 = require('./errors'),
  UnsupportedEnumDeclarationParserError =
    _require3.UnsupportedEnumDeclarationParserError,
  UnsupportedGenericParserError = _require3.UnsupportedGenericParserError;
function wrapModuleSchema(nativeModuleSchema, hasteModuleName) {
  return {
    modules: {
      [hasteModuleName]: nativeModuleSchema,
    },
  };
}
function unwrapNullable(x) {
  if (x.type === 'NullableTypeAnnotation') {
    return [x.typeAnnotation, true];
  }
  return [x, false];
}
function wrapNullable(nullable, typeAnnotation) {
  if (!nullable) {
    return typeAnnotation;
  }
  return {
    type: 'NullableTypeAnnotation',
    typeAnnotation,
  };
}
function assertGenericTypeAnnotationHasExactlyOneTypeParameter(
  moduleName,
  /**
   * TODO(T108222691): Use flow-types for @babel/parser
   */
  typeAnnotation,
  language,
) {
  if (typeAnnotation.typeParameters == null) {
    throw new MissingTypeParameterGenericParserError(
      moduleName,
      typeAnnotation,
      language,
    );
  }
  const typeAnnotationType =
    language === 'TypeScript'
      ? 'TSTypeParameterInstantiation'
      : 'TypeParameterInstantiation';
  invariant(
    typeAnnotation.typeParameters.type === typeAnnotationType,
    `assertGenericTypeAnnotationHasExactlyOneTypeParameter: Type parameters must be an AST node of type '${typeAnnotationType}'`,
  );
  if (typeAnnotation.typeParameters.params.length !== 1) {
    throw new MoreThanOneTypeParameterGenericParserError(
      moduleName,
      typeAnnotation,
      language,
    );
  }
}
function emitMixedTypeAnnotation(nullable) {
  return wrapNullable(nullable, {
    type: 'MixedTypeAnnotation',
  });
}
function remapUnionTypeAnnotationMemberNames(types, language) {
  const remapLiteral = item => {
    if (language === 'Flow') {
      return item.type
        .replace('NumberLiteralTypeAnnotation', 'NumberTypeAnnotation')
        .replace('StringLiteralTypeAnnotation', 'StringTypeAnnotation');
    }
    return item.literal
      ? item.literal.type
          .replace('NumericLiteral', 'NumberTypeAnnotation')
          .replace('StringLiteral', 'StringTypeAnnotation')
      : 'ObjectTypeAnnotation';
  };
  return types
    .map(remapLiteral)
    .filter((value, index, self) => self.indexOf(value) === index);
}
function emitUnionTypeAnnotation(
  nullable,
  hasteModuleName,
  typeAnnotation,
  language,
) {
  const unionTypes = remapUnionTypeAnnotationMemberNames(
    typeAnnotation.types,
    language,
  );

  // Only support unionTypes of the same kind
  if (unionTypes.length > 1) {
    throw new UnsupportedUnionTypeAnnotationParserError(
      hasteModuleName,
      typeAnnotation,
      unionTypes,
      language,
    );
  }
  return wrapNullable(nullable, {
    type: 'UnionTypeAnnotation',
    memberType: unionTypes[0],
  });
}
function translateDefault(
  hasteModuleName,
  typeAnnotation,
  types,
  nullable,
  parser,
) {
  const maybeEnumDeclaration =
    types[parser.nameForGenericTypeAnnotation(typeAnnotation)];
  if (maybeEnumDeclaration && parser.isEnumDeclaration(maybeEnumDeclaration)) {
    const memberType = parser.getMaybeEnumMemberType(maybeEnumDeclaration);
    if (
      memberType === 'NumberTypeAnnotation' ||
      memberType === 'StringTypeAnnotation'
    ) {
      return wrapNullable(nullable, {
        type: 'EnumDeclaration',
        memberType: memberType,
      });
    } else {
      throw new UnsupportedEnumDeclarationParserError(
        hasteModuleName,
        typeAnnotation,
        memberType,
        parser.language(),
      );
    }
  }
  throw new UnsupportedGenericParserError(
    hasteModuleName,
    typeAnnotation,
    parser,
  );
}
function getKeyName(propertyOrIndex, hasteModuleName, language) {
  var _propertyOrIndex$id$n, _propertyOrIndex$id;
  switch (propertyOrIndex.type) {
    case 'ObjectTypeProperty':
    case 'TSPropertySignature':
      return propertyOrIndex.key.name;
    case 'ObjectTypeIndexer':
      // flow index name is optional
      return (_propertyOrIndex$id$n =
        (_propertyOrIndex$id = propertyOrIndex.id) === null ||
        _propertyOrIndex$id === void 0
          ? void 0
          : _propertyOrIndex$id.name) !== null &&
        _propertyOrIndex$id$n !== void 0
        ? _propertyOrIndex$id$n
        : 'key';
    case 'TSIndexSignature':
      // TypeScript index name is mandatory
      return propertyOrIndex.parameters[0].name;
    default:
      throw new UnsupportedObjectPropertyTypeAnnotationParserError(
        hasteModuleName,
        propertyOrIndex,
        propertyOrIndex.type,
        language,
      );
  }
}
module.exports = {
  wrapModuleSchema,
  unwrapNullable,
  wrapNullable,
  assertGenericTypeAnnotationHasExactlyOneTypeParameter,
  emitMixedTypeAnnotation,
  emitUnionTypeAnnotation,
  getKeyName,
  translateDefault,
};
