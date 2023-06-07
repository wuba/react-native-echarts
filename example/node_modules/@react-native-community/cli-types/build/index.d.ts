import { IOSProjectConfig, IOSProjectParams, IOSDependencyConfig, IOSDependencyParams, IOSProjectInfo } from './ios';
import { AndroidProjectConfig, AndroidProjectParams, AndroidDependencyConfig, AndroidDependencyParams } from './android';
export declare type Prompt = any;
export declare type CommandFunction<Args = Object> = (argv: Array<string>, ctx: Config, args: Args) => Promise<void> | void;
export declare type OptionValue = string | boolean | number;
export declare type CommandOption<T = (ctx: Config) => OptionValue> = {
    name: string;
    description?: string;
    parse?: (val: string) => any;
    default?: OptionValue | T;
};
export declare type DetachedCommandFunction<Args = Object> = (argv: string[], args: Args) => Promise<void> | void;
export declare type Command<IsDetached extends boolean = false> = {
    name: string;
    description?: string;
    detached?: IsDetached;
    examples?: Array<{
        desc: string;
        cmd: string;
    }>;
    pkg?: {
        name: string;
        version: string;
    };
    func: IsDetached extends true ? DetachedCommandFunction<Object> : CommandFunction<Object>;
    options?: Array<CommandOption<IsDetached extends true ? () => OptionValue : (ctx: Config) => OptionValue>>;
};
export declare type DetachedCommand = Command<true>;
interface PlatformConfig<ProjectConfig, ProjectParams, DependencyConfig, DependencyParams> {
    npmPackageName?: string;
    projectConfig: (projectRoot: string, projectParams: ProjectParams | void) => ProjectConfig | void;
    dependencyConfig: (dependency: string, params: DependencyParams) => DependencyConfig | void;
}
declare type AndroidPlatformConfig = PlatformConfig<AndroidProjectConfig, AndroidProjectParams, AndroidDependencyConfig, AndroidDependencyParams>;
declare type IOSPlatformConfig = PlatformConfig<IOSProjectConfig, IOSProjectParams, IOSDependencyConfig, IOSDependencyParams>;
export declare type ProjectConfig = {
    android?: Exclude<ReturnType<AndroidPlatformConfig['projectConfig']>, void>;
    ios?: Exclude<ReturnType<IOSPlatformConfig['projectConfig']>, void>;
    [key: string]: any;
};
export interface DependencyConfig {
    name: string;
    root: string;
    platforms: {
        android?: Exclude<ReturnType<AndroidPlatformConfig['dependencyConfig']>, void>;
        ios?: Exclude<ReturnType<IOSPlatformConfig['dependencyConfig']>, void>;
        [key: string]: any;
    };
}
export interface Config {
    root: string;
    reactNativePath: string;
    project: ProjectConfig;
    dependencies: {
        [key: string]: DependencyConfig;
    };
    platforms: {
        android: AndroidPlatformConfig;
        ios: IOSPlatformConfig;
        [name: string]: PlatformConfig<any, any, any, any>;
    };
    commands: Command[];
    healthChecks: [];
}
export declare type UserConfig = Omit<Config, 'root'> & {
    reactNativePath: string | void;
    project: {
        android?: AndroidProjectParams;
        ios?: IOSProjectParams;
        [key: string]: any;
    };
};
export declare type UserDependencyConfig = {
    dependency: Omit<DependencyConfig, 'name' | 'root'>;
    commands: Command[];
    platforms: Config['platforms'];
    healthChecks: [];
};
export { IOSProjectConfig, IOSProjectParams, IOSDependencyConfig, IOSDependencyParams, IOSProjectInfo, };
export { AndroidProjectConfig, AndroidProjectParams, AndroidDependencyConfig, AndroidDependencyParams, };
//# sourceMappingURL=index.d.ts.map