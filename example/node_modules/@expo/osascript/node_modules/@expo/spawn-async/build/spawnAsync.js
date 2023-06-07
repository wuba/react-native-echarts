"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const cross_spawn_1 = __importDefault(require("cross-spawn"));
function spawnAsync(command, args, options = {}) {
    const stubError = new Error();
    const callerStack = stubError.stack ? stubError.stack.replace(/^.*/, '    ...') : null;
    let child;
    let promise = new Promise((resolve, reject) => {
        let { ignoreStdio, ...nodeOptions } = options;
        // @ts-ignore: cross-spawn declares "args" to be a regular array instead of a read-only one
        child = (0, cross_spawn_1.default)(command, args, nodeOptions);
        let stdout = '';
        let stderr = '';
        if (!ignoreStdio) {
            if (child.stdout) {
                child.stdout.on('data', (data) => {
                    stdout += data;
                });
            }
            if (child.stderr) {
                child.stderr.on('data', (data) => {
                    stderr += data;
                });
            }
        }
        let completionListener = (code, signal) => {
            child.removeListener('error', errorListener);
            let result = {
                pid: child.pid,
                output: [stdout, stderr],
                stdout,
                stderr,
                status: code,
                signal,
            };
            if (code !== 0) {
                let argumentString = args && args.length > 0 ? ` ${args.join(' ')}` : '';
                let error = signal
                    ? new Error(`${command}${argumentString} exited with signal: ${signal}`)
                    : new Error(`${command}${argumentString} exited with non-zero code: ${code}`);
                if (error.stack && callerStack) {
                    error.stack += `\n${callerStack}`;
                }
                Object.assign(error, result);
                reject(error);
            }
            else {
                resolve(result);
            }
        };
        let errorListener = (error) => {
            if (ignoreStdio) {
                child.removeListener('exit', completionListener);
            }
            else {
                child.removeListener('close', completionListener);
            }
            Object.assign(error, {
                pid: child.pid,
                output: [stdout, stderr],
                stdout,
                stderr,
                status: null,
                signal: null,
            });
            reject(error);
        };
        if (ignoreStdio) {
            child.once('exit', completionListener);
        }
        else {
            child.once('close', completionListener);
        }
        child.once('error', errorListener);
    });
    // @ts-ignore: TypeScript isn't aware the Promise constructor argument runs synchronously and
    // thinks `child` is not yet defined
    promise.child = child;
    return promise;
}
module.exports = spawnAsync;
//# sourceMappingURL=spawnAsync.js.map