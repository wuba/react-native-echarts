declare const _default: ({
    name: string;
    description: string;
    func: (_: string[], config: import("@react-native-community/cli-types").Config, args: import("./bundle").CommandLineArgs, output: any) => Promise<void | undefined>;
    options: ({
        name: string;
        description: string;
        default?: undefined;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        default: string;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => boolean;
        default: boolean;
    } | {
        name: string;
        description: string;
        parse: (val: string) => boolean;
        default?: undefined;
    } | {
        name: string;
        description: string;
        parse: (workers: string) => number;
        default?: undefined;
    } | {
        name: string;
        description: string;
        default: boolean;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => string;
        default?: undefined;
    })[];
    withOutput: (_: string[], config: import("@react-native-community/cli-types").Config, args: import("./bundle").CommandLineArgs, output: any) => Promise<void | undefined>;
} | {
    name: string;
    description: string;
    func: typeof import("./bundle/ramBundle").ramBundle;
    options: ({
        name: string;
        description: string;
        default?: undefined;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        default: string;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => boolean;
        default: boolean;
    } | {
        name: string;
        description: string;
        parse: (val: string) => boolean;
        default?: undefined;
    } | {
        name: string;
        description: string;
        parse: (workers: string) => number;
        default?: undefined;
    } | {
        name: string;
        description: string;
        default: boolean;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => string;
        default?: undefined;
    })[];
} | {
    name: string;
    func: typeof import("./start/runServer").default;
    description: string;
    options: ({
        name: string;
        parse: NumberConstructor;
        default?: undefined;
        description?: undefined;
    } | {
        name: string;
        default: string;
        parse?: undefined;
        description?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => string;
        default?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => string[];
        default?: undefined;
    } | {
        name: string;
        description: string;
        parse: (workers: string) => number;
        default?: undefined;
    } | {
        name: string;
        description: string;
        parse?: undefined;
        default?: undefined;
    })[];
})[];
export default _default;
export { buildBundleWithConfig } from './bundle';
export type { CommandLineArgs } from './bundle';
//# sourceMappingURL=index.d.ts.map