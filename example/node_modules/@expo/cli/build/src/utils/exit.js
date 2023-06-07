"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.installExitHooks = installExitHooks;
var _fn = require("./fn");
const debug = require("debug")("expo:utils:exit");
const PRE_EXIT_SIGNALS = [
    "SIGHUP",
    "SIGINT",
    "SIGTERM",
    "SIGBREAK"
];
// We create a queue since Node.js throws an error if we try to append too many listeners:
// (node:4405) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 SIGINT listeners added to [process]. Use emitter.setMaxListeners() to increase limit
const queue = [];
let unsubscribe = null;
function installExitHooks(asyncExitHook) {
    // We need to instantiate the master listener the first time the queue is used.
    if (!queue.length) {
        // Track the master listener so we can remove it later.
        unsubscribe = attachMasterListener();
    }
    queue.push(asyncExitHook);
    return ()=>{
        const index = queue.indexOf(asyncExitHook);
        if (index >= 0) {
            queue.splice(index, 1);
        }
        // Clean up the master listener if we don't need it anymore.
        if (!queue.length) {
            unsubscribe == null ? void 0 : unsubscribe();
        }
    };
}
// Create a function that runs before the process exits and guards against running multiple times.
function createExitHook(signal) {
    return (0, _fn).guardAsync(async ()=>{
        debug(`pre-exit (signal: ${signal}, queue length: ${queue.length})`);
        for (const [index, hookAsync] of Object.entries(queue)){
            try {
                await hookAsync(signal);
            } catch (error) {
                debug(`Error in exit hook: %O (queue: ${index})`, error);
            }
        }
        var _exitCode;
        debug(`post-exit (code: ${(_exitCode = process.exitCode) != null ? _exitCode : 0})`);
        process.exit();
    });
}
function attachMasterListener() {
    const hooks = [];
    for (const signal1 of PRE_EXIT_SIGNALS){
        const hook = createExitHook(signal1);
        hooks.push([
            signal1,
            hook
        ]);
        process.on(signal1, hook);
    }
    return ()=>{
        for (const [signal, hook] of hooks){
            process.removeListener(signal, hook);
        }
    };
}

//# sourceMappingURL=exit.js.map