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
    _require2.throwIfMoreThanOneModuleRegistryCalls;
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
  UnsupportedTypeAnnotationParserError =
    _require7.UnsupportedTypeAnnotationParserError,
  UnsupportedObjectPropertyTypeAnnotationParserError =
    _require7.UnsupportedObjectPropertyTypeAnnotationParserError,
  IncorrectModuleRegistryCallArgumentTypeParserError =
    _require7.IncorrectModuleRegistryCallArgumentTypeParserError;
const _require8 = require('../../utils'),
  verifyPlatforms = _require8.verifyPlatforms;
const _require9 = require('../../error-utils'),
  throwIfUnsupportedFunctionReturnTypeAnnotationParserError =
    _require9.throwIfUnsupportedFunctionReturnTypeAnnotationParserError,
  throwIfModuleInterfaceNotFound = _require9.throwIfModuleInterfaceNotFound,
  throwIfModuleInterfaceIsMisnamed = _require9.throwIfModuleInterfaceIsMisnamed,
  throwIfPropertyValueTypeIsUnsupported =
    _require9.throwIfPropertyValueTypeIsUnsupported,
  throwIfUnusedModuleInterfaceParserError =
    _require9.throwIfUnusedModuleInterfaceParserError,
  throwIfWrongNumberOfCallExpressionArgs =
    _require9.throwIfWrongNumberOfCallExpressionArgs,
  throwIfIncorrectModuleRegistryCallTypeParameterParserError =
    _require9.throwIfIncorrectModuleRegistryCallTypeParameterParserError,
  throwIfUntypedModule = _require9.throwIfUntypedModule,
  throwIfModuleTypeIsUnsupported = _require9.throwIfModuleTypeIsUnsupported,
  throwIfMoreThanOneModuleInterfaceParserError =
    _require9.throwIfMoreThanOneModuleInterfaceParserError,
  throwIfUnsupportedFunctionParamTypeAnnotationParserError =
    _require9.throwIfUnsupportedFunctionParamTypeAnnotationParserError;
const _require10 = require('../parser.js'),
  FlowParser = _require10.FlowParser;
const _require11 = require('../../parsers-commons'),
  getKeyName = _require11.getKeyName;
const language = 'Flow';
const parser = new FlowParser();
function translateArrayTypeAnnotation(
  hasteModuleName,
  types,
  aliasMap,
  cxxOnly,
  flowArrayType,
  flowElementType,
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
          flowElementType,
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
        flowElementType,
        flowArrayType,
        'void',
        language,
      );
    }
    if (elementType.type === 'PromiseTypeAnnotation') {
      throw new UnsupportedArrayElementTypeAnnotationParserError(
        hasteModuleName,
        flowElementType,
        flowArrayType,
        'Promise',
        language,
      );
    }
    if (elementType.type === 'FunctionTypeAnnotation') {
      throw new UnsupportedArrayElementTypeAnnotationParserError(
        hasteModuleName,
        flowElementType,
        flowArrayType,
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
   * TODO(T71778680): Flow-type this node.
   */
  flowTypeAnnotation,
  types,
  aliasMap,
  tryParse,
  cxxOnly,
) {
  const _resolveTypeAnnotatio = resolveTypeAnnotation(
      flowTypeAnnotation,
      types,
    ),
    nullable = _resolveTypeAnnotatio.nullable,
    typeAnnotation = _resolveTypeAnnotatio.typeAnnotation,
    typeAliasResolutionStatus = _resolveTypeAnnotatio.typeAliasResolutionStatus;
  switch (typeAnnotation.type) {
    case 'GenericTypeAnnotation': {
      switch (typeAnnotation.id.name) {
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
        case '$ReadOnlyArray': {
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
        case '$ReadOnly': {
          assertGenericTypeAnnotationHasExactlyOneTypeParameter(
            hasteModuleName,
            typeAnnotation,
            language,
          );
          const _unwrapNullable3 = unwrapNullable(
              translateTypeAnnotation(
                hasteModuleName,
                typeAnnotation.typeParameters.params[0],
                types,
                aliasMap,
                tryParse,
                cxxOnly,
              ),
            ),
            _unwrapNullable4 = _slicedToArray(_unwrapNullable3, 2),
            paramType = _unwrapNullable4[0],
            isParamNullable = _unwrapNullable4[1];
          return wrapNullable(nullable || isParamNullable, paramType);
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
    case 'ObjectTypeAnnotation': {
      const objectTypeAnnotation = {
        type: 'ObjectTypeAnnotation',
        // $FlowFixMe[missing-type-arg]
        properties: [...typeAnnotation.properties, ...typeAnnotation.indexers]
          .map(property => {
            return tryParse(() => {
              if (
                property.type !== 'ObjectTypeProperty' &&
                property.type !== 'ObjectTypeIndexer'
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
              if (property.type === 'ObjectTypeIndexer') {
                return {
                  name,
                  optional,
                  typeAnnotation: emitObject(nullable),
                };
              }
              const _unwrapNullable5 = unwrapNullable(
                  translateTypeAnnotation(
                    hasteModuleName,
                    property.value,
                    types,
                    aliasMap,
                    tryParse,
                    cxxOnly,
                  ),
                ),
                _unwrapNullable6 = _slicedToArray(_unwrapNullable5, 2),
                propertyTypeAnnotation = _unwrapNullable6[0],
                isPropertyNullable = _unwrapNullable6[1];
              if (
                propertyTypeAnnotation.type === 'FunctionTypeAnnotation' ||
                propertyTypeAnnotation.type === 'PromiseTypeAnnotation' ||
                propertyTypeAnnotation.type === 'VoidTypeAnnotation'
              ) {
                throwIfPropertyValueTypeIsUnsupported(
                  hasteModuleName,
                  property.value,
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
    case 'BooleanTypeAnnotation': {
      return emitBoolean(nullable);
    }
    case 'NumberTypeAnnotation': {
      return emitNumber(nullable);
    }
    case 'VoidTypeAnnotation': {
      return emitVoid(nullable);
    }
    case 'StringTypeAnnotation': {
      return emitString(nullable);
    }
    case 'FunctionTypeAnnotation': {
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
    case 'UnionTypeAnnotation': {
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

    case 'MixedTypeAnnotation': {
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
  // TODO(T71778680): This is a FunctionTypeAnnotation. Type this.
  flowFunctionTypeAnnotation,
  types,
  aliasMap,
  tryParse,
  cxxOnly,
) {
  const params = [];
  for (const flowParam of flowFunctionTypeAnnotation.params) {
    const parsedParam = tryParse(() => {
      if (flowParam.name == null) {
        throw new UnnamedFunctionParamParserError(
          flowParam,
          hasteModuleName,
          language,
        );
      }
      const paramName = flowParam.name.name;
      const _unwrapNullable7 = unwrapNullable(
          translateTypeAnnotation(
            hasteModuleName,
            flowParam.typeAnnotation,
            types,
            aliasMap,
            tryParse,
            cxxOnly,
          ),
        ),
        _unwrapNullable8 = _slicedToArray(_unwrapNullable7, 2),
        paramTypeAnnotation = _unwrapNullable8[0],
        isParamTypeAnnotationNullable = _unwrapNullable8[1];
      if (
        paramTypeAnnotation.type === 'VoidTypeAnnotation' ||
        paramTypeAnnotation.type === 'PromiseTypeAnnotation'
      ) {
        return throwIfUnsupportedFunctionParamTypeAnnotationParserError(
          hasteModuleName,
          flowParam.typeAnnotation,
          paramName,
          paramTypeAnnotation.type,
        );
      }
      return {
        name: flowParam.name.name,
        optional: flowParam.optional,
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
  const _unwrapNullable9 = unwrapNullable(
      translateTypeAnnotation(
        hasteModuleName,
        flowFunctionTypeAnnotation.returnType,
        types,
        aliasMap,
        tryParse,
        cxxOnly,
      ),
    ),
    _unwrapNullable10 = _slicedToArray(_unwrapNullable9, 2),
    returnTypeAnnotation = _unwrapNullable10[0],
    isReturnTypeAnnotationNullable = _unwrapNullable10[1];
  throwIfUnsupportedFunctionReturnTypeAnnotationParserError(
    hasteModuleName,
    flowFunctionTypeAnnotation,
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
  // TODO(T71778680): This is an ObjectTypeProperty containing either:
  // - a FunctionTypeAnnotation or GenericTypeAnnotation
  // - a NullableTypeAnnoation containing a FunctionTypeAnnotation or GenericTypeAnnotation
  // Flow type this node
  property,
  types,
  aliasMap,
  tryParse,
  cxxOnly,
) {
  let nullable = false;
  let key = property.key,
    value = property.value;
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
    optional: property.optional,
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
    node.type === 'InterfaceDeclaration' &&
    node.extends.length === 1 &&
    node.extends[0].type === 'InterfaceExtends' &&
    node.extends[0].id.name === 'TurboModule'
  );
}
function buildModuleSchema(
  hasteModuleName,
  /**
   * TODO(T71778680): Flow-type this node.
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
    const typeArguments = callExpression.typeArguments;
    const methodName = callExpression.callee.property.name;
    throwIfWrongNumberOfCallExpressionArgs(
      hasteModuleName,
      callExpression,
      methodName,
      callExpression.arguments.length,
      language,
    );
    if (callExpression.arguments[0].type !== 'Literal') {
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
      typeArguments,
      hasteModuleName,
      callExpression,
      methodName,
      $moduleName,
      language,
    );
    throwIfIncorrectModuleRegistryCallTypeParameterParserError(
      hasteModuleName,
      typeArguments,
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
  return moduleSpec.body.properties
    .filter(property => property.type === 'ObjectTypeProperty')
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
