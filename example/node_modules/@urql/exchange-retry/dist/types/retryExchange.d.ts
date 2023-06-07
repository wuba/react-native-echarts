import { Exchange, Operation, CombinedError } from '@urql/core';
export interface RetryExchangeOptions {
    initialDelayMs?: number;
    maxDelayMs?: number;
    randomDelay?: boolean;
    maxNumberAttempts?: number;
    /** Conditionally determine whether an error should be retried */
    retryIf?: (error: CombinedError, operation: Operation) => boolean;
    /** Conditionally update operations as they're retried (retryIf can be replaced with this) */
    retryWith?: (error: CombinedError, operation: Operation) => Operation | null | undefined;
}
export declare const retryExchange: ({ initialDelayMs, maxDelayMs, randomDelay, maxNumberAttempts, retryIf, retryWith, }: RetryExchangeOptions) => Exchange;
