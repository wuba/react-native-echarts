"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const spawnAsync_1 = __importDefault(require("../spawnAsync"));
it(`receives output from completed processes`, async () => {
    let result = await spawnAsync_1.default('echo', ['hi']);
    expect(typeof result.pid).toBe('number');
    expect(result.stdout).toBe('hi\n');
    expect(result.stderr).toBe('');
    expect(result.output[0]).toBe(result.stdout);
    expect(result.output[1]).toBe(result.stderr);
    expect(result.status).toBe(0);
    expect(result.signal).toBe(null);
});
it(`throws errors when processes return non-zero exit codes`, async () => {
    let didThrow = false;
    try {
        await spawnAsync_1.default('false');
    }
    catch (e) {
        didThrow = true;
        expect(typeof e.pid).toBe('number');
        expect(e.status).toBe(1);
        expect(e.signal).toBe(null);
    }
    expect(didThrow).toBe(true);
});
it(`returns when processes are killed with signals with non-zero exit codes`, async () => {
    let didThrow = false;
    try {
        await spawnAsync_1.default(path_1.default.join(__dirname, 'signal-self.sh'));
    }
    catch (e) {
        didThrow = true;
        expect(typeof e.pid).toBe('number');
        expect(e.status).toBe(null);
        expect(e.signal).toBe('SIGKILL');
    }
    expect(didThrow).toBe(true);
});
it(`throws errors when processes don't exist`, async () => {
    let didThrow = false;
    try {
        await spawnAsync_1.default('nonexistent-program');
    }
    catch (e) {
        didThrow = true;
        expect(e.pid).not.toBeDefined();
        expect(e.code).toBe('ENOENT');
        expect(e.status).toBe(null);
        expect(e.signal).toBe(null);
    }
    expect(didThrow).toBe(true);
});
it(`exposes the child process through a property named "child"`, async () => {
    let spawnTask = spawnAsync_1.default('echo', ['hi']);
    let childProcess = spawnTask.child;
    expect(childProcess).toBeDefined();
    let result = await spawnTask;
    expect(result.pid).toBe(childProcess.pid);
});
it(`runs extra listeners added to the child process`, async () => {
    let spawnTask = spawnAsync_1.default('echo', ['hi']);
    let mockExitListener = jest.fn();
    let mockCloseListener = jest.fn();
    spawnTask.child.on('exit', mockExitListener);
    spawnTask.child.on('close', mockCloseListener);
    await spawnTask;
    expect(mockExitListener).toHaveBeenCalledTimes(1);
    expect(mockCloseListener).toHaveBeenCalledTimes(1);
});
it(`runs extra error listeners added to the child process when there is an error`, async () => {
    let spawnTask = spawnAsync_1.default('nonexistent-program');
    let mockErrorListener = jest.fn();
    spawnTask.child.on('error', mockErrorListener);
    await expect(spawnTask).rejects.toThrowError();
    expect(mockErrorListener).toHaveBeenCalledTimes(1);
});
it(`returns empty strings when ignoring stdio`, async () => {
    let result = await spawnAsync_1.default('echo', ['hi'], { ignoreStdio: true });
    expect(typeof result.pid).toBe('number');
    expect(result.stdout).toBe('');
    expect(result.stderr).toBe('');
    expect(result.output[0]).toBe(result.stdout);
    expect(result.output[1]).toBe(result.stderr);
    expect(result.status).toBe(0);
    expect(result.signal).toBe(null);
});
it(`returns even if stdout is open when ignoring stdio`, async () => {
    // Without ignoring stdio, the promise will never resolve as stdout remains open indefinitely
    let sourceTask = spawnAsync_1.default('yes', [], { ignoreStdio: true });
    expect(sourceTask.child.listenerCount('exit')).toBe(1);
    expect(sourceTask.child.listenerCount('close')).toBe(0);
    // Create a sink that keeps the source's stdout open even after the source process exits
    let sinkTask = spawnAsync_1.default('cat');
    sourceTask.child.stdout.pipe(sinkTask.child.stdin);
    sinkTask.child.stdin.cork();
    // Allow the source's stdout to buffer with a short delay
    await new Promise(resolve => setTimeout(resolve, 5));
    // The source's stdout stays open even after killing the process
    sourceTask.child.kill();
    await expect(sourceTask).rejects.toThrowError();
    // Destroy the sink's stdin stream to let the process exit
    sinkTask.child.stdin.destroy();
    await expect(sinkTask).resolves.toMatchObject({ status: 0, stdout: '', stderr: '' });
});
it('throws errors with preserved stack traces when processes return non-zero exit codes', async () => {
    expect.assertions(2);
    try {
        await spawnAsync_1.default('false');
    }
    catch (e) {
        expect(e.stack).toMatch(/\n    \.\.\.\n/);
        expect(e.stack).toMatch(/at Object\.spawnAsync/);
    }
});
//# sourceMappingURL=spawnAsync-test.js.map