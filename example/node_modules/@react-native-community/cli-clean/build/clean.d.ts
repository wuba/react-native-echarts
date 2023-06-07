import type { Config as CLIConfig } from '@react-native-community/cli-types';
declare type Args = {
    include?: string;
    projectRoot: string;
    verifyCache?: boolean;
};
export declare function clean(_argv: string[], _config: CLIConfig, cleanOptions: Args): Promise<void>;
declare const _default: {
    func: typeof clean;
    name: string;
    description: string;
    options: ({
        name: string;
        description: string;
        default?: undefined;
    } | {
        name: string;
        description: string;
        default: string;
    } | {
        name: string;
        description: string;
        default: boolean;
    })[];
};
export default _default;
//# sourceMappingURL=clean.d.ts.map