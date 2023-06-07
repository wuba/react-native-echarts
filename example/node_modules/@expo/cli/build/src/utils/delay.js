"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delayAsync = delayAsync;
exports.waitForActionAsync = waitForActionAsync;
exports.resolveWithTimeout = resolveWithTimeout;
var _errors = require("./errors");
function delayAsync(timeout) {
    return new Promise((resolve)=>setTimeout(resolve, timeout)
    );
}
async function waitForActionAsync({ action , interval =100 , maxWaitTime =20000  }) {
    let complete;
    const start = Date.now();
    do {
        const actionStartTime = Date.now();
        complete = await action();
        const actionTimeElapsed = Date.now() - actionStartTime;
        const remainingDelayInterval = interval - actionTimeElapsed;
        if (remainingDelayInterval > 0) {
            await delayAsync(remainingDelayInterval);
        }
        if (Date.now() - start > maxWaitTime) {
            break;
        }
    }while (!complete);
    return complete;
}
function resolveWithTimeout(action, { timeout , errorMessage  }) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            reject(new _errors.CommandError("TIMEOUT", errorMessage));
        }, timeout);
        action().then(resolve, reject);
    });
}

//# sourceMappingURL=delay.js.map