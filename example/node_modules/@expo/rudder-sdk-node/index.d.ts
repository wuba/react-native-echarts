import bunyan from '@expo/bunyan';
export declare type AnalyticsMessage = AnalyticsIdentity & {
    context?: {
        [key: string]: unknown;
    };
    integrations?: {
        [destination: string]: boolean;
    };
    properties?: {
        [key: string]: unknown;
    };
    timestamp?: Date;
    [key: string]: unknown;
};
export declare type AnalyticsIdentity = {
    userId: string;
} | {
    userId?: string;
    anonymousId: string;
};
export declare type AnalyticsMessageCallback = (error?: Error) => void;
export declare type AnalyticsFlushCallback = (flushResponses: FlushResponse[]) => void;
declare type FlushResponse = {
    error?: Error;
    data: {
        batch: AnalyticsPayload[];
        sentAt: Date;
    };
};
declare type AnalyticsPayload = {
    messageId: string;
    _metadata: any;
    context: any;
    type: string;
    originalTimestamp: Date;
    [key: string]: any;
};
export default class Analytics {
    private readonly enable;
    private inFlightFlush;
    private readonly queue;
    private readonly writeKey;
    private readonly host;
    private readonly timeout;
    private readonly flushAt;
    private readonly flushInterval;
    private readonly maxFlushSizeInBytes;
    private readonly maxQueueLength;
    private readonly flushCallbacks;
    private readonly flushResponses;
    private finalMessageId;
    private flushed;
    private timer;
    private readonly logger;
    /**
     * Initialize a new `Analytics` instance with your RudderStack project's `writeKey` and an
     * optional dictionary of options.
     */
    constructor(writeKey: string, dataPlaneURL: string, { enable, timeout, flushAt, flushInterval, maxFlushSizeInBytes, // defaults to ~3.9mb
    maxQueueLength, logLevel, }?: {
        enable?: boolean;
        /**
         * The network timeout (in milliseconds) for how long to wait for a request to complete when
         * sending messages to the data plane. Omit or specify 0 or a negative value to disable
         * timeouts.
         */
        timeout?: number;
        flushAt?: number;
        flushInterval?: number;
        maxFlushSizeInBytes?: number;
        maxQueueLength?: number;
        logLevel?: bunyan.LogLevel;
    });
    /**
     * Sends an "identify" message that associates traits with a user.
     */
    identify(message: AnalyticsMessage & {
        traits?: {
            [key: string]: unknown;
        };
    }, callback?: AnalyticsMessageCallback): Analytics;
    traits?: {
        [key: string]: unknown;
    };
    /**
     * Sends a "group" message that identifies this user with a group.
     */
    group(message: AnalyticsMessage & {
        groupId: string;
        traits?: {
            [key: string]: unknown;
        };
    }, callback?: AnalyticsMessageCallback): Analytics;
    /**
     * Sends a "track" event that records an action.
     */
    track(message: AnalyticsMessage & {
        event: string;
    }, callback?: AnalyticsMessageCallback): Analytics;
    /**
     * Sends a "page" event that records a page view on a website.
     */
    page(message: AnalyticsMessage & {
        name: string;
    }, callback?: AnalyticsMessageCallback): Analytics;
    /**
     * Sends a "screen" event that records a screen view in an app.
     */
    screen(message: AnalyticsMessage, callback?: AnalyticsMessageCallback): Analytics;
    /**
     * Sends an "alias" message that associates one ID with another.
     */
    alias(message: {
        previousId: string;
        traits?: {
            [key: string]: unknown;
        };
    } & AnalyticsIdentity, callback?: AnalyticsMessageCallback): Analytics;
    private validate;
    /**
     * Adds a message of the specified type to the queue and flushes the queue if appropriate.
     */
    private enqueue;
    /**
     * Flushes the message queue to the server immediately if a flush is not already in progress.
     */
    flush(callback?: AnalyticsFlushCallback): Promise<FlushResponse[]>;
    /**
     * Flushes messages from the message queue to the server immediately. After the flush has finished,
     * this checks for pending flushes and executes them. All data is rolled up into a single FlushResponse.
     */
    private executeFlush;
    /**
     * Calculates the amount of time to wait before retrying a request, given the number of prior
     * retries (excluding the initial attempt).
     *
     * @param priorRetryCount the number of prior retries, starting from zero
     */
    private getExponentialDelay;
    /**
     * Returns whether to retry a request that failed with the given error or returned the given
     * response.
     */
    private isErrorRetryable;
    private nullFlushResponse;
}
export {};
