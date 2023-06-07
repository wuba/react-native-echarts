import { Config } from '@react-native-community/cli-types';
export declare function getAndroidProject(config: Config): import("@react-native-community/cli-types").AndroidProjectConfig;
/**
 * Get the package name/namespace of the running React Native app
 * @param manifestPath The path to the AndroidManifest.xml
 * @param buildGradlePath The path to the build.gradle[.kts] file.
 */
export declare function getPackageName(manifestPath: string | null, buildGradlePath: string | null): string;
export declare function parsePackageNameFromAndroidManifestFile(androidManifest: string): string | null;
export declare function parseNamespaceFromBuildGradleFile(buildGradle: string): string | null;
export declare function validatePackageName(packageName: string): boolean;
//# sourceMappingURL=getAndroidProject.d.ts.map