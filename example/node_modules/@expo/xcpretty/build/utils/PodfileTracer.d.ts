import { PodfileLock } from './parsePodfileLock';
/**
 * A utility for tracing dependencies from a Podfile.lock.
 */
export declare class PodfileTracer {
    props: {
        projectRoot: string;
        rootTargetName?: string;
        podfile: PodfileLock;
    };
    static create(projectRoot: string, { xcodeProject }?: {
        xcodeProject?: {
            name: string;
        };
    }): PodfileTracer;
    get podfile(): PodfileLock;
    constructor(props: {
        projectRoot: string;
        rootTargetName?: string;
        podfile: PodfileLock;
    });
    getNodeModuleNameForTarget: (key: string) => {
        name: string;
        isRootTarget: boolean;
    } | null;
    getNodeModuleNameForTargetWithoutCache(target: string): {
        name: string;
        isRootTarget: boolean;
    } | null;
    isRootTarget(target: string): boolean | "" | undefined;
    getNodeModuleName(filePath: string, target?: string): {
        name: string;
        isRootTarget: boolean;
    } | null;
    getExternalSourceForPod: (key: string) => {
        pod: string;
        source: string;
    } | null;
    getExternalSourceForPodWithoutCache(pod?: string): {
        pod: string;
        source: string;
    } | null;
    private memoizedGetPackageJsonAnyFilePathInModule;
    /** This can be a path like `/app/node_modules/expo-camera/ios` or `/app/node_modules/react-native-webrtc` depending on where the podspec is. */
    getPackageJsonAnyFilePathInModule(props: {
        target: string;
        filePath: string;
    }): Record<string, any> | null;
    getPackageJsonAnyFilePathInModuleWithoutCache(filePath: string): Record<string, any> | null;
}
