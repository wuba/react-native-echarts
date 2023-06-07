/*!@ts-ignore*/
import * as GraphQL from 'graphql';

type Or<T, U> = 0 extends 1 & T ? U : T;
type Maybe<T> = T | undefined | null;
interface Extensions {
    [extension: string]: unknown;
}
type Source = any | {
    body: string;
    name: string;
    locationOffset: {
        line: number;
        column: number;
    };
};
type Location = any | {
    start: number;
    end: number;
    source: Source;
};

declare enum Kind {
  /** Name */
  NAME = 'Name',
  /** Document */
  DOCUMENT = 'Document',
  OPERATION_DEFINITION = 'OperationDefinition',
  VARIABLE_DEFINITION = 'VariableDefinition',
  SELECTION_SET = 'SelectionSet',
  FIELD = 'Field',
  ARGUMENT = 'Argument',
  /** Fragments */
  FRAGMENT_SPREAD = 'FragmentSpread',
  INLINE_FRAGMENT = 'InlineFragment',
  FRAGMENT_DEFINITION = 'FragmentDefinition',
  /** Values */
  VARIABLE = 'Variable',
  INT = 'IntValue',
  FLOAT = 'FloatValue',
  STRING = 'StringValue',
  BOOLEAN = 'BooleanValue',
  NULL = 'NullValue',
  ENUM = 'EnumValue',
  LIST = 'ListValue',
  OBJECT = 'ObjectValue',
  OBJECT_FIELD = 'ObjectField',
  /** Directives */
  DIRECTIVE = 'Directive',
  /** Types */
  NAMED_TYPE = 'NamedType',
  LIST_TYPE = 'ListType',
  NON_NULL_TYPE = 'NonNullType',
  /** Type System Definitions */
  SCHEMA_DEFINITION = 'SchemaDefinition',
  OPERATION_TYPE_DEFINITION = 'OperationTypeDefinition',
  /** Type Definitions */
  SCALAR_TYPE_DEFINITION = 'ScalarTypeDefinition',
  OBJECT_TYPE_DEFINITION = 'ObjectTypeDefinition',
  FIELD_DEFINITION = 'FieldDefinition',
  INPUT_VALUE_DEFINITION = 'InputValueDefinition',
  INTERFACE_TYPE_DEFINITION = 'InterfaceTypeDefinition',
  UNION_TYPE_DEFINITION = 'UnionTypeDefinition',
  ENUM_TYPE_DEFINITION = 'EnumTypeDefinition',
  ENUM_VALUE_DEFINITION = 'EnumValueDefinition',
  INPUT_OBJECT_TYPE_DEFINITION = 'InputObjectTypeDefinition',
  /** Directive Definitions */
  DIRECTIVE_DEFINITION = 'DirectiveDefinition',
  /** Type System Extensions */
  SCHEMA_EXTENSION = 'SchemaExtension',
  /** Type Extensions */
  SCALAR_TYPE_EXTENSION = 'ScalarTypeExtension',
  OBJECT_TYPE_EXTENSION = 'ObjectTypeExtension',
  INTERFACE_TYPE_EXTENSION = 'InterfaceTypeExtension',
  UNION_TYPE_EXTENSION = 'UnionTypeExtension',
  ENUM_TYPE_EXTENSION = 'EnumTypeExtension',
  INPUT_OBJECT_TYPE_EXTENSION = 'InputObjectTypeExtension',
}

declare enum OperationTypeNode {
  QUERY = 'query',
  MUTATION = 'mutation',
  SUBSCRIPTION = 'subscription',
}

/** Type System Definition */
declare type TypeSystemDefinitionNode = Or<GraphQL.TypeSystemDefinitionNode, SchemaDefinitionNode | TypeDefinitionNode | DirectiveDefinitionNode>;
type SchemaDefinitionNode = Or<GraphQL.SchemaDefinitionNode, {
    readonly kind: Kind.SCHEMA_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly operationTypes: ReadonlyArray<OperationTypeDefinitionNode>;
}>;
type OperationTypeDefinitionNode = Or<GraphQL.OperationTypeDefinitionNode, {
    readonly kind: Kind.OPERATION_TYPE_DEFINITION;
    readonly loc?: Location;
    readonly operation: OperationTypeNode;
    readonly type: NamedTypeNode;
}>;
/** Type Definition */
declare type TypeDefinitionNode = Or<GraphQL.TypeDefinitionNode, ScalarTypeDefinitionNode | ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode | UnionTypeDefinitionNode | EnumTypeDefinitionNode | InputObjectTypeDefinitionNode>;
type ScalarTypeDefinitionNode = Or<GraphQL.ScalarTypeDefinitionNode, {
    readonly kind: Kind.SCALAR_TYPE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
}>;
type ObjectTypeDefinitionNode = Or<GraphQL.ObjectTypeDefinitionNode, {
    readonly kind: Kind.OBJECT_TYPE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly interfaces?: ReadonlyArray<NamedTypeNode>;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly fields?: ReadonlyArray<FieldDefinitionNode>;
}>;
type FieldDefinitionNode = Or<GraphQL.FieldDefinitionNode, {
    readonly kind: Kind.FIELD_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
    readonly type: TypeNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
}>;
type InputValueDefinitionNode = Or<GraphQL.InputValueDefinitionNode, {
    readonly kind: Kind.INPUT_VALUE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly type: TypeNode;
    readonly defaultValue?: ConstValueNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
}>;
type InterfaceTypeDefinitionNode = Or<GraphQL.InterfaceTypeDefinitionNode, {
    readonly kind: Kind.INTERFACE_TYPE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly interfaces?: ReadonlyArray<NamedTypeNode>;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly fields?: ReadonlyArray<FieldDefinitionNode>;
}>;
type UnionTypeDefinitionNode = Or<GraphQL.UnionTypeDefinitionNode, {
    readonly kind: Kind.UNION_TYPE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly types?: ReadonlyArray<NamedTypeNode>;
}>;
type EnumTypeDefinitionNode = Or<GraphQL.EnumTypeDefinitionNode, {
    readonly kind: Kind.ENUM_TYPE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly values?: ReadonlyArray<EnumValueDefinitionNode>;
}>;
type EnumValueDefinitionNode = Or<GraphQL.EnumValueDefinitionNode, {
    readonly kind: Kind.ENUM_VALUE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
}>;
type InputObjectTypeDefinitionNode = Or<GraphQL.InputObjectTypeDefinitionNode, {
    readonly kind: Kind.INPUT_OBJECT_TYPE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly fields?: ReadonlyArray<InputValueDefinitionNode>;
}>;
type DirectiveDefinitionNode = Or<GraphQL.DirectiveDefinitionNode, {
    readonly kind: Kind.DIRECTIVE_DEFINITION;
    readonly loc?: Location;
    readonly description?: StringValueNode;
    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
    readonly repeatable: boolean;
    readonly locations: ReadonlyArray<NameNode>;
}>;
type TypeSystemExtensionNode = Or<GraphQL.TypeSystemExtensionNode, SchemaExtensionNode | TypeExtensionNode>;
type SchemaExtensionNode = Or<GraphQL.SchemaExtensionNode, {
    readonly kind: Kind.SCHEMA_EXTENSION;
    readonly loc?: Location;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly operationTypes?: ReadonlyArray<OperationTypeDefinitionNode>;
}>;
declare type TypeExtensionNode = Or<GraphQL.TypeExtensionNode, ScalarTypeExtensionNode | ObjectTypeExtensionNode | InterfaceTypeExtensionNode | UnionTypeExtensionNode | EnumTypeExtensionNode | InputObjectTypeExtensionNode>;
type ScalarTypeExtensionNode = Or<GraphQL.ScalarTypeExtensionNode, {
    readonly kind: Kind.SCALAR_TYPE_EXTENSION;
    readonly loc?: Location;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
}>;
type ObjectTypeExtensionNode = Or<GraphQL.ObjectTypeExtensionNode, {
    readonly kind: Kind.OBJECT_TYPE_EXTENSION;
    readonly loc?: Location;
    readonly name: NameNode;
    readonly interfaces?: ReadonlyArray<NamedTypeNode>;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly fields?: ReadonlyArray<FieldDefinitionNode>;
}>;
type InterfaceTypeExtensionNode = Or<GraphQL.InterfaceTypeExtensionNode, {
    readonly kind: Kind.INTERFACE_TYPE_EXTENSION;
    readonly loc?: Location;
    readonly name: NameNode;
    readonly interfaces?: ReadonlyArray<NamedTypeNode>;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly fields?: ReadonlyArray<FieldDefinitionNode>;
}>;
type UnionTypeExtensionNode = Or<GraphQL.UnionTypeExtensionNode, {
    readonly kind: Kind.UNION_TYPE_EXTENSION;
    readonly loc?: Location;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly types?: ReadonlyArray<NamedTypeNode>;
}>;
type EnumTypeExtensionNode = Or<GraphQL.EnumTypeExtensionNode, {
    readonly kind: Kind.ENUM_TYPE_EXTENSION;
    readonly loc?: Location;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly values?: ReadonlyArray<EnumValueDefinitionNode>;
}>;
type InputObjectTypeExtensionNode = Or<GraphQL.InputObjectTypeExtensionNode, {
    readonly kind: Kind.INPUT_OBJECT_TYPE_EXTENSION;
    readonly loc?: Location;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly fields?: ReadonlyArray<InputValueDefinitionNode>;
}>;

type ASTNode = Or<GraphQL.ASTNode, NameNode | DocumentNode | OperationDefinitionNode | VariableDefinitionNode | VariableNode | SelectionSetNode | FieldNode | ArgumentNode | FragmentSpreadNode | InlineFragmentNode | FragmentDefinitionNode | IntValueNode | FloatValueNode | StringValueNode | BooleanValueNode | NullValueNode | EnumValueNode | ListValueNode | ObjectValueNode | ObjectFieldNode | DirectiveNode | NamedTypeNode | ListTypeNode | NonNullTypeNode | SchemaDefinitionNode | OperationTypeDefinitionNode | ScalarTypeDefinitionNode | ObjectTypeDefinitionNode | FieldDefinitionNode | InputValueDefinitionNode | InterfaceTypeDefinitionNode | UnionTypeDefinitionNode | EnumTypeDefinitionNode | EnumValueDefinitionNode | InputObjectTypeDefinitionNode | DirectiveDefinitionNode | SchemaExtensionNode | ScalarTypeExtensionNode | ObjectTypeExtensionNode | InterfaceTypeExtensionNode | UnionTypeExtensionNode | EnumTypeExtensionNode | InputObjectTypeExtensionNode>;
type NameNode = Or<GraphQL.NameNode, {
    readonly kind: Kind.NAME;
    readonly value: string;
    readonly loc?: Location;
}>;
type DocumentNode = Or<GraphQL.DocumentNode, {
    readonly kind: Kind.DOCUMENT;
    readonly definitions: ReadonlyArray<DefinitionNode>;
    readonly loc?: Location;
}>;
type DefinitionNode = Or<GraphQL.DefinitionNode, ExecutableDefinitionNode | TypeSystemDefinitionNode | TypeSystemExtensionNode>;
type ExecutableDefinitionNode = Or<GraphQL.ExecutableDefinitionNode, OperationDefinitionNode | FragmentDefinitionNode>;
type OperationDefinitionNode = Or<GraphQL.OperationDefinitionNode, {
    readonly kind: Kind.OPERATION_DEFINITION;
    readonly operation: OperationTypeNode;
    readonly name?: NameNode;
    readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly selectionSet: SelectionSetNode;
    readonly loc?: Location;
}>;
type VariableDefinitionNode = Or<GraphQL.VariableDefinitionNode, {
    readonly kind: Kind.VARIABLE_DEFINITION;
    readonly variable: VariableNode;
    readonly type: TypeNode;
    readonly defaultValue?: ConstValueNode;
    readonly directives?: ReadonlyArray<ConstDirectiveNode>;
    readonly loc?: Location;
}>;
type VariableNode = Or<GraphQL.VariableNode, {
    readonly kind: Kind.VARIABLE;
    readonly name: NameNode;
    readonly loc?: Location;
}>;
type SelectionSetNode = Or<GraphQL.SelectionSetNode, {
    readonly kind: Kind.SELECTION_SET;
    readonly selections: ReadonlyArray<SelectionNode>;
    readonly loc?: Location;
}>;
declare type SelectionNode = Or<GraphQL.SelectionNode, FieldNode | FragmentSpreadNode | InlineFragmentNode>;
type FieldNode = Or<GraphQL.FieldNode, {
    readonly kind: Kind.FIELD;
    readonly alias?: NameNode;
    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<ArgumentNode>;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly selectionSet?: SelectionSetNode;
    readonly loc?: Location;
}>;
type ArgumentNode = Or<GraphQL.ArgumentNode, {
    readonly kind: Kind.ARGUMENT;
    readonly name: NameNode;
    readonly value: ValueNode;
    readonly loc?: Location;
}>;
type ConstArgumentNode = Or<GraphQL.ConstArgumentNode, {
    readonly kind: Kind.ARGUMENT;
    readonly name: NameNode;
    readonly value: ConstValueNode;
    readonly loc?: Location;
}>;
type FragmentSpreadNode = Or<GraphQL.FragmentSpreadNode, {
    readonly kind: Kind.FRAGMENT_SPREAD;
    readonly name: NameNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly loc?: Location;
}>;
type InlineFragmentNode = Or<GraphQL.InlineFragmentNode, {
    readonly kind: Kind.INLINE_FRAGMENT;
    readonly typeCondition?: NamedTypeNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly selectionSet: SelectionSetNode;
    readonly loc?: Location;
}>;
type FragmentDefinitionNode = Or<GraphQL.FragmentDefinitionNode, {
    readonly kind: Kind.FRAGMENT_DEFINITION;
    readonly name: NameNode;
    readonly typeCondition: NamedTypeNode;
    readonly directives?: ReadonlyArray<DirectiveNode>;
    readonly selectionSet: SelectionSetNode;
    readonly loc?: Location;
}>;
type ValueNode = Or<GraphQL.ValueNode, VariableNode | IntValueNode | FloatValueNode | StringValueNode | BooleanValueNode | NullValueNode | EnumValueNode | ListValueNode | ObjectValueNode>;
type ConstValueNode = Or<GraphQL.ConstValueNode, IntValueNode | FloatValueNode | StringValueNode | BooleanValueNode | NullValueNode | EnumValueNode | ConstListValueNode | ConstObjectValueNode>;
type IntValueNode = Or<GraphQL.IntValueNode, {
    readonly kind: Kind.INT;
    readonly value: string;
    readonly loc?: Location;
}>;
type FloatValueNode = Or<GraphQL.FloatValueNode, {
    readonly kind: Kind.FLOAT;
    readonly value: string;
    readonly loc?: Location;
}>;
type StringValueNode = Or<GraphQL.FloatValueNode, {
    readonly kind: Kind.STRING;
    readonly value: string;
    readonly block?: boolean;
    readonly loc?: Location;
}>;
type BooleanValueNode = Or<GraphQL.BooleanValueNode, {
    readonly kind: Kind.BOOLEAN;
    readonly value: boolean;
    readonly loc?: Location;
}>;
type NullValueNode = Or<GraphQL.NullValueNode, {
    readonly kind: Kind.NULL;
    readonly loc?: Location;
}>;
type EnumValueNode = Or<GraphQL.EnumValueNode, {
    readonly kind: Kind.ENUM;
    readonly value: string;
    readonly loc?: Location;
}>;
type ListValueNode = Or<GraphQL.ListValueNode, {
    readonly kind: Kind.LIST;
    readonly values: ReadonlyArray<ValueNode>;
    readonly loc?: Location;
}>;
type ConstListValueNode = Or<GraphQL.ConstListValueNode, {
    readonly kind: Kind.LIST;
    readonly values: ReadonlyArray<ConstValueNode>;
    readonly loc?: Location;
}>;
type ObjectValueNode = Or<GraphQL.ObjectValueNode, {
    readonly kind: Kind.OBJECT;
    readonly fields: ReadonlyArray<ObjectFieldNode>;
    readonly loc?: Location;
}>;
type ConstObjectValueNode = Or<GraphQL.ConstObjectValueNode, {
    readonly kind: Kind.OBJECT;
    readonly fields: ReadonlyArray<ConstObjectFieldNode>;
    readonly loc?: Location;
}>;
type ObjectFieldNode = Or<GraphQL.ObjectFieldNode, {
    readonly kind: Kind.OBJECT_FIELD;
    readonly name: NameNode;
    readonly value: ValueNode;
    readonly loc?: Location;
}>;
type ConstObjectFieldNode = Or<GraphQL.ConstObjectFieldNode, {
    readonly kind: Kind.OBJECT_FIELD;
    readonly name: NameNode;
    readonly value: ConstValueNode;
    readonly loc?: Location;
}>;
type DirectiveNode = Or<GraphQL.DirectiveNode, {
    readonly kind: Kind.DIRECTIVE;
    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<ArgumentNode>;
    readonly loc?: Location;
}>;
type ConstDirectiveNode = Or<GraphQL.ConstDirectiveNode, {
    readonly kind: Kind.DIRECTIVE;
    readonly name: NameNode;
    readonly arguments?: ReadonlyArray<ConstArgumentNode>;
    readonly loc?: Location;
}>;
type TypeNode = Or<GraphQL.TypeNode, NamedTypeNode | ListTypeNode | NonNullTypeNode>;
type NamedTypeNode = Or<GraphQL.NamedTypeNode, {
    readonly kind: Kind.NAMED_TYPE;
    readonly name: NameNode;
    readonly loc?: Location;
}>;
type ListTypeNode = Or<GraphQL.ListTypeNode, {
    readonly kind: Kind.LIST_TYPE;
    readonly type: TypeNode;
    readonly loc?: Location;
}>;
type NonNullTypeNode = Or<GraphQL.NonNullTypeNode, {
    readonly kind: Kind.NON_NULL_TYPE;
    readonly type: NamedTypeNode | ListTypeNode;
    readonly loc?: Location;
}>;

declare class GraphQLError extends Error {
    readonly locations: ReadonlyArray<any> | undefined;
    readonly path: ReadonlyArray<string | number> | undefined;
    readonly nodes: ReadonlyArray<any> | undefined;
    readonly source: Source | undefined;
    readonly positions: ReadonlyArray<number> | undefined;
    readonly originalError: Error | undefined;
    readonly extensions: Extensions;
    constructor(message: string, nodes?: ReadonlyArray<ASTNode> | ASTNode | null, source?: Maybe<Source>, positions?: Maybe<ReadonlyArray<number>>, path?: Maybe<ReadonlyArray<string | number>>, originalError?: Maybe<Error>, extensions?: Maybe<Extensions>);
    toJSON(): any;
    toString(): string;
    get [Symbol.toStringTag](): string;
}

type ParseOptions = {
    [option: string]: any;
};
declare function parse(string: string | Source, _options?: ParseOptions | undefined): DocumentNode;
declare function parseValue(string: string | Source, _options?: ParseOptions | undefined): ValueNode;
declare function parseType(string: string | Source, _options?: ParseOptions | undefined): TypeNode;

declare const BREAK: {};
declare function visit<N extends ASTNode>(root: N, visitor: ASTVisitor): N;
declare function visit<R>(root: ASTNode, visitor: ASTReducer<R>): R;
type ASTVisitor = EnterLeaveVisitor<ASTNode> | KindVisitor;
type KindVisitor = {
    readonly [NodeT in ASTNode as NodeT['kind']]?: ASTVisitFn<NodeT> | EnterLeaveVisitor<NodeT>;
};
interface EnterLeaveVisitor<TVisitedNode extends ASTNode> {
    readonly enter?: ASTVisitFn<TVisitedNode> | undefined;
    readonly leave?: ASTVisitFn<TVisitedNode> | undefined;
}
type ASTVisitFn<Node extends ASTNode> = (node: Node, key: string | number | undefined, parent: ASTNode | ReadonlyArray<ASTNode> | undefined, path: ReadonlyArray<string | number>, ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) => any;
type ASTReducer<R> = {
    readonly [NodeT in ASTNode as NodeT['kind']]?: {
        readonly enter?: ASTVisitFn<NodeT>;
        readonly leave: ASTReducerFn<NodeT, R>;
    };
};
type ASTReducerFn<TReducedNode extends ASTNode, R> = (node: {
    [K in keyof TReducedNode]: ReducedField<TReducedNode[K], R>;
}, key: string | number | undefined, parent: ASTNode | ReadonlyArray<ASTNode> | undefined, path: ReadonlyArray<string | number>, ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>) => R;
type ReducedField<T, R> = T extends null | undefined ? T : T extends ReadonlyArray<any> ? ReadonlyArray<R> : R;

declare function printString(string: string): string;
declare function printBlockString(string: string): string;
declare function print(node: ASTNode): string;

declare function valueFromASTUntyped(node: ValueNode, variables?: Maybe<Record<string, any>>): unknown;
declare function valueFromTypeNode(node: ValueNode, type: TypeNode, variables?: Maybe<Record<string, any>>): unknown;

export { ASTNode, ASTReducer, ASTVisitFn, ASTVisitor, ArgumentNode, BREAK, BooleanValueNode, ConstArgumentNode, ConstDirectiveNode, ConstListValueNode, ConstObjectFieldNode, ConstObjectValueNode, ConstValueNode, DefinitionNode, DirectiveDefinitionNode, DirectiveNode, DocumentNode, EnumTypeDefinitionNode, EnumTypeExtensionNode, EnumValueDefinitionNode, EnumValueNode, ExecutableDefinitionNode, FieldDefinitionNode, FieldNode, FloatValueNode, FragmentDefinitionNode, FragmentSpreadNode, GraphQLError, InlineFragmentNode, InputObjectTypeDefinitionNode, InputObjectTypeExtensionNode, InputValueDefinitionNode, IntValueNode, InterfaceTypeDefinitionNode, InterfaceTypeExtensionNode, Kind, ListTypeNode, ListValueNode, Location, NameNode, NamedTypeNode, NonNullTypeNode, NullValueNode, ObjectFieldNode, ObjectTypeDefinitionNode, ObjectTypeExtensionNode, ObjectValueNode, OperationDefinitionNode, OperationTypeDefinitionNode, OperationTypeNode, ScalarTypeDefinitionNode, ScalarTypeExtensionNode, SchemaDefinitionNode, SchemaExtensionNode, SelectionNode, SelectionSetNode, Source, StringValueNode, TypeDefinitionNode, TypeExtensionNode, TypeNode, TypeSystemDefinitionNode, TypeSystemExtensionNode, UnionTypeDefinitionNode, UnionTypeExtensionNode, ValueNode, VariableDefinitionNode, VariableNode, parse, parseType, parseValue, print, printBlockString, printString, valueFromASTUntyped, valueFromTypeNode, visit };
