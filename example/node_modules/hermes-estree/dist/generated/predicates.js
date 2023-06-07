/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// lint directives to let us do some basic validation of generated files

/* eslint no-undef: 'error', no-unused-vars: ['error', {vars: "local"}], no-redeclare: 'error' */

/* global $NonMaybeType, $Partial, $ReadOnly, $ReadOnlyArray */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnyTypeAnnotation = isAnyTypeAnnotation;
exports.isArrayExpression = isArrayExpression;
exports.isArrayPattern = isArrayPattern;
exports.isArrayTypeAnnotation = isArrayTypeAnnotation;
exports.isArrowFunctionExpression = isArrowFunctionExpression;
exports.isAsKeyword = isAsKeyword;
exports.isAssignmentExpression = isAssignmentExpression;
exports.isAssignmentPattern = isAssignmentPattern;
exports.isAsterixToken = isAsterixToken;
exports.isAsyncKeyword = isAsyncKeyword;
exports.isAwaitExpression = isAwaitExpression;
exports.isAwaitKeyword = isAwaitKeyword;
exports.isBigIntLiteralTypeAnnotation = isBigIntLiteralTypeAnnotation;
exports.isBinaryExpression = isBinaryExpression;
exports.isBitwiseANDEqualToken = isBitwiseANDEqualToken;
exports.isBitwiseANDToken = isBitwiseANDToken;
exports.isBitwiseLeftShiftEqualToken = isBitwiseLeftShiftEqualToken;
exports.isBitwiseLeftShiftToken = isBitwiseLeftShiftToken;
exports.isBitwiseOREqualToken = isBitwiseOREqualToken;
exports.isBitwiseORToken = isBitwiseORToken;
exports.isBitwiseRightShiftEqualToken = isBitwiseRightShiftEqualToken;
exports.isBitwiseRightShiftToken = isBitwiseRightShiftToken;
exports.isBitwiseUnsignedRightShiftEqualToken = isBitwiseUnsignedRightShiftEqualToken;
exports.isBitwiseUnsignedRightShiftToken = isBitwiseUnsignedRightShiftToken;
exports.isBitwiseXOREqualToken = isBitwiseXOREqualToken;
exports.isBitwiseXORToken = isBitwiseXORToken;
exports.isBlockComment = isBlockComment;
exports.isBlockStatement = isBlockStatement;
exports.isBooleanLiteralTypeAnnotation = isBooleanLiteralTypeAnnotation;
exports.isBooleanTypeAnnotation = isBooleanTypeAnnotation;
exports.isBreakStatement = isBreakStatement;
exports.isBreakToken = isBreakToken;
exports.isCallExpression = isCallExpression;
exports.isCaseToken = isCaseToken;
exports.isCatchClause = isCatchClause;
exports.isCatchToken = isCatchToken;
exports.isChainExpression = isChainExpression;
exports.isClassBody = isClassBody;
exports.isClassDeclaration = isClassDeclaration;
exports.isClassExpression = isClassExpression;
exports.isClassImplements = isClassImplements;
exports.isClassToken = isClassToken;
exports.isClosingAngleBracketToken = isClosingAngleBracketToken;
exports.isClosingCurlyBracketToken = isClosingCurlyBracketToken;
exports.isClosingParenthesisToken = isClosingParenthesisToken;
exports.isColonToken = isColonToken;
exports.isCommaToken = isCommaToken;
exports.isConditionalExpression = isConditionalExpression;
exports.isConstToken = isConstToken;
exports.isContinueStatement = isContinueStatement;
exports.isContinueToken = isContinueToken;
exports.isDebuggerStatement = isDebuggerStatement;
exports.isDebuggerToken = isDebuggerToken;
exports.isDeclareClass = isDeclareClass;
exports.isDeclareExportAllDeclaration = isDeclareExportAllDeclaration;
exports.isDeclareExportDeclaration = isDeclareExportDeclaration;
exports.isDeclareFunction = isDeclareFunction;
exports.isDeclareInterface = isDeclareInterface;
exports.isDeclareKeyword = isDeclareKeyword;
exports.isDeclareModule = isDeclareModule;
exports.isDeclareModuleExports = isDeclareModuleExports;
exports.isDeclareOpaqueType = isDeclareOpaqueType;
exports.isDeclareTypeAlias = isDeclareTypeAlias;
exports.isDeclareVariable = isDeclareVariable;
exports.isDeclaredPredicate = isDeclaredPredicate;
exports.isDecrementToken = isDecrementToken;
exports.isDefaultToken = isDefaultToken;
exports.isDeleteToken = isDeleteToken;
exports.isDivideEqualToken = isDivideEqualToken;
exports.isDoToken = isDoToken;
exports.isDoWhileStatement = isDoWhileStatement;
exports.isDotDotDotToken = isDotDotDotToken;
exports.isDotToken = isDotToken;
exports.isElseToken = isElseToken;
exports.isEmptyStatement = isEmptyStatement;
exports.isEmptyTypeAnnotation = isEmptyTypeAnnotation;
exports.isEnumBooleanBody = isEnumBooleanBody;
exports.isEnumBooleanMember = isEnumBooleanMember;
exports.isEnumDeclaration = isEnumDeclaration;
exports.isEnumDefaultedMember = isEnumDefaultedMember;
exports.isEnumNumberBody = isEnumNumberBody;
exports.isEnumNumberMember = isEnumNumberMember;
exports.isEnumStringBody = isEnumStringBody;
exports.isEnumStringMember = isEnumStringMember;
exports.isEnumSymbolBody = isEnumSymbolBody;
exports.isEnumToken = isEnumToken;
exports.isEqualToken = isEqualToken;
exports.isExistsTypeAnnotation = isExistsTypeAnnotation;
exports.isExponentateEqualToken = isExponentateEqualToken;
exports.isExponentiationToken = isExponentiationToken;
exports.isExportAllDeclaration = isExportAllDeclaration;
exports.isExportDefaultDeclaration = isExportDefaultDeclaration;
exports.isExportNamedDeclaration = isExportNamedDeclaration;
exports.isExportSpecifier = isExportSpecifier;
exports.isExportToken = isExportToken;
exports.isExpressionStatement = isExpressionStatement;
exports.isExtendsToken = isExtendsToken;
exports.isFinallyToken = isFinallyToken;
exports.isForInStatement = isForInStatement;
exports.isForOfStatement = isForOfStatement;
exports.isForStatement = isForStatement;
exports.isForToken = isForToken;
exports.isForwardSlashToken = isForwardSlashToken;
exports.isFromKeyword = isFromKeyword;
exports.isFunctionDeclaration = isFunctionDeclaration;
exports.isFunctionExpression = isFunctionExpression;
exports.isFunctionToken = isFunctionToken;
exports.isFunctionTypeAnnotation = isFunctionTypeAnnotation;
exports.isFunctionTypeParam = isFunctionTypeParam;
exports.isGenericTypeAnnotation = isGenericTypeAnnotation;
exports.isGetKeyword = isGetKeyword;
exports.isGreaterThanOrEqualToToken = isGreaterThanOrEqualToToken;
exports.isGreaterThanToken = isGreaterThanToken;
exports.isIdentifier = isIdentifier;
exports.isIfStatement = isIfStatement;
exports.isIfToken = isIfToken;
exports.isImplementsToken = isImplementsToken;
exports.isImportAttribute = isImportAttribute;
exports.isImportDeclaration = isImportDeclaration;
exports.isImportDefaultSpecifier = isImportDefaultSpecifier;
exports.isImportExpression = isImportExpression;
exports.isImportNamespaceSpecifier = isImportNamespaceSpecifier;
exports.isImportSpecifier = isImportSpecifier;
exports.isImportToken = isImportToken;
exports.isInToken = isInToken;
exports.isIncrementToken = isIncrementToken;
exports.isIndexedAccessType = isIndexedAccessType;
exports.isInferredPredicate = isInferredPredicate;
exports.isInstanceOfToken = isInstanceOfToken;
exports.isInterfaceDeclaration = isInterfaceDeclaration;
exports.isInterfaceExtends = isInterfaceExtends;
exports.isInterfaceToken = isInterfaceToken;
exports.isInterfaceTypeAnnotation = isInterfaceTypeAnnotation;
exports.isIntersectionTypeAnnotation = isIntersectionTypeAnnotation;
exports.isIntersectionTypeToken = isIntersectionTypeToken;
exports.isJSXAttribute = isJSXAttribute;
exports.isJSXClosingElement = isJSXClosingElement;
exports.isJSXClosingFragment = isJSXClosingFragment;
exports.isJSXElement = isJSXElement;
exports.isJSXEmptyExpression = isJSXEmptyExpression;
exports.isJSXExpressionContainer = isJSXExpressionContainer;
exports.isJSXFragment = isJSXFragment;
exports.isJSXIdentifier = isJSXIdentifier;
exports.isJSXMemberExpression = isJSXMemberExpression;
exports.isJSXNamespacedName = isJSXNamespacedName;
exports.isJSXOpeningElement = isJSXOpeningElement;
exports.isJSXOpeningFragment = isJSXOpeningFragment;
exports.isJSXSpreadAttribute = isJSXSpreadAttribute;
exports.isJSXSpreadChild = isJSXSpreadChild;
exports.isJSXText = isJSXText;
exports.isLabeledStatement = isLabeledStatement;
exports.isLessThanOrEqualToToken = isLessThanOrEqualToToken;
exports.isLessThanToken = isLessThanToken;
exports.isLetKeyword = isLetKeyword;
exports.isLineComment = isLineComment;
exports.isLiteral = isLiteral;
exports.isLogicalANDEqualToken = isLogicalANDEqualToken;
exports.isLogicalANDToken = isLogicalANDToken;
exports.isLogicalExpression = isLogicalExpression;
exports.isLogicalNotToken = isLogicalNotToken;
exports.isLogicalOREqualToken = isLogicalOREqualToken;
exports.isLogicalORToken = isLogicalORToken;
exports.isLooseEqualToken = isLooseEqualToken;
exports.isLooseNotEqualToken = isLooseNotEqualToken;
exports.isMemberExpression = isMemberExpression;
exports.isMetaProperty = isMetaProperty;
exports.isMethodDefinition = isMethodDefinition;
exports.isMinusEqualToken = isMinusEqualToken;
exports.isMinusToken = isMinusToken;
exports.isMixedTypeAnnotation = isMixedTypeAnnotation;
exports.isModuleKeyword = isModuleKeyword;
exports.isMultiplyEqualToken = isMultiplyEqualToken;
exports.isNewExpression = isNewExpression;
exports.isNewToken = isNewToken;
exports.isNullLiteralTypeAnnotation = isNullLiteralTypeAnnotation;
exports.isNullableTypeAnnotation = isNullableTypeAnnotation;
exports.isNullishCoalesceEqualToken = isNullishCoalesceEqualToken;
exports.isNullishCoalesceToken = isNullishCoalesceToken;
exports.isNumberLiteralTypeAnnotation = isNumberLiteralTypeAnnotation;
exports.isNumberTypeAnnotation = isNumberTypeAnnotation;
exports.isObjectExpression = isObjectExpression;
exports.isObjectPattern = isObjectPattern;
exports.isObjectTypeAnnotation = isObjectTypeAnnotation;
exports.isObjectTypeCallProperty = isObjectTypeCallProperty;
exports.isObjectTypeIndexer = isObjectTypeIndexer;
exports.isObjectTypeInternalSlot = isObjectTypeInternalSlot;
exports.isObjectTypeProperty = isObjectTypeProperty;
exports.isObjectTypeSpreadProperty = isObjectTypeSpreadProperty;
exports.isOfKeyword = isOfKeyword;
exports.isOpaqueType = isOpaqueType;
exports.isOpeningAngleBracketToken = isOpeningAngleBracketToken;
exports.isOpeningCurlyBracketToken = isOpeningCurlyBracketToken;
exports.isOpeningParenthesisToken = isOpeningParenthesisToken;
exports.isOptionalChainToken = isOptionalChainToken;
exports.isOptionalIndexedAccessType = isOptionalIndexedAccessType;
exports.isPercentToken = isPercentToken;
exports.isPlusEqualToken = isPlusEqualToken;
exports.isPlusToken = isPlusToken;
exports.isPrivateIdentifier = isPrivateIdentifier;
exports.isProperty = isProperty;
exports.isPropertyDefinition = isPropertyDefinition;
exports.isQualifiedTypeIdentifier = isQualifiedTypeIdentifier;
exports.isQuestionMarkToken = isQuestionMarkToken;
exports.isRemainderEqualToken = isRemainderEqualToken;
exports.isRestElement = isRestElement;
exports.isReturnStatement = isReturnStatement;
exports.isReturnToken = isReturnToken;
exports.isSemicolonToken = isSemicolonToken;
exports.isSequenceExpression = isSequenceExpression;
exports.isSetKeyword = isSetKeyword;
exports.isSpreadElement = isSpreadElement;
exports.isStaticToken = isStaticToken;
exports.isStrictEqualToken = isStrictEqualToken;
exports.isStrictNotEqualToken = isStrictNotEqualToken;
exports.isStringLiteralTypeAnnotation = isStringLiteralTypeAnnotation;
exports.isStringTypeAnnotation = isStringTypeAnnotation;
exports.isSuper = isSuper;
exports.isSuperToken = isSuperToken;
exports.isSwitchCase = isSwitchCase;
exports.isSwitchStatement = isSwitchStatement;
exports.isSwitchToken = isSwitchToken;
exports.isSymbolTypeAnnotation = isSymbolTypeAnnotation;
exports.isTaggedTemplateExpression = isTaggedTemplateExpression;
exports.isTemplateElement = isTemplateElement;
exports.isTemplateLiteral = isTemplateLiteral;
exports.isThisExpression = isThisExpression;
exports.isThisToken = isThisToken;
exports.isThisTypeAnnotation = isThisTypeAnnotation;
exports.isThrowStatement = isThrowStatement;
exports.isThrowToken = isThrowToken;
exports.isTryStatement = isTryStatement;
exports.isTryToken = isTryToken;
exports.isTupleTypeAnnotation = isTupleTypeAnnotation;
exports.isTypeAlias = isTypeAlias;
exports.isTypeAnnotation = isTypeAnnotation;
exports.isTypeCastExpression = isTypeCastExpression;
exports.isTypeKeyword = isTypeKeyword;
exports.isTypeOfToken = isTypeOfToken;
exports.isTypeParameter = isTypeParameter;
exports.isTypeParameterDeclaration = isTypeParameterDeclaration;
exports.isTypeParameterInstantiation = isTypeParameterInstantiation;
exports.isTypeofTypeAnnotation = isTypeofTypeAnnotation;
exports.isUnaryExpression = isUnaryExpression;
exports.isUnaryNegationToken = isUnaryNegationToken;
exports.isUnionTypeAnnotation = isUnionTypeAnnotation;
exports.isUnionTypeToken = isUnionTypeToken;
exports.isUpdateExpression = isUpdateExpression;
exports.isVarToken = isVarToken;
exports.isVariableDeclaration = isVariableDeclaration;
exports.isVariableDeclarator = isVariableDeclarator;
exports.isVariance = isVariance;
exports.isVoidToken = isVoidToken;
exports.isVoidTypeAnnotation = isVoidTypeAnnotation;
exports.isWhileStatement = isWhileStatement;
exports.isWhileToken = isWhileToken;
exports.isWithStatement = isWithStatement;
exports.isWithToken = isWithToken;
exports.isYieldExpression = isYieldExpression;
exports.isYieldToken = isYieldToken;

function isAnyTypeAnnotation(node) {
  return node.type === 'AnyTypeAnnotation';
}

function isArrayExpression(node) {
  return node.type === 'ArrayExpression';
}

function isArrayPattern(node) {
  return node.type === 'ArrayPattern';
}

function isArrayTypeAnnotation(node) {
  return node.type === 'ArrayTypeAnnotation';
}

function isArrowFunctionExpression(node) {
  return node.type === 'ArrowFunctionExpression';
}

function isAssignmentExpression(node) {
  return node.type === 'AssignmentExpression';
}

function isAssignmentPattern(node) {
  return node.type === 'AssignmentPattern';
}

function isAwaitExpression(node) {
  return node.type === 'AwaitExpression';
}

function isBigIntLiteralTypeAnnotation(node) {
  return node.type === 'BigIntLiteralTypeAnnotation';
}

function isBinaryExpression(node) {
  return node.type === 'BinaryExpression';
}

function isBlockStatement(node) {
  return node.type === 'BlockStatement';
}

function isBooleanLiteralTypeAnnotation(node) {
  return node.type === 'BooleanLiteralTypeAnnotation';
}

function isBooleanTypeAnnotation(node) {
  return node.type === 'BooleanTypeAnnotation';
}

function isBreakStatement(node) {
  return node.type === 'BreakStatement';
}

function isCallExpression(node) {
  return node.type === 'CallExpression';
}

function isCatchClause(node) {
  return node.type === 'CatchClause';
}

function isChainExpression(node) {
  return node.type === 'ChainExpression';
}

function isClassBody(node) {
  return node.type === 'ClassBody';
}

function isClassDeclaration(node) {
  return node.type === 'ClassDeclaration';
}

function isClassExpression(node) {
  return node.type === 'ClassExpression';
}

function isClassImplements(node) {
  return node.type === 'ClassImplements';
}

function isConditionalExpression(node) {
  return node.type === 'ConditionalExpression';
}

function isContinueStatement(node) {
  return node.type === 'ContinueStatement';
}

function isDebuggerStatement(node) {
  return node.type === 'DebuggerStatement';
}

function isDeclareClass(node) {
  return node.type === 'DeclareClass';
}

function isDeclaredPredicate(node) {
  return node.type === 'DeclaredPredicate';
}

function isDeclareExportAllDeclaration(node) {
  return node.type === 'DeclareExportAllDeclaration';
}

function isDeclareExportDeclaration(node) {
  return node.type === 'DeclareExportDeclaration';
}

function isDeclareFunction(node) {
  return node.type === 'DeclareFunction';
}

function isDeclareInterface(node) {
  return node.type === 'DeclareInterface';
}

function isDeclareModule(node) {
  return node.type === 'DeclareModule';
}

function isDeclareModuleExports(node) {
  return node.type === 'DeclareModuleExports';
}

function isDeclareOpaqueType(node) {
  return node.type === 'DeclareOpaqueType';
}

function isDeclareTypeAlias(node) {
  return node.type === 'DeclareTypeAlias';
}

function isDeclareVariable(node) {
  return node.type === 'DeclareVariable';
}

function isDoWhileStatement(node) {
  return node.type === 'DoWhileStatement';
}

function isEmptyStatement(node) {
  return node.type === 'EmptyStatement';
}

function isEmptyTypeAnnotation(node) {
  return node.type === 'EmptyTypeAnnotation';
}

function isEnumBooleanBody(node) {
  return node.type === 'EnumBooleanBody';
}

function isEnumBooleanMember(node) {
  return node.type === 'EnumBooleanMember';
}

function isEnumDeclaration(node) {
  return node.type === 'EnumDeclaration';
}

function isEnumDefaultedMember(node) {
  return node.type === 'EnumDefaultedMember';
}

function isEnumNumberBody(node) {
  return node.type === 'EnumNumberBody';
}

function isEnumNumberMember(node) {
  return node.type === 'EnumNumberMember';
}

function isEnumStringBody(node) {
  return node.type === 'EnumStringBody';
}

function isEnumStringMember(node) {
  return node.type === 'EnumStringMember';
}

function isEnumSymbolBody(node) {
  return node.type === 'EnumSymbolBody';
}

function isExistsTypeAnnotation(node) {
  return node.type === 'ExistsTypeAnnotation';
}

function isExportAllDeclaration(node) {
  return node.type === 'ExportAllDeclaration';
}

function isExportDefaultDeclaration(node) {
  return node.type === 'ExportDefaultDeclaration';
}

function isExportNamedDeclaration(node) {
  return node.type === 'ExportNamedDeclaration';
}

function isExportSpecifier(node) {
  return node.type === 'ExportSpecifier';
}

function isExpressionStatement(node) {
  return node.type === 'ExpressionStatement';
}

function isForInStatement(node) {
  return node.type === 'ForInStatement';
}

function isForOfStatement(node) {
  return node.type === 'ForOfStatement';
}

function isForStatement(node) {
  return node.type === 'ForStatement';
}

function isFunctionDeclaration(node) {
  return node.type === 'FunctionDeclaration';
}

function isFunctionExpression(node) {
  return node.type === 'FunctionExpression';
}

function isFunctionTypeAnnotation(node) {
  return node.type === 'FunctionTypeAnnotation';
}

function isFunctionTypeParam(node) {
  return node.type === 'FunctionTypeParam';
}

function isGenericTypeAnnotation(node) {
  return node.type === 'GenericTypeAnnotation';
}

function isIdentifier(node) {
  return node.type === 'Identifier';
}

function isIfStatement(node) {
  return node.type === 'IfStatement';
}

function isImportAttribute(node) {
  return node.type === 'ImportAttribute';
}

function isImportDeclaration(node) {
  return node.type === 'ImportDeclaration';
}

function isImportDefaultSpecifier(node) {
  return node.type === 'ImportDefaultSpecifier';
}

function isImportExpression(node) {
  return node.type === 'ImportExpression';
}

function isImportNamespaceSpecifier(node) {
  return node.type === 'ImportNamespaceSpecifier';
}

function isImportSpecifier(node) {
  return node.type === 'ImportSpecifier';
}

function isIndexedAccessType(node) {
  return node.type === 'IndexedAccessType';
}

function isInferredPredicate(node) {
  return node.type === 'InferredPredicate';
}

function isInterfaceDeclaration(node) {
  return node.type === 'InterfaceDeclaration';
}

function isInterfaceExtends(node) {
  return node.type === 'InterfaceExtends';
}

function isInterfaceTypeAnnotation(node) {
  return node.type === 'InterfaceTypeAnnotation';
}

function isIntersectionTypeAnnotation(node) {
  return node.type === 'IntersectionTypeAnnotation';
}

function isJSXAttribute(node) {
  return node.type === 'JSXAttribute';
}

function isJSXClosingElement(node) {
  return node.type === 'JSXClosingElement';
}

function isJSXClosingFragment(node) {
  return node.type === 'JSXClosingFragment';
}

function isJSXElement(node) {
  return node.type === 'JSXElement';
}

function isJSXEmptyExpression(node) {
  return node.type === 'JSXEmptyExpression';
}

function isJSXExpressionContainer(node) {
  return node.type === 'JSXExpressionContainer';
}

function isJSXFragment(node) {
  return node.type === 'JSXFragment';
}

function isJSXIdentifier(node) {
  return node.type === 'JSXIdentifier';
}

function isJSXMemberExpression(node) {
  return node.type === 'JSXMemberExpression';
}

function isJSXNamespacedName(node) {
  return node.type === 'JSXNamespacedName';
}

function isJSXOpeningElement(node) {
  return node.type === 'JSXOpeningElement';
}

function isJSXOpeningFragment(node) {
  return node.type === 'JSXOpeningFragment';
}

function isJSXSpreadAttribute(node) {
  return node.type === 'JSXSpreadAttribute';
}

function isJSXSpreadChild(node) {
  return node.type === 'JSXSpreadChild';
}

function isJSXText(node) {
  return node.type === 'JSXText';
}

function isLabeledStatement(node) {
  return node.type === 'LabeledStatement';
}

function isLogicalExpression(node) {
  return node.type === 'LogicalExpression';
}

function isMemberExpression(node) {
  return node.type === 'MemberExpression';
}

function isMetaProperty(node) {
  return node.type === 'MetaProperty';
}

function isMethodDefinition(node) {
  return node.type === 'MethodDefinition';
}

function isMixedTypeAnnotation(node) {
  return node.type === 'MixedTypeAnnotation';
}

function isNewExpression(node) {
  return node.type === 'NewExpression';
}

function isNullableTypeAnnotation(node) {
  return node.type === 'NullableTypeAnnotation';
}

function isNullLiteralTypeAnnotation(node) {
  return node.type === 'NullLiteralTypeAnnotation';
}

function isNumberLiteralTypeAnnotation(node) {
  return node.type === 'NumberLiteralTypeAnnotation';
}

function isNumberTypeAnnotation(node) {
  return node.type === 'NumberTypeAnnotation';
}

function isObjectExpression(node) {
  return node.type === 'ObjectExpression';
}

function isObjectPattern(node) {
  return node.type === 'ObjectPattern';
}

function isObjectTypeAnnotation(node) {
  return node.type === 'ObjectTypeAnnotation';
}

function isObjectTypeCallProperty(node) {
  return node.type === 'ObjectTypeCallProperty';
}

function isObjectTypeIndexer(node) {
  return node.type === 'ObjectTypeIndexer';
}

function isObjectTypeInternalSlot(node) {
  return node.type === 'ObjectTypeInternalSlot';
}

function isObjectTypeProperty(node) {
  return node.type === 'ObjectTypeProperty';
}

function isObjectTypeSpreadProperty(node) {
  return node.type === 'ObjectTypeSpreadProperty';
}

function isOpaqueType(node) {
  return node.type === 'OpaqueType';
}

function isOptionalIndexedAccessType(node) {
  return node.type === 'OptionalIndexedAccessType';
}

function isPrivateIdentifier(node) {
  return node.type === 'PrivateIdentifier';
}

function isProperty(node) {
  return node.type === 'Property';
}

function isPropertyDefinition(node) {
  return node.type === 'PropertyDefinition';
}

function isQualifiedTypeIdentifier(node) {
  return node.type === 'QualifiedTypeIdentifier';
}

function isRestElement(node) {
  return node.type === 'RestElement';
}

function isReturnStatement(node) {
  return node.type === 'ReturnStatement';
}

function isSequenceExpression(node) {
  return node.type === 'SequenceExpression';
}

function isSpreadElement(node) {
  return node.type === 'SpreadElement';
}

function isStringLiteralTypeAnnotation(node) {
  return node.type === 'StringLiteralTypeAnnotation';
}

function isStringTypeAnnotation(node) {
  return node.type === 'StringTypeAnnotation';
}

function isSuper(node) {
  return node.type === 'Super';
}

function isSwitchCase(node) {
  return node.type === 'SwitchCase';
}

function isSwitchStatement(node) {
  return node.type === 'SwitchStatement';
}

function isSymbolTypeAnnotation(node) {
  return node.type === 'SymbolTypeAnnotation';
}

function isTaggedTemplateExpression(node) {
  return node.type === 'TaggedTemplateExpression';
}

function isTemplateElement(node) {
  return node.type === 'TemplateElement';
}

function isTemplateLiteral(node) {
  return node.type === 'TemplateLiteral';
}

function isThisExpression(node) {
  return node.type === 'ThisExpression';
}

function isThisTypeAnnotation(node) {
  return node.type === 'ThisTypeAnnotation';
}

function isThrowStatement(node) {
  return node.type === 'ThrowStatement';
}

function isTryStatement(node) {
  return node.type === 'TryStatement';
}

function isTupleTypeAnnotation(node) {
  return node.type === 'TupleTypeAnnotation';
}

function isTypeAlias(node) {
  return node.type === 'TypeAlias';
}

function isTypeAnnotation(node) {
  return node.type === 'TypeAnnotation';
}

function isTypeCastExpression(node) {
  return node.type === 'TypeCastExpression';
}

function isTypeofTypeAnnotation(node) {
  return node.type === 'TypeofTypeAnnotation';
}

function isTypeParameter(node) {
  return node.type === 'TypeParameter';
}

function isTypeParameterDeclaration(node) {
  return node.type === 'TypeParameterDeclaration';
}

function isTypeParameterInstantiation(node) {
  return node.type === 'TypeParameterInstantiation';
}

function isUnaryExpression(node) {
  return node.type === 'UnaryExpression';
}

function isUnionTypeAnnotation(node) {
  return node.type === 'UnionTypeAnnotation';
}

function isUpdateExpression(node) {
  return node.type === 'UpdateExpression';
}

function isVariableDeclaration(node) {
  return node.type === 'VariableDeclaration';
}

function isVariableDeclarator(node) {
  return node.type === 'VariableDeclarator';
}

function isVariance(node) {
  return node.type === 'Variance';
}

function isVoidTypeAnnotation(node) {
  return node.type === 'VoidTypeAnnotation';
}

function isWhileStatement(node) {
  return node.type === 'WhileStatement';
}

function isWithStatement(node) {
  return node.type === 'WithStatement';
}

function isYieldExpression(node) {
  return node.type === 'YieldExpression';
}

function isLiteral(node) {
  return node.type === 'Literal';
}

function isLineComment(node) {
  return node.type === 'Line';
}

function isBlockComment(node) {
  return node.type === 'Block';
}

function isMinusToken(node) {
  return node.type === 'Punctuator' && node.value === '-';
}

function isPlusToken(node) {
  return node.type === 'Punctuator' && node.value === '+';
}

function isLogicalNotToken(node) {
  return node.type === 'Punctuator' && node.value === '!';
}

function isUnaryNegationToken(node) {
  return node.type === 'Punctuator' && node.value === '~';
}

function isTypeOfToken(node) {
  return node.type === 'Keyword' && node.value === 'typeof';
}

function isVoidToken(node) {
  return node.type === 'Keyword' && node.value === 'void';
}

function isDeleteToken(node) {
  return node.type === 'Keyword' && node.value === 'delete';
}

function isLooseEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '==';
}

function isLooseNotEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '!=';
}

function isStrictEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '===';
}

function isStrictNotEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '!==';
}

function isLessThanToken(node) {
  return node.type === 'Punctuator' && node.value === '<';
}

function isLessThanOrEqualToToken(node) {
  return node.type === 'Punctuator' && node.value === '<=';
}

function isGreaterThanToken(node) {
  return node.type === 'Punctuator' && node.value === '>';
}

function isGreaterThanOrEqualToToken(node) {
  return node.type === 'Punctuator' && node.value === '>=';
}

function isBitwiseLeftShiftToken(node) {
  return node.type === 'Punctuator' && node.value === '<<';
}

function isBitwiseRightShiftToken(node) {
  return node.type === 'Punctuator' && node.value === '>>';
}

function isBitwiseUnsignedRightShiftToken(node) {
  return node.type === 'Punctuator' && node.value === '>>>';
}

function isAsterixToken(node) {
  return node.type === 'Punctuator' && node.value === '*';
}

function isForwardSlashToken(node) {
  return node.type === 'Punctuator' && node.value === '/';
}

function isPercentToken(node) {
  return node.type === 'Punctuator' && node.value === '%';
}

function isExponentiationToken(node) {
  return node.type === 'Punctuator' && node.value === '**';
}

function isBitwiseORToken(node) {
  return node.type === 'Punctuator' && node.value === '|';
}

function isBitwiseXORToken(node) {
  return node.type === 'Punctuator' && node.value === '^';
}

function isBitwiseANDToken(node) {
  return node.type === 'Punctuator' && node.value === '&';
}

function isInToken(node) {
  return node.type === 'Keyword' && node.value === 'in';
}

function isInstanceOfToken(node) {
  return node.type === 'Keyword' && node.value === 'instanceof';
}

function isLogicalORToken(node) {
  return node.type === 'Punctuator' && node.value === '||';
}

function isLogicalANDToken(node) {
  return node.type === 'Punctuator' && node.value === '&&';
}

function isNullishCoalesceToken(node) {
  return node.type === 'Punctuator' && node.value === '??';
}

function isEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '=';
}

function isPlusEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '+=';
}

function isMinusEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '-=';
}

function isMultiplyEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '*=';
}

function isDivideEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '/=';
}

function isRemainderEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '%=';
}

function isExponentateEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '**=';
}

function isBitwiseLeftShiftEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '<<=';
}

function isBitwiseRightShiftEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '>>=';
}

function isBitwiseUnsignedRightShiftEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '>>>=';
}

function isBitwiseOREqualToken(node) {
  return node.type === 'Punctuator' && node.value === '|=';
}

function isBitwiseXOREqualToken(node) {
  return node.type === 'Punctuator' && node.value === '^=';
}

function isBitwiseANDEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '&=';
}

function isLogicalOREqualToken(node) {
  return node.type === 'Punctuator' && node.value === '||=';
}

function isLogicalANDEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '&&=';
}

function isNullishCoalesceEqualToken(node) {
  return node.type === 'Punctuator' && node.value === '??=';
}

function isIncrementToken(node) {
  return node.type === 'Punctuator' && node.value === '++';
}

function isDecrementToken(node) {
  return node.type === 'Punctuator' && node.value === '--';
}

function isUnionTypeToken(node) {
  return node.type === 'Punctuator' && node.value === '|';
}

function isIntersectionTypeToken(node) {
  return node.type === 'Punctuator' && node.value === '&';
}

function isBreakToken(node) {
  return node.type === 'Keyword' && node.value === 'break';
}

function isCaseToken(node) {
  return node.type === 'Keyword' && node.value === 'case';
}

function isCatchToken(node) {
  return node.type === 'Keyword' && node.value === 'catch';
}

function isClassToken(node) {
  return node.type === 'Keyword' && node.value === 'class';
}

function isConstToken(node) {
  return node.type === 'Keyword' && node.value === 'const';
}

function isContinueToken(node) {
  return node.type === 'Keyword' && node.value === 'continue';
}

function isDebuggerToken(node) {
  return node.type === 'Keyword' && node.value === 'debugger';
}

function isDefaultToken(node) {
  return node.type === 'Keyword' && node.value === 'default';
}

function isDoToken(node) {
  return node.type === 'Keyword' && node.value === 'do';
}

function isElseToken(node) {
  return node.type === 'Keyword' && node.value === 'else';
}

function isEnumToken(node) {
  return node.type === 'Keyword' && node.value === 'enum';
}

function isExportToken(node) {
  return node.type === 'Keyword' && node.value === 'export';
}

function isExtendsToken(node) {
  return node.type === 'Keyword' && node.value === 'extends';
}

function isFinallyToken(node) {
  return node.type === 'Keyword' && node.value === 'finally';
}

function isForToken(node) {
  return node.type === 'Keyword' && node.value === 'for';
}

function isFunctionToken(node) {
  return node.type === 'Keyword' && node.value === 'function';
}

function isIfToken(node) {
  return node.type === 'Keyword' && node.value === 'if';
}

function isImplementsToken(node) {
  return node.type === 'Keyword' && node.value === 'implements';
}

function isImportToken(node) {
  return node.type === 'Keyword' && node.value === 'import';
}

function isInterfaceToken(node) {
  return node.type === 'Keyword' && node.value === 'interface';
}

function isNewToken(node) {
  return node.type === 'Keyword' && node.value === 'new';
}

function isReturnToken(node) {
  return node.type === 'Keyword' && node.value === 'return';
}

function isStaticToken(node) {
  return node.type === 'Keyword' && node.value === 'static';
}

function isSuperToken(node) {
  return node.type === 'Keyword' && node.value === 'super';
}

function isSwitchToken(node) {
  return node.type === 'Keyword' && node.value === 'switch';
}

function isThisToken(node) {
  return node.type === 'Keyword' && node.value === 'this';
}

function isThrowToken(node) {
  return node.type === 'Keyword' && node.value === 'throw';
}

function isTryToken(node) {
  return node.type === 'Keyword' && node.value === 'try';
}

function isVarToken(node) {
  return node.type === 'Keyword' && node.value === 'var';
}

function isWhileToken(node) {
  return node.type === 'Keyword' && node.value === 'while';
}

function isWithToken(node) {
  return node.type === 'Keyword' && node.value === 'with';
}

function isYieldToken(node) {
  return node.type === 'Keyword' && node.value === 'yield';
}

function isAsKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'as';
}

function isAsyncKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'async';
}

function isAwaitKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'await';
}

function isDeclareKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'declare';
}

function isFromKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'from';
}

function isGetKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'get';
}

function isLetKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'let';
}

function isModuleKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'module';
}

function isOfKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'of';
}

function isSetKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'set';
}

function isTypeKeyword(node) {
  return (node.type === 'Identifier' || node.type === 'Keyword') && node.value === 'type';
}

function isCommaToken(node) {
  return node.type === 'Punctuator' && node.value === ',';
}

function isColonToken(node) {
  return node.type === 'Punctuator' && node.value === ':';
}

function isSemicolonToken(node) {
  return node.type === 'Punctuator' && node.value === ';';
}

function isDotToken(node) {
  return node.type === 'Punctuator' && node.value === '.';
}

function isDotDotDotToken(node) {
  return node.type === 'Punctuator' && node.value === '...';
}

function isOptionalChainToken(node) {
  return node.type === 'Punctuator' && node.value === '?.';
}

function isQuestionMarkToken(node) {
  return node.type === 'Punctuator' && node.value === '?';
}

function isOpeningParenthesisToken(node) {
  return node.type === 'Punctuator' && node.value === '(';
}

function isClosingParenthesisToken(node) {
  return node.type === 'Punctuator' && node.value === ')';
}

function isOpeningCurlyBracketToken(node) {
  return node.type === 'Punctuator' && node.value === '{';
}

function isClosingCurlyBracketToken(node) {
  return node.type === 'Punctuator' && node.value === '}';
}

function isOpeningAngleBracketToken(node) {
  return node.type === 'Punctuator' && node.value === '<';
}

function isClosingAngleBracketToken(node) {
  return node.type === 'Punctuator' && node.value === '>';
}