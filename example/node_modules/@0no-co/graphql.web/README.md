<div align="center">
  <h2>@0no-co/graphql.web</h2>
  <strong>The spec-compliant minimum of client-side GraphQL.</strong>
  <br />
  <br />
  <a href="https://github.com/0no-co/graphql.web/actions/workflows/release.yml">
    <img alt="CI Status" src="https://github.com/0no-co/graphql.web/actions/workflows/release.yml/badge.svg?branch=main" />
  </a>
  <a href="https://npmjs.com/package/@0no-co/graphql.web">
    <img alt="Bundlesize" src="https://deno.bundlejs.com/?q=@0no-co/graphql.web&badge" />
  </a>
  <a href="https://urql.dev/discord">
    <img alt="Discord" src="https://img.shields.io/discord/1082378892523864074?color=7389D8&label&logo=discord&logoColor=ffffff" />
  </a>
  <br />
  <br />
</div>

`@0no-co/graphql.web` is an **experimental** library, aiming to provide an
absolute minimum of features and exports of `graphql` utilities that typical
GraphQL web apps or GraphQL clients need.

While its goal isn’t to be an exact match to [the GraphQL.js
API](https://graphql.org/graphql-js/graphql/) it aims to provide API- and
type-compatible where possible and necessary. However, its goal is to provide
the smallest implementation for common GraphQL utilities that are still either
spec-compliant or compatible with GraphQL.js’ implementation.

> **Note:** While this library can be used as a drop-in replacement for
> `graphql` in _some cases_, the [`graphql-web-lite`
> project](https://github.com/0no-co/graphql-web-lite) is maintained to be
> a full shim/alias for the `graphql` package.

### Overview

`@0no-co/graphql.web` aims to provide a minimal set of exports to implement
client-side GraphQL utilities, mostly including parsing, printing, and visiting
the GraphQL AST, and the `GraphQLError` class.

Currently, `graphql.web` compresses to under 4kB and doesn’t regress on
GraphQL.js’ performance when parsing, printing, or visiting the AST.

For all primary APIs we aim to hit 100% test coverage and match the output,
types, and API compatibility of GraphQL.js, including — as far as possible
— TypeScript type compatibility of the AST types with the currently stable
version of GraphQL.js.

### API

Currently, only a select few exports are provided — namely, the ones listed here
are used in `@urql/core`, and we expect them to be common in all client-side
GraphQL applications.

| Export | Description | Links |
| --- | ----------- | -------- |
| `parse` | A tiny (but compliant) GraphQL query language parser. | [Source](./src/parser.ts) |
| `print` | A (compliant) GraphQL query language printer. | [Source](./src/printer.ts) |
| `visit` | A recursive reimplementation of GraphQL.js’ visitor. | [Source](./src/printer.ts) |
| `Kind` | The GraphQL.js’ `Kind` enum, containing supported `ASTNode` kinds. | [Source](./src/kind.ts) |
| `GraphQLError` | `GraphQLError` stripped of source/location debugging. | [Source](./src/kind.ts) |
| `valueFromASTUntyped` | Coerces AST values into JS values. | [Source](./src/values.ts) |

The stated goals of any reimplementation are:
1. Not to implement any execution or type system parts of the GraphQL
   specification.
2. To adhere to GraphQL.js’ types and APIs as much as possible.
3. Not to implement or expose any rarely used APIs or properties of the
   GraphQL.js library.
4. To provide a minimal and maintainable subset of GraphQL.js utilities.

Therefore, while we can foresee implementing APIs that are entirely separate and
unrelated to the GraphQL.js library in the future, for now the stated goals are
designed to allow this library to be used by GraphQL clients, like
[`@urql/core`](https://github.com/urql-graphql/urql).
