import { Config } from '@react-native-community/cli-types';
/**
 * Upgrade application to a new version of React Native.
 */
declare function upgrade(argv: Array<string>, ctx: Config): Promise<void>;
declare const upgradeCommand: {
    name: string;
    description: string;
    func: typeof upgrade;
};
export default upgradeCommand;
//# sourceMappingURL=upgrade.d.ts.map