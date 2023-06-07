# `@expo/rudder-sdk-node` ![CI](https://github.com/expo/rudder-sdk-node/actions/workflows/ci.yml/badge.svg)

A lightweight Node SDK for RudderStack with minimal dependencies. This is designed for client-side Node applications like CLIs. This library is smaller than [RudderStack's Node library](https://github.com/rudderlabs/rudder-sdk-node) and doesn't include support for the Redis persistence queue.

It is fully written in TypeScript and exports first-class type declarations to users of this package.

## Installation

```bash
$ npm install @expo/rudder-sdk-node
```

## Usage

```js
import Analytics from '@expo/rudder-sdk-node';

// Specify the batch endpoint of the Rudder server you are running
const client = new Analytics('write key', '<data-plane-uri>/v1/batch');

client.track({
  event: 'event name',
  userId: 'user id',
});

const flushResponse = await client.flush();
```

## Documentation

Look at the TypeScript type declarations and the source code of this library.

RudderStack's documentation for a different but related library is available [here](https://docs.rudderstack.com/rudderstack-sdk-integration-guides/rudderstack-node-sdk).

