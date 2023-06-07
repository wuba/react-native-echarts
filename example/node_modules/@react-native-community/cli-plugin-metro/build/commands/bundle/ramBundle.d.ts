import { CommandLineArgs } from './bundleCommandLineArgs';
import type { Config } from '@react-native-community/cli-types';
/**
 * Builds the bundle starting to look for dependencies at the given entry path.
 */
declare function ramBundle(argv: Array<string>, config: Config, args: CommandLineArgs): Promise<void | undefined>;
declare const _default: {
    name: string;
    description: string;
    func: typeof ramBundle;
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
};
export default _default;
export { ramBundle };
//# sourceMappingURL=ramBundle.d.ts.map