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

class FlowParser {
  getMaybeEnumMemberType(maybeEnumDeclaration) {
    return maybeEnumDeclaration.body.type
      .replace('EnumNumberBody', 'NumberTypeAnnotation')
      .replace('EnumStringBody', 'StringTypeAnnotation');
  }
  isEnumDeclaration(maybeEnumDeclaration) {
    return maybeEnumDeclaration.type === 'EnumDeclaration';
  }
  language() {
    return 'Flow';
  }
  nameForGenericTypeAnnotation(typeAnnotation) {
    return typeAnnotation.id.name;
  }
}
module.exports = {
  FlowParser,
};
