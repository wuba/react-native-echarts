"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("@expo/bunyan"));
const loosely_validate_event_1 = __importDefault(require("@segment/loosely-validate-event"));
const assert_1 = __importDefault(require("assert"));
const fetch_retry_1 = __importDefault(require("fetch-retry"));
const md5_1 = __importDefault(require("md5"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const remove_trailing_slash_1 = __importDefault(require("remove-trailing-slash"));
const uuid_1 = require("uuid");
const version = require('./package.json').version;
const retryableFetch = (0, fetch_retry_1.default)(node_fetch_1.default);
const setImmediate = global.setImmediate || process.nextTick.bind(process);
class Analytics {
    /**
     * Initialize a new `Analytics` instance with your RudderStack project's `writeKey` and an
     * optional dictionary of options.
     */
    constructor(writeKey, dataPlaneURL, { enable = true, timeout = 0, flushAt = 20, flushInterval = 20000, maxFlushSizeInBytes = 1024 * 1000 * 3.9, // defaults to ~3.9mb
    maxQueueLength = 1000, logLevel = bunyan_1.default.FATAL, } = {}) {
        this.inFlightFlush = null;
        this.queue = [];
        this.flushCallbacks = [];
        this.flushResponses = [];
        this.finalMessageId = null;
        this.flushed = false;
        this.timer = null;
        this.enable = enable;
        (0, assert_1.default)(writeKey, `The project's write key must be specified`);
        (0, assert_1.default)(dataPlaneURL, `The data plane URL must be specified`);
        this.writeKey = writeKey;
        this.host = (0, remove_trailing_slash_1.default)(dataPlaneURL);
        this.timeout = timeout;
        this.flushAt = Math.max(flushAt, 1);
        this.flushInterval = flushInterval;
        this.maxFlushSizeInBytes = maxFlushSizeInBytes;
        this.maxQueueLength = maxQueueLength;
        this.logger = bunyan_1.default.createLogger({
            name: '@expo/rudder-node-sdk',
            level: logLevel,
        });
    }
    /**
     * Sends an "identify" message that associates traits with a user.
     */
    identify(message, callback) {
        this.validate(message, 'identify');
        this.enqueue('identify', message, callback);
        return this;
    }
    /**
     * Sends a "group" message that identifies this user with a group.
     */
    group(message, callback) {
        this.validate(message, 'group');
        this.enqueue('group', message, callback);
        return this;
    }
    /**
     * Sends a "track" event that records an action.
     */
    track(message, callback) {
        this.validate(message, 'track');
        this.enqueue('track', message, callback);
        return this;
    }
    /**
     * Sends a "page" event that records a page view on a website.
     */
    page(message, callback) {
        this.validate(message, 'page');
        this.enqueue('page', message, callback);
        return this;
    }
    /**
     * Sends a "screen" event that records a screen view in an app.
     */
    screen(message, callback) {
        this.validate(message, 'screen');
        this.enqueue('screen', message, callback);
        return this;
    }
    /**
     * Sends an "alias" message that associates one ID with another.
     */
    alias(message, callback) {
        this.validate(message, 'alias');
        this.enqueue('alias', message, callback);
        return this;
    }
    validate(message, type) {
        try {
            (0, loosely_validate_event_1.default)(message, type);
        }
        catch (e) {
            if (e.message === 'Your message must be < 32kb.') {
                this.logger.warn('Your message must be < 32KiB. This is currently surfaced as a warning. Please update your code.', message);
                return;
            }
            throw e;
        }
    }
    /**
     * Adds a message of the specified type to the queue and flushes the queue if appropriate.
     */
    enqueue(type, message, callback = () => { }) {
        var _a, _b;
        if (!this.enable) {
            setImmediate(callback);
            return;
        }
        if (this.queue.length >= this.maxQueueLength) {
            this.logger.error(`Not adding events for processing as queue size ${this.queue.length} exceeds max configuration ${this.maxQueueLength}`);
            setImmediate(callback);
            return;
        }
        if (type === 'identify') {
            (_a = message.traits) !== null && _a !== void 0 ? _a : (message.traits = {});
            (_b = message.context) !== null && _b !== void 0 ? _b : (message.context = {});
            message.context.traits = message.traits;
        }
        message = { ...message };
        message.type = type;
        message.context = {
            library: {
                name: '@expo/rudder-sdk-node',
                version,
            },
            ...message.context,
        };
        message._metadata = {
            nodeVersion: process.versions.node,
            ...message._metadata,
        };
        if (!message.originalTimestamp) {
            message.originalTimestamp = new Date();
        }
        if (!message.messageId) {
            // We md5 the messaage to add more randomness. This is primarily meant
            // for use in the browser where the uuid package falls back to Math.random()
            // which is not a great source of randomness.
            // Borrowed from analytics.js (https://github.com/segment-integrations/analytics.js-integration-segmentio/blob/a20d2a2d222aeb3ab2a8c7e72280f1df2618440e/lib/index.js#L255-L256).
            message.messageId = `node-${(0, md5_1.default)(JSON.stringify(message))}-${(0, uuid_1.v4)()}`;
        }
        this.queue.push({ message, callback });
        if (!this.flushed) {
            this.flushed = true;
            this.flush();
            return;
        }
        const isDivisibleByFlushAt = this.queue.length % this.flushAt === 0;
        if (isDivisibleByFlushAt) {
            this.logger.debug(`flushAt reached, messageQueueLength is ${this.queue.length}, trying flush...`);
            this.flush();
        }
        else if (this.flushInterval && !this.timer) {
            // only start a timer if there are dangling items in the message queue
            this.logger.debug('no existing flush timer, creating new one');
            this.timer = setTimeout(this.flush.bind(this), this.flushInterval);
        }
    }
    /**
     * Flushes the message queue to the server immediately if a flush is not already in progress.
     */
    async flush(callback = () => { }) {
        this.logger.debug('in flush');
        // will cause new messages to be rolled up into the in-flight flush
        this.finalMessageId = this.queue.length
            ? this.queue[this.queue.length - 1].message.messageId
            : null;
        this.logger.trace('finalMessageId: ' + this.finalMessageId);
        this.flushCallbacks.push(callback);
        if (this.inFlightFlush) {
            this.logger.debug('skipping flush, there is an in flight flush');
            return await this.inFlightFlush;
        }
        this.inFlightFlush = this.executeFlush();
        const flushResponse = await this.inFlightFlush;
        this.logger.debug('resetting client flush state');
        this.inFlightFlush = null;
        this.finalMessageId = null;
        this.logger.trace('===flushResponse===', flushResponse);
        return flushResponse;
    }
    /**
     * Flushes messages from the message queue to the server immediately. After the flush has finished,
     * this checks for pending flushes and executes them. All data is rolled up into a single FlushResponse.
     */
    async executeFlush(flushedItems = []) {
        var _a;
        this.logger.debug('in execute flush');
        if (!this.enable) {
            this.logger.debug('client not enabled, skipping flush');
            this.flushResponses.splice(0, this.flushResponses.length);
            const nullResponse = this.nullFlushResponse();
            this.flushCallbacks
                .splice(0, this.flushCallbacks.length)
                .map((callback) => setImmediate(callback, nullResponse));
            return nullResponse;
        }
        if (this.timer) {
            this.logger.debug('cancelling existing timer...');
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (!this.queue.length) {
            this.logger.debug('queue is empty, nothing to flush');
            this.flushResponses.splice(0, this.flushResponses.length);
            const nullResponse = this.nullFlushResponse();
            this.flushCallbacks
                .splice(0, this.flushCallbacks.length)
                .map((callback) => setImmediate(callback, nullResponse));
            return nullResponse;
        }
        let flushSize = 0;
        let spliceIndex = 0;
        // guard against requests larger than 4mb
        for (let i = 0; i < this.queue.length; i++) {
            const item = this.queue[i];
            const itemSize = JSON.stringify(item).length;
            const exceededMaxFlushSize = flushSize + itemSize > this.maxFlushSizeInBytes;
            if (exceededMaxFlushSize) {
                break;
            }
            flushSize += itemSize;
            spliceIndex++;
            if (((_a = item.message.messageId) !== null && _a !== void 0 ? _a : null) === this.finalMessageId || !this.finalMessageId) {
                break; // guard against flushing items added to the message queue during this flush
            }
        }
        const itemsToFlush = this.queue.splice(0, spliceIndex);
        const callbacks = itemsToFlush.map((item) => item.callback);
        const currentBatchOfMessages = itemsToFlush.map((item) => {
            // if someone mangles directly with queue
            if (typeof item.message == 'object') {
                item.message.sentAt = new Date();
            }
            return item.message;
        });
        const done = (err) => {
            callbacks.forEach((callback_) => {
                callback_(err);
            });
            const flushResponses = this.flushResponses.slice(0, this.flushResponses.length);
            this.flushCallbacks
                .splice(0, this.flushCallbacks.length)
                .map((callback) => setImmediate(callback, flushResponses));
        };
        const data = {
            batch: currentBatchOfMessages,
            sentAt: new Date(),
        };
        this.logger.debug('batch size is ' + itemsToFlush.length);
        this.logger.trace('===data===', data);
        const req = {
            method: 'POST',
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json;charset=utf-8',
                'user-agent': `expo-rudder-sdk-node/${version}`,
                authorization: 'Basic ' + Buffer.from(`${this.writeKey}:`).toString('base64'),
            },
            body: JSON.stringify(data),
            timeout: this.timeout > 0 ? this.timeout : undefined,
            retryDelay: this.getExponentialDelay.bind(this),
            retryOn: this.isErrorRetryable.bind(this),
        };
        let error = undefined;
        try {
            const response = await retryableFetch(`${this.host}`, req);
            if (!response.ok) {
                // handle 4xx 5xx errors
                this.logger.error('request failed to send after 3 retries, dropping ' + itemsToFlush.length + ' events');
                error = new Error(response.statusText);
            }
        }
        catch (err) {
            // handle network errors
            this.logger.error('request failed to send after 3 retries, dropping ' + itemsToFlush.length + ' events');
            error = err;
        }
        this.flushResponses.push({ error, data });
        const finishedFlushing = currentBatchOfMessages[currentBatchOfMessages.length - 1].messageId === this.finalMessageId ||
            !this.finalMessageId;
        if (finishedFlushing) {
            if (error) {
                done(error);
            }
            else {
                done();
            }
            return this.flushResponses.splice(0, this.flushResponses.length);
        }
        callbacks.forEach((callback_) => {
            callback_(error);
        });
        return await this.executeFlush(flushedItems.concat(itemsToFlush));
    }
    /**
     * Calculates the amount of time to wait before retrying a request, given the number of prior
     * retries (excluding the initial attempt).
     *
     * @param priorRetryCount the number of prior retries, starting from zero
     */
    getExponentialDelay(priorRetryCount) {
        const delay = 2 ** priorRetryCount * 200;
        const jitter = delay * 0.2 * Math.random(); // 0-20% of the delay
        return delay + jitter;
    }
    /**
     * Returns whether to retry a request that failed with the given error or returned the given
     * response.
     */
    isErrorRetryable(priorRetryCount, error, response) {
        // 3 retries max
        if (priorRetryCount > 2) {
            return false;
        }
        return (
        // Retry on any network error
        !!error ||
            // Retry if rate limited
            response.status === 429 ||
            // Retry on 5xx status codes due to server errors
            (response.status >= 500 && response.status <= 599));
    }
    nullFlushResponse() {
        return [
            {
                data: {
                    batch: [],
                    sentAt: new Date(),
                },
            },
        ];
    }
}
exports.default = Analytics;
//# sourceMappingURL=index.js.map