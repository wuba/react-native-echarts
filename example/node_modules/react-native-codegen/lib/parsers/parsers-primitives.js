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

const _require = require('./parsers-commons'),
  wrapNullable = _require.wrapNullable,
  assertGenericTypeAnnotationHasExactlyOneTypeParameter =
    _require.assertGenericTypeAnnotationHasExactlyOneTypeParameter;
function emitBoolean(nullable) {
  return wrapNullable(nullable, {
    type: 'BooleanTypeAnnotation',
  });
}
function emitInt32(nullable) {
  return wrapNullable(nullable, {
    type: 'Int32TypeAnnotation',
  });
}
function emitNumber(nullable) {
  return wrapNullable(nullable, {
    type: 'NumberTypeAnnotation',
  });
}
function emitRootTag(nullable) {
  return wrapNullable(nullable, {
    type: 'ReservedTypeAnnotation',
    name: 'RootTag',
  });
}
function emitDouble(nullable) {
  return wrapNullable(nullable, {
    type: 'DoubleTypeAnnotation',
  });
}
function emitVoid(nullable) {
  return wrapNullable(nullable, {
    type: 'VoidTypeAnnotation',
  });
}
function emitStringish(nullable) {
  return wrapNullable(nullable, {
    type: 'StringTypeAnnotation',
  });
}
function emitFunction(nullable, translateFunctionTypeAnnotationValue) {
  return wrapNullable(nullable, translateFunctionTypeAnnotationValue);
}
function emitString(nullable) {
  return wrapNullable(nullable, {
    type: 'StringTypeAnnotation',
  });
}
function typeAliasResolution(
  typeAliasResolutionStatus,
  objectTypeAnnotation,
  aliasMap,
  nullable,
) {
  if (!typeAliasResolutionStatus.successful) {
    return wrapNullable(nullable, objectTypeAnnotation);
  }

  /**
   * All aliases RHS are required.
   */
  aliasMap[typeAliasResolutionStatus.aliasName] = objectTypeAnnotation;

  /**
   * Nullability of type aliases is transitive.
   *
   * Consider this case:
   *
   * type Animal = ?{
   *   name: string,
   * };
   *
   * type B = Animal
   *
   * export interface Spec extends TurboModule {
   *   +greet: (animal: B) => void;
   * }
   *
   * In this case, we follow B to Animal, and then Animal to ?{name: string}.
   *
   * We:
   *   1. Replace `+greet: (animal: B) => void;` with `+greet: (animal: ?Animal) => void;`,
   *   2. Pretend that Animal = {name: string}.
   *
   * Why do we do this?
   *  1. In ObjC, we need to generate a struct called Animal, not B.
   *  2. This design is simpler than managing nullability within both the type alias usage, and the type alias RHS.
   *  3. What does it mean for a C++ struct, which is what this type alias RHS will generate, to be nullable? ¯\_(ツ)_/¯
   *     Nullability is a concept that only makes sense when talking about instances (i.e: usages) of the C++ structs.
   *     Hence, it's better to manage nullability within the actual TypeAliasTypeAnnotation nodes, and not the
   *     associated ObjectTypeAnnotations.
   */
  return wrapNullable(nullable, {
    type: 'TypeAliasTypeAnnotation',
    name: typeAliasResolutionStatus.aliasName,
  });
}
function emitPromise(hasteModuleName, typeAnnotation, language, nullable) {
  assertGenericTypeAnnotationHasExactlyOneTypeParameter(
    hasteModuleName,
    typeAnnotation,
    language,
  );
  return wrapNullable(nullable, {
    type: 'PromiseTypeAnnotation',
  });
}
function emitObject(nullable) {
  return wrapNullable(nullable, {
    type: 'GenericObjectTypeAnnotation',
  });
}
function emitFloat(nullable) {
  return wrapNullable(nullable, {
    type: 'FloatTypeAnnotation',
  });
}
module.exports = {
  emitBoolean,
  emitDouble,
  emitFloat,
  emitFunction,
  emitInt32,
  emitNumber,
  emitObject,
  emitPromise,
  emitRootTag,
  emitVoid,
  emitString,
  emitStringish,
  typeAliasResolution,
};
