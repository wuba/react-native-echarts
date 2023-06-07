import { Operation, OperationResult } from './urql-core-chunk.js';
export { FetchBody, makeFetchBody, makeFetchOptions, makeFetchURL } from './urql-core-chunk.js';
import { Source } from 'wonka';



/** Makes a GraphQL HTTP request to a given API by wrapping around the Fetch API.
 *
 * @param operation - The {@link Operation} that should be sent via GraphQL over HTTP.
 * @param url - The endpoint URL for the GraphQL HTTP API.
 * @param fetchOptions - The {@link RequestInit} fetch options for the request.
 * @returns A Wonka {@link Source} of {@link OperationResult | OperationResults}.
 *
 * @remarks
 * This utility defines how all built-in fetch exchanges make GraphQL HTTP requests,
 * supporting multipart incremental responses, cancellation and other smaller
 * implementation details.
 *
 * If you’re implementing a modified fetch exchange for a GraphQL over HTTP API
 * it’s recommended you use this utility.
 *
 * Hint: This function does not use the passed `operation` to create or modify the
 * `fetchOptions` and instead expects that the options have already been created
 * using {@link makeFetchOptions} and modified as needed.
 *
 * @throws
 * If the `fetch` polyfill or globally available `fetch` function doesn’t support
 * streamed multipart responses while trying to handle a `multipart/mixed` GraphQL response,
 * the source will throw “Streaming requests unsupported”.
 * This shouldn’t happen in modern browsers and Node.js.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API} for the Fetch API spec.
 */
declare function makeFetchSource(operation: Operation, url: string, fetchOptions: RequestInit): Source<OperationResult>;

export { makeFetchSource };
