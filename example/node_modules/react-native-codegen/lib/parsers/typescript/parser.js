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

class TypeScriptParser {
  getMaybeEnumMemberType(maybeEnumDeclaration) {
    if (maybeEnumDeclaration.members[0].initializer) {
      return maybeEnumDeclaration.members[0].initializer.type
        .replace('NumericLiteral', 'NumberTypeAnnotation')
        .replace('StringLiteral', 'StringTypeAnnotation');
    }
    return 'StringTypeAnnotation';
  }
  isEnumDeclaration(maybeEnumDeclaration) {
    return maybeEnumDeclaration.type === 'TSEnumDeclaration';
  }
  language() {
    return 'TypeScript';
  }
  nameForGenericTypeAnnotation(typeAnnotation) {
    return typeAnnotation.typeName.name;
  }
}
module.exports = {
  TypeScriptParser,
};
