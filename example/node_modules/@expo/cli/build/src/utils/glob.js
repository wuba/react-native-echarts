"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.everyMatchAsync = everyMatchAsync;
exports.anyMatchAsync = anyMatchAsync;
exports.wrapGlobWithTimeout = wrapGlobWithTimeout;
var _glob = require("glob");
function everyMatchAsync(pattern, options) {
    return new Promise((resolve, reject)=>{
        const g = new _glob.Glob(pattern, options);
        let called = false;
        const callback = (er, matched)=>{
            if (called) return;
            called = true;
            if (er) reject(er);
            else resolve(matched);
        };
        g.on("error", callback);
        g.on("end", (matches)=>callback(null, matches)
        );
    });
}
function anyMatchAsync(pattern, options) {
    return new Promise((resolve, reject)=>{
        const g = new _glob.Glob(pattern, options);
        let called = false;
        const callback = (er, matched)=>{
            if (called) return;
            called = true;
            if (er) reject(er);
            else resolve(matched);
        };
        g.on("error", callback);
        g.on("match", (matched)=>{
            // We've disabled using abort as it breaks the entire glob package across all instances.
            // https://github.com/isaacs/node-glob/issues/279 & https://github.com/isaacs/node-glob/issues/342
            // For now, just collect every match.
            // g.abort();
            callback(null, [
                matched
            ]);
        });
        g.on("end", (matches)=>callback(null, matches)
        );
    });
}
function wrapGlobWithTimeout(query, duration) {
    return new Promise(async (resolve, reject)=>{
        const timeout = setTimeout(()=>{
            resolve(false);
        }, duration);
        process.on("SIGINT", ()=>clearTimeout(timeout)
        );
        try {
            resolve(await query());
        } catch (error) {
            reject(error);
        } finally{
            clearTimeout(timeout);
        }
    });
}

//# sourceMappingURL=glob.js.map