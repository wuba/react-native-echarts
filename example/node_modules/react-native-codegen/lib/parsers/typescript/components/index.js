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
const _require = require('../utils'),
  getTypes = _require.getTypes;
const _require2 = require('./commands'),
  getCommands = _require2.getCommands;
const _require3 = require('./events'),
  getEvents = _require3.getEvents;
const _require4 = require('./extends'),
  categorizeProps = _require4.categorizeProps;
const _require5 = require('./options'),
  getCommandOptions = _require5.getCommandOptions,
  getOptions = _require5.getOptions;
const _require6 = require('./props'),
  getProps = _require6.getProps;
const _require7 = require('./componentsUtils.js'),
  getProperties = _require7.getProperties;

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
function findComponentConfig(ast) {
  const foundConfigs = [];
  const defaultExports = ast.body.filter(
    node => node.type === 'ExportDefaultDeclaration',
  );
  defaultExports.forEach(statement => {
    let declaration = statement.declaration;

    // codegenNativeComponent can be nested inside a cast
    // expression so we need to go one level deeper
    if (declaration.type === 'TSAsExpression') {
      declaration = declaration.expression;
    }
    try {
      if (declaration.callee.name === 'codegenNativeComponent') {
        const typeArgumentParams = declaration.typeParameters.params;
        const funcArgumentParams = declaration.arguments;
        const nativeComponentType = {
          propsTypeName: typeArgumentParams[0].typeName.name,
          componentName: funcArgumentParams[0].value,
        };
        if (funcArgumentParams.length > 1) {
          nativeComponentType.optionsExpression = funcArgumentParams[1];
        }
        foundConfigs.push(nativeComponentType);
      }
    } catch (e) {
      // ignore
    }
  });
  if (foundConfigs.length === 0) {
    throw new Error('Could not find component config for native component');
  }
  if (foundConfigs.length > 1) {
    throw new Error('Only one component is supported per file');
  }
  const foundConfig = foundConfigs[0];
  const namedExports = ast.body.filter(
    node => node.type === 'ExportNamedDeclaration',
  );
  const commandsTypeNames = namedExports
    .map(statement => {
      let callExpression;
      let calleeName;
      try {
        callExpression = statement.declaration.declarations[0].init;
        calleeName = callExpression.callee.name;
      } catch (e) {
        return;
      }
      if (calleeName !== 'codegenNativeCommands') {
        return;
      }

      // const statement.declaration.declarations[0].init
      if (callExpression.arguments.length !== 1) {
        throw new Error(
          'codegenNativeCommands must be passed options including the supported commands',
        );
      }
      const typeArgumentParam = callExpression.typeParameters.params[0];
      if (typeArgumentParam.type !== 'TSTypeReference') {
        throw new Error(
          "codegenNativeCommands doesn't support inline definitions. Specify a file local type alias",
        );
      }
      return {
        commandTypeName: typeArgumentParam.typeName.name,
        commandOptionsExpression: callExpression.arguments[0],
      };
    })
    .filter(Boolean);
  if (commandsTypeNames.length > 1) {
    throw new Error('codegenNativeCommands may only be called once in a file');
  }
  return _objectSpread(
    _objectSpread({}, foundConfig),
    {},
    {
      commandTypeName:
        commandsTypeNames[0] == null
          ? null
          : commandsTypeNames[0].commandTypeName,
      commandOptionsExpression:
        commandsTypeNames[0] == null
          ? null
          : commandsTypeNames[0].commandOptionsExpression,
    },
  );
}
function getCommandProperties(
  /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */
  commandTypeName,
  types,
  commandOptions,
) {
  if (commandTypeName == null) {
    return [];
  }
  const typeAlias = types[commandTypeName];
  if (typeAlias.type !== 'TSInterfaceDeclaration') {
    throw new Error(
      `The type argument for codegenNativeCommands must be an interface, received ${typeAlias.type}`,
    );
  }
  let properties;
  try {
    properties = typeAlias.body.body;
  } catch (e) {
    throw new Error(
      `Failed to find type definition for "${commandTypeName}", please check that you have a valid codegen typescript file`,
    );
  }
  const typeScriptPropertyNames = properties
    .map(property => property && property.key && property.key.name)
    .filter(Boolean);
  if (commandOptions == null || commandOptions.supportedCommands == null) {
    throw new Error(
      'codegenNativeCommands must be given an options object with supportedCommands array',
    );
  }
  if (
    commandOptions.supportedCommands.length !==
      typeScriptPropertyNames.length ||
    !commandOptions.supportedCommands.every(supportedCommand =>
      typeScriptPropertyNames.includes(supportedCommand),
    )
  ) {
    throw new Error(
      `codegenNativeCommands expected the same supportedCommands specified in the ${commandTypeName} interface: ${typeScriptPropertyNames.join(
        ', ',
      )}`,
    );
  }
  return properties;
}

// $FlowFixMe[unclear-type] TODO(T108222691): Use flow-types for @babel/parser

// $FlowFixMe[signature-verification-failure] TODO(T108222691): Use flow-types for @babel/parser
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
function buildComponentSchema(ast) {
  const _findComponentConfig = findComponentConfig(ast),
    componentName = _findComponentConfig.componentName,
    propsTypeName = _findComponentConfig.propsTypeName,
    commandTypeName = _findComponentConfig.commandTypeName,
    commandOptionsExpression = _findComponentConfig.commandOptionsExpression,
    optionsExpression = _findComponentConfig.optionsExpression;
  const types = getTypes(ast);
  const propProperties = getProperties(propsTypeName, types);
  const commandOptions = getCommandOptions(commandOptionsExpression);
  const commandProperties = getCommandProperties(
    commandTypeName,
    types,
    commandOptions,
  );
  const options = getOptions(optionsExpression);
  const extendsProps = [];
  const componentPropAsts = [];
  const componentEventAsts = [];
  categorizeProps(
    propProperties,
    types,
    extendsProps,
    componentPropAsts,
    componentEventAsts,
  );
  const props = getProps(componentPropAsts, types);
  const events = getEvents(componentEventAsts, types);
  const commands = getCommands(commandProperties, types);
  return {
    filename: componentName,
    componentName,
    options,
    extendsProps,
    events,
    props,
    commands,
  };
}
module.exports = {
  buildComponentSchema,
};
