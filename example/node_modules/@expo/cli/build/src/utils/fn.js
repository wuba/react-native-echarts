"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.memoize = memoize;
exports.guardAsync = guardAsync;
function memoize(fn) {
    const cache = {};
    return (...args)=>{
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}
function guardAsync(fn) {
    let invoked = false;
    let returnValue;
    const guard = async (...args)=>{
        if (!invoked) {
            invoked = true;
            returnValue = await fn(...args);
        }
        return returnValue;
    };
    return guard;
}

//# sourceMappingURL=fn.js.map