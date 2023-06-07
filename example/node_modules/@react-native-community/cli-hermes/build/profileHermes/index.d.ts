import { Config } from '@react-native-community/cli-types';
declare type Options = {
    filename?: string;
    raw?: boolean;
    sourcemapPath?: string;
    generateSourcemap?: boolean;
    port: string;
    appId?: string;
    appIdSuffix?: string;
};
declare function profileHermes([dstPath]: Array<string>, ctx: Config, options: Options): Promise<void>;
declare const _default: {
    name: string;
    description: string;
    func: typeof profileHermes;
    options: ({
        name: string;
        description: string;
        default?: undefined;
    } | {
        name: string;
        default: string;
        description?: undefined;
    })[];
    examples: {
        desc: string;
        cmd: string;
    }[];
};
export default _default;
//# sourceMappingURL=index.d.ts.map