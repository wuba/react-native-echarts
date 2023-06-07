"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_spawn_1 = __importDefault(require("cross-spawn"));
function spawnAsync(command, args, options = {}) {
    const fakeErr = new Error('fake error just to preserve stacktrace');
    const previousStack = fakeErr.stack && fakeErr.stack.split('\n').splice(1);
    const previousStackString = previousStack && ['    ...', ...previousStack].join('\n');
    let child;
    let promise = new Promise((resolve, reject) => {
        let { ignoreStdio } = options, nodeOptions = __rest(options, ["ignoreStdio"]);
        // @ts-ignore: cross-spawn declares "args" to be a regular array instead of a read-only one
        child = cross_spawn_1.default(command, args, nodeOptions);
        let stdout = '';
        let stderr = '';
        if (!ignoreStdio) {
            if (child.stdout) {
                child.stdout.on('data', data => {
                    stdout += data;
                });
            }
            if (child.stderr) {
                child.stderr.on('data', data => {
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
                let error = signal
                    ? new Error(`${command} exited with signal: ${signal}`)
                    : new Error(`${command} exited with non-zero code: ${code}`);
                if (error.stack && previousStackString) {
                    error.stack += `\n${previousStackString}`;
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
exports.default = spawnAsync;
//# sourceMappingURL=spawnAsync.js.map