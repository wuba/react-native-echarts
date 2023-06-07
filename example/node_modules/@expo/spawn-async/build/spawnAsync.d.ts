/// <reference types="node" />
import { ChildProcess, SpawnOptions as NodeSpawnOptions } from 'child_process';
export interface SpawnOptions extends NodeSpawnOptions {
    ignoreStdio?: boolean;
}
export interface SpawnPromise<T> extends Promise<T> {
    child: ChildProcess;
}
export interface SpawnResult {
    pid: number;
    output: string[];
    stdout: string;
    stderr: string;
    status: number | null;
    signal: string | null;
}
export default function spawnAsync(command: string, args?: ReadonlyArray<string>, options?: SpawnOptions): SpawnPromise<SpawnResult>;
