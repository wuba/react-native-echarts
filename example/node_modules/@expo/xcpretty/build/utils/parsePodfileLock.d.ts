export interface PodDependency {
    name: string;
    version?: string;
    dependencies?: PodDependency[];
}
export interface ExternalSource {
    /** "../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec" */
    ':podspec'?: string;
    /** "../node_modules/expo-application/ios" */
    ':path'?: string;
}
export interface PodfileLock {
    pods?: PodDependency[];
    /** "1.11.2" */
    cocoapods?: string;
    externalSources?: Record<string, ExternalSource>;
    /** 73e35020f8f5d49ffd32debe3c1bdd501f8029a6 */
    podfileChecksum?: string;
    /** { "DoubleConversion": "cf9b38bf0b2d048436d9a82ad2abe1404f11e7de" } */
    specChecksums?: Record<string, string>;
}
/**
 * Parses a podfile.lock file from from YAML into a JSON object.
 *
 * @param str Podfile.lock file contents in YAML format.
 * @returns
 */
export declare function loadPodfileLock(str: string): null | Record<string, any>;
export declare const parsePodDependency: (pod: string | Record<string, string | Record<string, any>>) => PodDependency[];
export declare function parsePodfileLock(fileContent: string): PodfileLock | null;
export declare function getFilePathForExternalSource(podLock: PodfileLock, pod: string): string | null;
