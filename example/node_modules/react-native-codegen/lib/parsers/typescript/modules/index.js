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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source),
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key),
          );
        });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string');
  return typeof key === 'symbol' ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== 'object' || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default');
    if (typeof res !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i =
    null == arr
      ? null
      : ('undefined' != typeof Symbol && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else
        for (
          ;
          !(_n = (_s = _x.call(_i)).done) &&
          (_arr.push(_s.value), _arr.length !== i);
          _n = !0
        );
    } catch (err) {
      (_d = !0), (_e = err);
    } finally {
      try {
        if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r))
          return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
const _require = require('../../parsers-utils'),
  nullGuard = _require.nullGuard;
const _require2 = require('../../error-utils'),
  throwIfMoreThanOneModuleRegistryCalls =
    _require2.throwIfMoreThanOneModuleRegistryCalls,
  throwIfUnsupportedFunctionParamTypeAnnotationParserError =
    _require2.throwIfUnsupportedFunctionParamTypeAnnotationParserError;
const _require3 = require('../../utils'),
  visit = _require3.visit,
  isModuleRegistryCall = _require3.isModuleRegistryCall;
const _require4 = require('../utils.js'),
  resolveTypeAnnotation = _require4.resolveTypeAnnotation,
  getTypes = _require4.getTypes;
const _require5 = require('../../parsers-commons'),
  unwrapNullable = _require5.unwrapNullable,
  wrapNullable = _require5.wrapNullable,
  assertGenericTypeAnnotationHasExactlyOneTypeParameter =
    _require5.assertGenericTypeAnnotationHasExactlyOneTypeParameter,
  emitMixedTypeAnnotation = _require5.emitMixedTypeAnnotation,
  emitUnionTypeAnnotation = _require5.emitUnionTypeAnnotation,
  translateDefault = _require5.translateDefault;
const _require6 = require('../../parsers-primitives'),
  emitBoolean = _require6.emitBoolean,
  emitDouble = _require6.emitDouble,
  emitFloat = _require6.emitFloat,
  emitFunction = _require6.emitFunction,
  emitNumber = _require6.emitNumber,
  emitInt32 = _require6.emitInt32,
  emitObject = _require6.emitObject,
  emitPromise = _require6.emitPromise,
  emitRootTag = _require6.emitRootTag,
  emitVoid = _require6.emitVoid,
  emitString = _require6.emitString,
  emitStringish = _require6.emitStringish,
  typeAliasResolution = _require6.typeAliasResolution;
const _require7 = require('../../errors.js'),
  UnnamedFunctionParamParserError = _require7.UnnamedFunctionParamParserError,
  UnsupportedArrayElementTypeAnnotationParserError =
    _require7.UnsupportedArrayElementTypeAnnotationParserError,
  UnsupportedGenericParserError = _require7.UnsupportedGenericParserError,
  UnsupportedTypeAnnotationParserError =
    _require7.UnsupportedTypeAnnotationParserError,
  UnsupportedObjectPropertyTypeAnnotationParserError =
    _require7.UnsupportedObjectPropertyTypeAnnotationParserError,
  IncorrectModuleRegistryCallArgumentTypeParserError =
    _require7.IncorrectModuleRegistryCallArgumentTypeParserError;
const _require8 = require('../../utils'),
  verifyPlatforms = _require8.verifyPlatforms;
const _require9 = require('../../error-utils'),
  throwIfUntypedModule = _require9.throwIfUntypedModule,
  throwIfPropertyValueTypeIsUnsupported =
    _require9.throwIfPropertyValueTypeIsUnsupported,
  throwIfModuleTypeIsUnsupported = _require9.throwIfModuleTypeIsUnsupported,
  throwIfUnusedModuleInterfaceParserError =
    _require9.throwIfUnusedModuleInterfaceParserError,
  throwIfModuleInterfaceNotFound = _require9.throwIfModuleInterfaceNotFound,
  throwIfModuleInterfaceIsMisnamed = _require9.throwIfModuleInterfaceIsMisnamed,
  throwIfWrongNumberOfCallExpressionArgs =
    _require9.throwIfWrongNumberOfCallExpressionArgs,
  throwIfMoreThanOneModuleInterfaceParserError =
    _require9.throwIfMoreThanOneModuleInterfaceParserError,
  throwIfIncorrectModuleRegistryCallTypeParameterParserError =
    _require9.throwIfIncorrectModuleRegistryCallTypeParameterParserError,
  throwIfUnsupportedFunctionReturnTypeAnnotationParserError =
    _require9.throwIfUnsupportedFunctionReturnTypeAnnotationParserError;
const _require10 = require('../parser'),
  TypeScriptParser = _require10.TypeScriptParser;
const _require11 = require('../../parsers-commons'),
  getKeyName = _require11.getKeyName;
const language = 'TypeScript';
const parser = new TypeScriptParser();
function translateArrayTypeAnnotation(
  hasteModuleName,
  types,
  aliasMap,
  cxxOnly,
  tsArrayType,
  tsElementType,
  nullable,
) {
  try {
    /**
     * TODO(T72031674): Migrate all our NativeModule specs to not use
     * invalid Array ElementTypes. Then, make the elementType a required
     * parameter.
     */
    const _unwrapNullable = unwrapNullable(
        translateTypeAnnotation(
          hasteModuleName,
          tsElementType,
          types,
          aliasMap,
          /**
           * TODO(T72031674): Ensure that all ParsingErrors that are thrown
           * while parsing the array element don't get captured and collected.
           * Why? If we detect any parsing error while parsing the element,
           * we should default it to null down the line, here. This is
           * the correct behaviour until we migrate all our NativeModule specs
           * to be parseable.
           */
          nullGuard,
          cxxOnly,
        ),
      ),
      _unwrapNullable2 = _slicedToArray(_unwrapNullable, 2),
      elementType = _unwrapNullable2[0],
      isElementTypeNullable = _unwrapNullable2[1];
    if (elementType.type === 'VoidTypeAnnotation') {
      throw new UnsupportedArrayElementTypeAnnotationParserError(
        hasteModuleName,
        tsElementType,
        tsArrayType,
        'void',
        language,
      );
    }
    if (elementType.type === 'PromiseTypeAnnotation') {
      throw new UnsupportedArrayElementTypeAnnotationParserError(
        hasteModuleName,
        tsElementType,
        tsArrayType,
        'Promise',
        language,
      );
    }
    if (elementType.type === 'FunctionTypeAnnotation') {
      throw new UnsupportedArrayElementTypeAnnotationParserError(
        hasteModuleName,
        tsElementType,
        tsArrayType,
        'FunctionTypeAnnotation',
        language,
      );
    }
    const finalTypeAnnotation = {
      type: 'ArrayTypeAnnotation',
      elementType: wrapNullable(isElementTypeNullable, elementType),
    };
    return wrapNullable(nullable, finalTypeAnnotation);
  } catch (ex) {
    return wrapNullable(nullable, {
      type: 'ArrayTypeAnnotation',
    });
  }
}
function translateTypeAnnotation(
  hasteModuleName,
  /**
   * TODO(T108222691): Use flow-types for @babel/parser
   */
  typeScriptTypeAnnotation,
  types,
  aliasMap,
  tryParse,
  cxxOnly,
) {
  const _resolveTypeAnnotatio = resolveTypeAnnotation(
      typeScriptTypeAnnotation,
      types,
    ),
    nullable = _resolveTypeAnnotatio.nullable,
    typeAnnotation = _resolveTypeAnnotatio.typeAnnotation,
    typeAliasResolutionStatus = _resolveTypeAnnotatio.typeAliasResolutionStatus;
  switch (typeAnnotation.type) {
    case 'TSArrayType': {
      return translateArrayTypeAnnotation(
        hasteModuleName,
        types,
        aliasMap,
        cxxOnly,
        'Array',
        typeAnnotation.elementType,
        nullable,
      );
    }
    case 'TSTypeOperator': {
      if (
        typeAnnotation.operator === 'readonly' &&
        typeAnnotation.typeAnnotation.type === 'TSArrayType'
      ) {
        return translateArrayTypeAnnotation(
          hasteModuleName,
          types,
          aliasMap,
          cxxOnly,
          'ReadonlyArray',
          typeAnnotation.typeAnnotation.elementType,
          nullable,
        );
      } else {
        throw new UnsupportedGenericParserError(
          hasteModuleName,
          typeAnnotation,
          parser,
        );
      }
    }
    case 'TSTypeReference': {
      switch (typeAnnotation.typeName.name) {
        case 'RootTag': {
          return emitRootTag(nullable);
        }
        case 'Promise': {
          return emitPromise(
            hasteModuleName,
            typeAnnotation,
            language,
            nullable,
          );
        }
        case 'Array':
        case 'ReadonlyArray': {
          assertGenericTypeAnnotationHasExactlyOneTypeParameter(
            hasteModuleName,
            typeAnnotation,
            language,
          );
          return translateArrayTypeAnnotation(
            hasteModuleName,
            types,
            aliasMap,
            cxxOnly,
            typeAnnotation.type,
            typeAnnotation.typeParameters.params[0],
            nullable,
          );
        }
        case 'Stringish': {
          return emitStringish(nullable);
        }
        case 'Int32': {
          return emitInt32(nullable);
        }
        case 'Double': {
          return emitDouble(nullable);
        }
        case 'Float': {
          return emitFloat(nullable);
        }
        case 'UnsafeObject':
        case 'Object': {
          return emitObject(nullable);
        }
        default: {
          return translateDefault(
            hasteModuleName,
            typeAnnotation,
            types,
            nullable,
            parser,
          );
        }
      }
    }
    case 'TSTypeLiteral': {
      const objectTypeAnnotation = {
        type: 'ObjectTypeAnnotation',
        // $FlowFixMe[missing-type-arg]
        properties: typeAnnotation.members
          .map(property => {
            return tryParse(() => {
              if (
                property.type !== 'TSPropertySignature' &&
                property.type !== 'TSIndexSignature'
              ) {
                throw new UnsupportedObjectPropertyTypeAnnotationParserError(
                  hasteModuleName,
                  property,
                  property.type,
                  language,
                );
              }
              const _property$optional = property.optional,
                optional =
                  _property$optional === void 0 ? false : _property$optional;
              const name = getKeyName(property, hasteModuleName, language);
              if (property.type === 'TSIndexSignature') {
                return {
                  name,
                  optional,
                  typeAnnotation: emitObject(nullable),
                };
              }
              const _unwrapNullable3 = unwrapNullable(
                  translateTypeAnnotation(
                    hasteModuleName,
                    property.typeAnnotation.typeAnnotation,
                    types,
                    aliasMap,
                    tryParse,
                    cxxOnly,
                  ),
                ),
                _unwrapNullable4 = _slicedToArray(_unwrapNullable3, 2),
                propertyTypeAnnotation = _unwrapNullable4[0],
                isPropertyNullable = _unwrapNullable4[1];
              if (
                propertyTypeAnnotation.type === 'FunctionTypeAnnotation' ||
                propertyTypeAnnotation.type === 'PromiseTypeAnnotation' ||
                propertyTypeAnnotation.type === 'VoidTypeAnnotation'
              ) {
                throwIfPropertyValueTypeIsUnsupported(
                  hasteModuleName,
                  property.typeAnnotation.typeAnnotation,
                  property.key,
                  propertyTypeAnnotation.type,
                  language,
                );
              } else {
                return {
                  name,
                  optional,
                  typeAnnotation: wrapNullable(
                    isPropertyNullable,
                    propertyTypeAnnotation,
                  ),
                };
              }
            });
          })
          .filter(Boolean),
      };
      return typeAliasResolution(
        typeAliasResolutionStatus,
        objectTypeAnnotation,
        aliasMap,
        nullable,
      );
    }
    case 'TSBooleanKeyword': {
      return emitBoolean(nullable);
    }
    case 'TSNumberKeyword': {
      return emitNumber(nullable);
    }
    case 'TSVoidKeyword': {
      return emitVoid(nullable);
    }
    case 'TSStringKeyword': {
      return emitString(nullable);
    }
    case 'TSFunctionType': {
      const translateFunctionTypeAnnotationValue =
        translateFunctionTypeAnnotation(
          hasteModuleName,
          typeAnnotation,
          types,
          aliasMap,
          tryParse,
          cxxOnly,
        );
      return emitFunction(nullable, translateFunctionTypeAnnotationValue);
    }
    case 'TSUnionType': {
      if (cxxOnly) {
        return emitUnionTypeAnnotation(
          nullable,
          hasteModuleName,
          typeAnnotation,
          language,
        );
      }
      // Fallthrough
    }

    case 'TSUnknownKeyword': {
      if (cxxOnly) {
        return emitMixedTypeAnnotation(nullable);
      }
      // Fallthrough
    }

    default: {
      throw new UnsupportedTypeAnnotationParserError(
        hasteModuleName,
        typeAnnotation,
        language,
      );
    }
  }
}
function translateFunctionTypeAnnotation(
  hasteModuleName,
  // TODO(T108222691): Use flow-types for @babel/parser
  typescriptFunctionTypeAnnotation,
  types,
  aliasMap,
  tryParse,
  cxxOnly,
) {
  const params = [];
  for (const typeScriptParam of typescriptFunctionTypeAnnotation.parameters) {
    const parsedParam = tryParse(() => {
      if (typeScriptParam.typeAnnotation == null) {
        throw new UnnamedFunctionParamParserError(
          typeScriptParam,
          hasteModuleName,
          language,
        );
      }
      const paramName = typeScriptParam.name;
      const _unwrapNullable5 = unwrapNullable(
          translateTypeAnnotation(
            hasteModuleName,
            typeScriptParam.typeAnnotation.typeAnnotation,
            types,
            aliasMap,
            tryParse,
            cxxOnly,
          ),
        ),
        _unwrapNullable6 = _slicedToArray(_unwrapNullable5, 2),
        paramTypeAnnotation = _unwrapNullable6[0],
        isParamTypeAnnotationNullable = _unwrapNullable6[1];
      if (
        paramTypeAnnotation.type === 'VoidTypeAnnotation' ||
        paramTypeAnnotation.type === 'PromiseTypeAnnotation'
      ) {
        return throwIfUnsupportedFunctionParamTypeAnnotationParserError(
          hasteModuleName,
          typeScriptParam.typeAnnotation,
          paramName,
          paramTypeAnnotation.type,
        );
      }
      return {
        name: typeScriptParam.name,
        optional: Boolean(typeScriptParam.optional),
        typeAnnotation: wrapNullable(
          isParamTypeAnnotationNullable,
          paramTypeAnnotation,
        ),
      };
    });
    if (parsedParam != null) {
      params.push(parsedParam);
    }
  }
  const _unwrapNullable7 = unwrapNullable(
      translateTypeAnnotation(
        hasteModuleName,
        typescriptFunctionTypeAnnotation.typeAnnotation.typeAnnotation,
        types,
        aliasMap,
        tryParse,
        cxxOnly,
      ),
    ),
    _unwrapNullable8 = _slicedToArray(_unwrapNullable7, 2),
    returnTypeAnnotation = _unwrapNullable8[0],
    isReturnTypeAnnotationNullable = _unwrapNullable8[1];
  throwIfUnsupportedFunctionReturnTypeAnnotationParserError(
    hasteModuleName,
    typescriptFunctionTypeAnnotation,
    'FunctionTypeAnnotation',
    language,
    cxxOnly,
    returnTypeAnnotation.type,
  );
  return {
    type: 'FunctionTypeAnnotation',
    returnTypeAnnotation: wrapNullable(
      isReturnTypeAnnotationNullable,
      returnTypeAnnotation,
    ),
    params,
  };
}
function buildPropertySchema(
  hasteModuleName,
  // TODO(T108222691): Use flow-types for @babel/parser
  property,
  types,
  aliasMap,
  tryParse,
  cxxOnly,
) {
  let nullable = false;
  let key = property.key;
  let value =
    property.type === 'TSMethodSignature' ? property : property.typeAnnotation;
  const methodName = key.name;
  var _resolveTypeAnnotatio2 = resolveTypeAnnotation(value, types);
  nullable = _resolveTypeAnnotatio2.nullable;
  value = _resolveTypeAnnotatio2.typeAnnotation;
  throwIfModuleTypeIsUnsupported(
    hasteModuleName,
    property.value,
    property.key.name,
    value.type,
    language,
  );
  return {
    name: methodName,
    optional: Boolean(property.optional),
    typeAnnotation: wrapNullable(
      nullable,
      translateFunctionTypeAnnotation(
        hasteModuleName,
        value,
        types,
        aliasMap,
        tryParse,
        cxxOnly,
      ),
    ),
  };
}
function isModuleInterface(node) {
  return (
    node.type === 'TSInterfaceDeclaration' &&
    node.extends.length === 1 &&
    node.extends[0].type === 'TSExpressionWithTypeArguments' &&
    node.extends[0].expression.name === 'TurboModule'
  );
}
function buildModuleSchema(
  hasteModuleName,
  /**
   * TODO(T108222691): Use flow-types for @babel/parser
   */
  ast,
  tryParse,
) {
  const types = getTypes(ast);
  const moduleSpecs = Object.values(types).filter(isModuleInterface);
  throwIfModuleInterfaceNotFound(
    moduleSpecs.length,
    hasteModuleName,
    ast,
    language,
  );
  throwIfMoreThanOneModuleInterfaceParserError(
    hasteModuleName,
    moduleSpecs,
    language,
  );
  const _moduleSpecs = _slicedToArray(moduleSpecs, 1),
    moduleSpec = _moduleSpecs[0];
  throwIfModuleInterfaceIsMisnamed(hasteModuleName, moduleSpec.id, language);

  // Parse Module Names
  const moduleName = tryParse(() => {
    const callExpressions = [];
    visit(ast, {
      CallExpression(node) {
        if (isModuleRegistryCall(node)) {
          callExpressions.push(node);
        }
      },
    });
    throwIfUnusedModuleInterfaceParserError(
      hasteModuleName,
      moduleSpec,
      callExpressions,
      language,
    );
    throwIfMoreThanOneModuleRegistryCalls(
      hasteModuleName,
      callExpressions,
      callExpressions.length,
      language,
    );
    const callExpression = callExpressions[0];
    const typeParameters = callExpression.typeParameters;
    const methodName = callExpression.callee.property.name;
    throwIfWrongNumberOfCallExpressionArgs(
      hasteModuleName,
      callExpression,
      methodName,
      callExpression.arguments.length,
      language,
    );
    if (callExpression.arguments[0].type !== 'StringLiteral') {
      const type = callExpression.arguments[0].type;
      throw new IncorrectModuleRegistryCallArgumentTypeParserError(
        hasteModuleName,
        callExpression.arguments[0],
        methodName,
        type,
        language,
      );
    }
    const $moduleName = callExpression.arguments[0].value;
    throwIfUntypedModule(
      typeParameters,
      hasteModuleName,
      callExpression,
      methodName,
      $moduleName,
      language,
    );
    throwIfIncorrectModuleRegistryCallTypeParameterParserError(
      hasteModuleName,
      typeParameters,
      methodName,
      $moduleName,
      language,
    );
    return $moduleName;
  });
  const moduleNames = moduleName == null ? [] : [moduleName];

  // Some module names use platform suffix to indicate platform-exclusive modules.
  // Eventually this should be made explicit in the Flow type itself.
  // Also check the hasteModuleName for platform suffix.
  // Note: this shape is consistent with ComponentSchema.
  const _verifyPlatforms = verifyPlatforms(hasteModuleName, moduleNames),
    cxxOnly = _verifyPlatforms.cxxOnly,
    excludedPlatforms = _verifyPlatforms.excludedPlatforms;

  // $FlowFixMe[missing-type-arg]
  return moduleSpec.body.body
    .filter(
      property =>
        property.type === 'TSMethodSignature' ||
        property.type === 'TSPropertySignature',
    )
    .map(property => {
      const aliasMap = {};
      return tryParse(() => ({
        aliasMap: aliasMap,
        propertyShape: buildPropertySchema(
          hasteModuleName,
          property,
          types,
          aliasMap,
          tryParse,
          cxxOnly,
        ),
      }));
    })
    .filter(Boolean)
    .reduce(
      (moduleSchema, {aliasMap, propertyShape}) => {
        return {
          type: 'NativeModule',
          aliases: _objectSpread(
            _objectSpread({}, moduleSchema.aliases),
            aliasMap,
          ),
          spec: {
            properties: [...moduleSchema.spec.properties, propertyShape],
          },
          moduleNames: moduleSchema.moduleNames,
          excludedPlatforms: moduleSchema.excludedPlatforms,
        };
      },
      {
        type: 'NativeModule',
        aliases: {},
        spec: {
          properties: [],
        },
        moduleNames: moduleNames,
        excludedPlatforms:
          excludedPlatforms.length !== 0 ? [...excludedPlatforms] : undefined,
      },
    );
}
module.exports = {
  buildModuleSchema,
};
