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

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  isClass: true,
  isPropertyDefinitionWithNonComputedName: true,
  isClassMember: true,
  isClassMemberWithNonComputedName: true,
  isComment: true,
  isFunction: true,
  isMethodDefinitionWithNonComputedName: true,
  isMemberExpressionWithNonComputedProperty: true,
  isOptionalMemberExpressionWithNonComputedProperty: true,
  isObjectPropertyWithShorthand: true,
  isObjectPropertyWithNonComputedName: true,
  isBigIntLiteral: true,
  isBooleanLiteral: true,
  isNullLiteral: true,
  isNumericLiteral: true,
  isRegExpLiteral: true,
  isStringLiteral: true
};
exports.isBigIntLiteral = isBigIntLiteral;
exports.isBooleanLiteral = isBooleanLiteral;
exports.isClass = isClass;
exports.isClassMember = isClassMember;
exports.isClassMemberWithNonComputedName = isClassMemberWithNonComputedName;
exports.isComment = isComment;
exports.isFunction = isFunction;
exports.isMemberExpressionWithNonComputedProperty = isMemberExpressionWithNonComputedProperty;
exports.isMethodDefinitionWithNonComputedName = isMethodDefinitionWithNonComputedName;
exports.isNullLiteral = isNullLiteral;
exports.isNumericLiteral = isNumericLiteral;
exports.isObjectPropertyWithNonComputedName = isObjectPropertyWithNonComputedName;
exports.isObjectPropertyWithShorthand = isObjectPropertyWithShorthand;
exports.isOptionalMemberExpressionWithNonComputedProperty = isOptionalMemberExpressionWithNonComputedProperty;
exports.isPropertyDefinitionWithNonComputedName = isPropertyDefinitionWithNonComputedName;
exports.isRegExpLiteral = isRegExpLiteral;
exports.isStringLiteral = isStringLiteral;

var _predicates = require("./generated/predicates");

Object.keys(_predicates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _predicates[key]) return;
  exports[key] = _predicates[key];
});

function isClass(node) {
  return (0, _predicates.isClassDeclaration)(node) || (0, _predicates.isClassExpression)(node);
}

function isPropertyDefinitionWithNonComputedName(node) {
  return (0, _predicates.isPropertyDefinition)(node) && node.computed === false;
}

function isClassMember(node) {
  return (0, _predicates.isPropertyDefinition)(node) || (0, _predicates.isMethodDefinition)(node);
}

function isClassMemberWithNonComputedName(node) {
  return isClassMember(node) && node.computed === false;
}

function isComment(node) {
  return (0, _predicates.isBlockComment)(node) || (0, _predicates.isLineComment)(node);
}

function isFunction(node) {
  return (0, _predicates.isArrowFunctionExpression)(node) || (0, _predicates.isFunctionDeclaration)(node) || (0, _predicates.isFunctionExpression)(node);
}

function isMethodDefinitionWithNonComputedName(node) {
  return (0, _predicates.isMethodDefinition)(node) && node.computed === false;
}

function isMemberExpressionWithNonComputedProperty(node) {
  return (0, _predicates.isMemberExpression)(node) && node.computed === false;
}

function isOptionalMemberExpressionWithNonComputedProperty(node) {
  return (0, _predicates.isMemberExpression)(node) && node.computed === false;
}

function isObjectPropertyWithShorthand(node) {
  return (0, _predicates.isProperty)(node) && node.shorthand === true;
}

function isObjectPropertyWithNonComputedName(node) {
  return (0, _predicates.isProperty)(node) && node.computed === false;
}

function isBigIntLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'bigint';
}

function isBooleanLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'boolean';
}

function isNullLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'null';
}

function isNumericLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'numeric';
}

function isRegExpLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'regexp';
}

function isStringLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'string';
}