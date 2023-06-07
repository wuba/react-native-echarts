"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstExternalSourceForPod = exports.getDependentPods = void 0;
function getDependentPods(podfileLock, { name, version }) {
    if (!podfileLock.pods) {
        return [];
    }
    const hasPodDependency = (pods) => {
        for (const podDependency of pods) {
            if (podDependency.name === name) {
                return !version || podDependency.version === version;
            }
            if (podDependency.dependencies && hasPodDependency(podDependency.dependencies)) {
                return true;
            }
        }
        return false;
    };
    return podfileLock.pods.reduce((prev, curr) => {
        if (curr.name !== name && curr.dependencies && hasPodDependency(curr.dependencies)) {
            return [...prev, curr.name];
        }
        return prev;
    }, []);
}
exports.getDependentPods = getDependentPods;
/**
 * Find the first "external source" (local file path reference) for a given pod.
 *
 * @param podfileLock
 * @param props.name The pod name to search for.
 * @param props.checked A recursive parameter to prevent infinite recursion, not for public use.
 * @returns
 */
function getFirstExternalSourceForPod(podfileLock, { name, checked }) {
    if (!podfileLock.externalSources) {
        return null;
    }
    if (podfileLock.externalSources[name]) {
        return { pod: name, source: podfileLock.externalSources[name] };
    }
    else if (name.includes('/')) {
        // Short cut for pods with a path
        const possibleName = name.split('/')[0];
        if (podfileLock.externalSources[possibleName]) {
            return { pod: possibleName, source: podfileLock.externalSources[possibleName] };
        }
    }
    if (!checked) {
        checked = [];
    }
    checked.push(name);
    const dependents = getDependentPods(podfileLock, { name });
    for (const dependent of dependents) {
        // Prevent pods with cyclic dependencies from causing infinite loops.
        if (!checked.includes(dependent)) {
            const results = getFirstExternalSourceForPod(podfileLock, { name: dependent, checked });
            if (results) {
                return results;
            }
        }
    }
    return null;
}
exports.getFirstExternalSourceForPod = getFirstExternalSourceForPod;
//# sourceMappingURL=getFirstExternalSourceForPod.js.map