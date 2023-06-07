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

const _require = require('./errors.js'),
  MisnamedModuleInterfaceParserError =
    _require.MisnamedModuleInterfaceParserError,
  UnsupportedFunctionReturnTypeAnnotationParserError =
    _require.UnsupportedFunctionReturnTypeAnnotationParserError,
  ModuleInterfaceNotFoundParserError =
    _require.ModuleInterfaceNotFoundParserError,
  MoreThanOneModuleRegistryCallsParserError =
    _require.MoreThanOneModuleRegistryCallsParserError,
  UnusedModuleInterfaceParserError = _require.UnusedModuleInterfaceParserError,
  IncorrectModuleRegistryCallArityParserError =
    _require.IncorrectModuleRegistryCallArityParserError,
  IncorrectModuleRegistryCallTypeParameterParserError =
    _require.IncorrectModuleRegistryCallTypeParameterParserError,
  UnsupportedObjectPropertyValueTypeAnnotationParserError =
    _require.UnsupportedObjectPropertyValueTypeAnnotationParserError,
  UntypedModuleRegistryCallParserError =
    _require.UntypedModuleRegistryCallParserError,
  UnsupportedModulePropertyParserError =
    _require.UnsupportedModulePropertyParserError,
  MoreThanOneModuleInterfaceParserError =
    _require.MoreThanOneModuleInterfaceParserError,
  UnsupportedFunctionParamTypeAnnotationParserError =
    _require.UnsupportedFunctionParamTypeAnnotationParserError;
function throwIfModuleInterfaceIsMisnamed(
  nativeModuleName,
  moduleSpecId,
  parserType,
) {
  if (moduleSpecId.name !== 'Spec') {
    throw new MisnamedModuleInterfaceParserError(
      nativeModuleName,
      moduleSpecId,
      parserType,
    );
  }
}
function throwIfModuleInterfaceNotFound(
  numberOfModuleSpecs,
  nativeModuleName,
  ast,
  parserType,
) {
  if (numberOfModuleSpecs === 0) {
    throw new ModuleInterfaceNotFoundParserError(
      nativeModuleName,
      ast,
      parserType,
    );
  }
}
function throwIfMoreThanOneModuleRegistryCalls(
  hasteModuleName,
  callExpressions,
  callExpressionsLength,
  language,
) {
  if (callExpressions.length > 1) {
    throw new MoreThanOneModuleRegistryCallsParserError(
      hasteModuleName,
      callExpressions,
      callExpressionsLength,
      language,
    );
  }
}
function throwIfUnusedModuleInterfaceParserError(
  nativeModuleName,
  moduleSpec,
  callExpressions,
  language,
) {
  if (callExpressions.length === 0) {
    throw new UnusedModuleInterfaceParserError(
      nativeModuleName,
      moduleSpec,
      language,
    );
  }
}
function throwIfWrongNumberOfCallExpressionArgs(
  nativeModuleName,
  flowCallExpression,
  methodName,
  numberOfCallExpressionArgs,
  language,
) {
  if (numberOfCallExpressionArgs !== 1) {
    throw new IncorrectModuleRegistryCallArityParserError(
      nativeModuleName,
      flowCallExpression,
      methodName,
      numberOfCallExpressionArgs,
      language,
    );
  }
}
function throwIfIncorrectModuleRegistryCallTypeParameterParserError(
  nativeModuleName,
  typeArguments,
  methodName,
  moduleName,
  language,
) {
  function throwError() {
    throw new IncorrectModuleRegistryCallTypeParameterParserError(
      nativeModuleName,
      typeArguments,
      methodName,
      moduleName,
      language,
    );
  }
  if (language === 'Flow') {
    if (
      typeArguments.type !== 'TypeParameterInstantiation' ||
      typeArguments.params.length !== 1 ||
      typeArguments.params[0].type !== 'GenericTypeAnnotation' ||
      typeArguments.params[0].id.name !== 'Spec'
    ) {
      throwError();
    }
  } else if (language === 'TypeScript') {
    if (
      typeArguments.type !== 'TSTypeParameterInstantiation' ||
      typeArguments.params.length !== 1 ||
      typeArguments.params[0].type !== 'TSTypeReference' ||
      typeArguments.params[0].typeName.name !== 'Spec'
    ) {
      throwError();
    }
  }
}
function throwIfUnsupportedFunctionReturnTypeAnnotationParserError(
  nativeModuleName,
  returnTypeAnnotation,
  invalidReturnType,
  language,
  cxxOnly,
  returnType,
) {
  if (!cxxOnly && returnType === 'FunctionTypeAnnotation') {
    throw new UnsupportedFunctionReturnTypeAnnotationParserError(
      nativeModuleName,
      returnTypeAnnotation.returnType,
      'FunctionTypeAnnotation',
      language,
    );
  }
}
function throwIfUntypedModule(
  typeArguments,
  hasteModuleName,
  callExpression,
  methodName,
  $moduleName,
  language,
) {
  if (typeArguments == null) {
    throw new UntypedModuleRegistryCallParserError(
      hasteModuleName,
      callExpression,
      methodName,
      $moduleName,
      language,
    );
  }
}
function throwIfModuleTypeIsUnsupported(
  nativeModuleName,
  propertyValue,
  propertyName,
  propertyValueType,
  language,
) {
  if (language === 'Flow' && propertyValueType !== 'FunctionTypeAnnotation') {
    throw new UnsupportedModulePropertyParserError(
      nativeModuleName,
      propertyValue,
      propertyName,
      propertyValueType,
      language,
    );
  } else if (
    language === 'TypeScript' &&
    propertyValueType !== 'TSFunctionType' &&
    propertyValueType !== 'TSMethodSignature'
  ) {
    throw new UnsupportedModulePropertyParserError(
      nativeModuleName,
      propertyValue,
      propertyName,
      propertyValueType,
      language,
    );
  }
}
const UnsupportedObjectPropertyTypeToInvalidPropertyValueTypeMap = {
  FunctionTypeAnnotation: 'FunctionTypeAnnotation',
  VoidTypeAnnotation: 'void',
  PromiseTypeAnnotation: 'Promise',
};
function throwIfPropertyValueTypeIsUnsupported(
  moduleName,
  propertyValue,
  propertyKey,
  type,
  language,
) {
  const invalidPropertyValueType =
    UnsupportedObjectPropertyTypeToInvalidPropertyValueTypeMap[type];
  throw new UnsupportedObjectPropertyValueTypeAnnotationParserError(
    moduleName,
    propertyValue,
    propertyKey,
    invalidPropertyValueType,
    language,
  );
}
function throwIfMoreThanOneModuleInterfaceParserError(
  nativeModuleName,
  moduleSpecs,
  parserType,
) {
  if (moduleSpecs.length > 1) {
    throw new MoreThanOneModuleInterfaceParserError(
      nativeModuleName,
      moduleSpecs,
      moduleSpecs.map(node => node.id.name),
      parserType,
    );
  }
}
function throwIfUnsupportedFunctionParamTypeAnnotationParserError(
  nativeModuleName,
  languageParamTypeAnnotation,
  paramName,
  paramTypeAnnotationType,
) {
  throw new UnsupportedFunctionParamTypeAnnotationParserError(
    nativeModuleName,
    languageParamTypeAnnotation,
    paramName,
    paramTypeAnnotationType,
  );
}
module.exports = {
  throwIfModuleInterfaceIsMisnamed,
  throwIfUnsupportedFunctionReturnTypeAnnotationParserError,
  throwIfModuleInterfaceNotFound,
  throwIfMoreThanOneModuleRegistryCalls,
  throwIfPropertyValueTypeIsUnsupported,
  throwIfUnusedModuleInterfaceParserError,
  throwIfWrongNumberOfCallExpressionArgs,
  throwIfIncorrectModuleRegistryCallTypeParameterParserError,
  throwIfUntypedModule,
  throwIfModuleTypeIsUnsupported,
  throwIfMoreThanOneModuleInterfaceParserError,
  throwIfUnsupportedFunctionParamTypeAnnotationParserError,
};
