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
const _require = require('./errors'),
  ParserError = _require.ParserError;
const _require2 = require('./parsers-commons'),
  wrapModuleSchema = _require2.wrapModuleSchema;
const fs = require('fs');
const path = require('path');
const invariant = require('invariant');
function extractNativeModuleName(filename) {
  // this should drop everything after the file name. For Example it will drop:
  // .android.js, .android.ts, .android.tsx, .ios.js, .ios.ts, .ios.tsx, .js, .ts, .tsx
  return path.basename(filename).split('.')[0];
}
function createParserErrorCapturer() {
  const errors = [];
  function guard(fn) {
    try {
      return fn();
    } catch (error) {
      if (!(error instanceof ParserError)) {
        throw error;
      }
      errors.push(error);
      return null;
    }
  }
  return [errors, guard];
}
function verifyPlatforms(hasteModuleName, moduleNames) {
  let cxxOnly = false;
  const excludedPlatforms = new Set();
  const namesToValidate = [...moduleNames, hasteModuleName];
  namesToValidate.forEach(name => {
    if (name.endsWith('Android')) {
      excludedPlatforms.add('iOS');
      return;
    }
    if (name.endsWith('IOS')) {
      excludedPlatforms.add('android');
      return;
    }
    if (name.endsWith('Cxx')) {
      cxxOnly = true;
      excludedPlatforms.add('iOS');
      excludedPlatforms.add('android');
      return;
    }
  });
  return {
    cxxOnly,
    excludedPlatforms: Array.from(excludedPlatforms),
  };
}
function parseFile(filename, callback) {
  const contents = fs.readFileSync(filename, 'utf8');
  return callback(contents, filename);
}

// TODO(T108222691): Use flow-types for @babel/parser
function visit(astNode, visitor) {
  const queue = [astNode];
  while (queue.length !== 0) {
    let item = queue.shift();
    if (!(typeof item === 'object' && item != null)) {
      continue;
    }
    if (
      typeof item.type === 'string' &&
      typeof visitor[item.type] === 'function'
    ) {
      // Don't visit any children
      visitor[item.type](item);
    } else if (Array.isArray(item)) {
      queue.push(...item);
    } else {
      queue.push(...Object.values(item));
    }
  }
}
function buildSchemaFromConfigType(
  configType,
  filename,
  ast,
  wrapComponentSchema,
  buildComponentSchema,
  buildModuleSchema,
) {
  switch (configType) {
    case 'component': {
      return wrapComponentSchema(buildComponentSchema(ast));
    }
    case 'module': {
      if (filename === undefined || filename === null) {
        throw new Error('Filepath expected while parasing a module');
      }
      const nativeModuleName = extractNativeModuleName(filename);
      const _createParserErrorCap = createParserErrorCapturer(),
        _createParserErrorCap2 = _slicedToArray(_createParserErrorCap, 2),
        parsingErrors = _createParserErrorCap2[0],
        tryParse = _createParserErrorCap2[1];
      const schema = tryParse(() =>
        buildModuleSchema(nativeModuleName, ast, tryParse),
      );
      if (parsingErrors.length > 0) {
        /**
         * TODO(T77968131): We have two options:
         *  - Throw the first error, but indicate there are more then one errors.
         *  - Display all errors, nicely formatted.
         *
         * For the time being, we're just throw the first error.
         **/

        throw parsingErrors[0];
      }
      invariant(
        schema != null,
        'When there are no parsing errors, the schema should not be null',
      );
      return wrapModuleSchema(schema, nativeModuleName);
    }
    default:
      return {
        modules: {},
      };
  }
}
function getConfigType(
  // TODO(T71778680): Flow-type this node.
  ast,
  Visitor,
) {
  let infoMap = {
    isComponent: false,
    isModule: false,
  };
  visit(ast, Visitor(infoMap));
  const isModule = infoMap.isModule,
    isComponent = infoMap.isComponent;
  if (isModule && isComponent) {
    throw new Error(
      'Found type extending "TurboModule" and exported "codegenNativeComponent" declaration in one file. Split them into separated files.',
    );
  }
  if (isModule) {
    return 'module';
  } else if (isComponent) {
    return 'component';
  } else {
    return 'none';
  }
}

// TODO(T71778680): Flow-type ASTNodes.
function isModuleRegistryCall(node) {
  if (node.type !== 'CallExpression') {
    return false;
  }
  const callExpression = node;
  if (callExpression.callee.type !== 'MemberExpression') {
    return false;
  }
  const memberExpression = callExpression.callee;
  if (
    !(
      memberExpression.object.type === 'Identifier' &&
      memberExpression.object.name === 'TurboModuleRegistry'
    )
  ) {
    return false;
  }
  if (
    !(
      memberExpression.property.type === 'Identifier' &&
      (memberExpression.property.name === 'get' ||
        memberExpression.property.name === 'getEnforcing')
    )
  ) {
    return false;
  }
  if (memberExpression.computed) {
    return false;
  }
  return true;
}
module.exports = {
  getConfigType,
  extractNativeModuleName,
  createParserErrorCapturer,
  verifyPlatforms,
  parseFile,
  visit,
  buildSchemaFromConfigType,
  isModuleRegistryCall,
};
