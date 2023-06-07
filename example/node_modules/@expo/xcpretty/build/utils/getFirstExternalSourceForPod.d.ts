import { ExternalSource, PodfileLock } from './parsePodfileLock';
export declare function getDependentPods(podfileLock: PodfileLock, { name, version }: {
    name: string;
    version?: string;
}): string[];
/**
 * Find the first "external source" (local file path reference) for a given pod.
 *
 * @param podfileLock
 * @param props.name The pod name to search for.
 * @param props.checked A recursive parameter to prevent infinite recursion, not for public use.
 * @returns
 */
export declare function getFirstExternalSourceForPod(podfileLock: PodfileLock, { name, checked }: {
    name: string;
    checked?: string[];
}): {
    pod: string;
    source: ExternalSource;
} | null;
