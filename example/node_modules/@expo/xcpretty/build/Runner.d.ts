/// <reference types="node" />
export declare function formatXcodeBuildPipeProcessAsync(projectRoot: string, { xcodeProjectName }?: {
    xcodeProjectName?: string;
}): Promise<string>;
export declare function createXcodeBuildHooks(projectRoot: string, { xcodeProjectName, resolve, reject, }: {
    xcodeProjectName?: string;
    resolve: (buildOutput: string) => void;
    reject: (error: Error) => void;
}): {
    onData: (data: Buffer) => void;
    onErr: (data: Buffer) => void;
    onEnd: (code: number) => void;
};
export declare function writeBuildLogs(projectRoot: string, buildOutput: string, errorOutput: string): string;
export declare function getErrorLogFilePath(projectRoot: string): [string, string];
