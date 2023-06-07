/// <reference types="node" />
import { ChildProcess, SpawnOptions as NodeSpawnOptions } from 'child_process';
declare namespace spawnAsync {
    interface SpawnOptions extends NodeSpawnOptions {
        ignoreStdio?: boolean;
    }
    interface SpawnPromise<T> extends Promise<T> {
        child: ChildProcess;
    }
    interface SpawnResult {
        pid?: number;
        output: string[];
        stdout: string;
        stderr: string;
        status: number | null;
        signal: string | null;
    }
}
declare function spawnAsync(command: string, args?: ReadonlyArray<string>, options?: spawnAsync.SpawnOptions): spawnAsync.SpawnPromise<spawnAsync.SpawnResult>;
export = spawnAsync;
