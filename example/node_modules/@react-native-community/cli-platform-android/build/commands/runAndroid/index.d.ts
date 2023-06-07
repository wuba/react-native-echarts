import { Config } from '@react-native-community/cli-types';
import { BuildFlags } from '../buildAndroid';
export interface Flags extends BuildFlags {
    appId: string;
    appIdSuffix: string;
    mainActivity: string;
    deviceId?: string;
    listDevices?: boolean;
    binaryPath?: string;
}
export declare type AndroidProject = NonNullable<Config['project']['android']>;
/**
 * Starts the app on a connected Android emulator or device.
 */
declare function runAndroid(_argv: Array<string>, config: Config, args: Flags): Promise<void>;
declare const _default: {
    name: string;
    description: string;
    func: typeof runAndroid;
    options: ({
        name: string;
        description: string;
        default?: undefined;
        parse?: undefined;
    } | {
        name: string;
        default: string | number;
        parse: NumberConstructor;
        description?: undefined;
    } | {
        name: string;
        description: string;
        default: string | undefined;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => string[];
        default?: undefined;
    } | {
        name: string;
        description: string;
        default: boolean;
        parse?: undefined;
    })[];
};
export default _default;
//# sourceMappingURL=index.d.ts.map