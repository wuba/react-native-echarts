import execa from 'execa';
declare type Options = {
    preferYarn?: boolean;
    silent?: boolean;
    root: string;
};
export declare function init(options: Options): execa.ExecaChildProcess;
export declare function install(packageNames: Array<string>, options: Options): execa.ExecaChildProcess;
export declare function installDev(packageNames: Array<string>, options: Options): execa.ExecaChildProcess;
export declare function uninstall(packageNames: Array<string>, options: Options): execa.ExecaChildProcess;
export declare function installAll(options: Options): execa.ExecaChildProcess;
export {};
//# sourceMappingURL=packageManager.d.ts.map