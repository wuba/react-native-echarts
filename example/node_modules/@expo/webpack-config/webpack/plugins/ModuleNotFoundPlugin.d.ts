import { Compiler } from 'webpack';
export declare class ModuleNotFoundPlugin {
    private appPath;
    private yarnLockFile?;
    constructor(appPath: string, yarnLockFile?: string | undefined);
    private useYarnCommand;
    private getRelativePath;
    private prettierError;
    apply(compiler: Compiler): void;
}
