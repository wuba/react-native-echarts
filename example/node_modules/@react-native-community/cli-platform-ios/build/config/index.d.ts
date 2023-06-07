import findAllPodfilePaths from './findAllPodfilePaths';
import { IOSProjectParams, IOSDependencyParams, IOSProjectConfig, IOSDependencyConfig } from '@react-native-community/cli-types';
/**
 * Returns project config by analyzing given folder and applying some user defaults
 * when constructing final object
 */
export declare function projectConfig(folder: string, userConfig: IOSProjectParams): IOSProjectConfig | null;
export declare function dependencyConfig(folder: string, userConfig?: IOSDependencyParams | null): IOSDependencyConfig | null;
export declare const findPodfilePaths: typeof findAllPodfilePaths;
//# sourceMappingURL=index.d.ts.map