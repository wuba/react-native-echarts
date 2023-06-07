"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodfileTracer = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getFirstExternalSourceForPod_1 = require("./getFirstExternalSourceForPod");
const getNodeModuleName_1 = require("./getNodeModuleName");
const getPackageJsonForPath_1 = require("./getPackageJsonForPath");
const parsePodfileLock_1 = require("./parsePodfileLock");
/**
 * A utility for tracing dependencies from a Podfile.lock.
 */
class PodfileTracer {
    constructor(props) {
        this.props = props;
        // Wrap the expensive method in a cache
        this.getNodeModuleNameForTarget = memoize(this.getNodeModuleNameForTargetWithoutCache.bind(this));
        this.getExternalSourceForPod = memoize(this.getExternalSourceForPodWithoutCache.bind(this));
        this.memoizedGetPackageJsonAnyFilePathInModule = memoizeTrigger(this.getPackageJsonAnyFilePathInModuleWithoutCache.bind(this));
    }
    static create(projectRoot, { xcodeProject } = {}) {
        var _a, _b;
        const podfileLock = path_1.default.join(projectRoot, 'ios', 'Podfile.lock');
        const podfileContents = fs_1.default.readFileSync(podfileLock, 'utf8');
        const rootTargetName = ((_a = xcodeProject === null || xcodeProject === void 0 ? void 0 : xcodeProject.name.match(/.*\/(.*)\.\w+/)) === null || _a === void 0 ? void 0 : _a[1]) || '';
        const formatter = new PodfileTracer({
            projectRoot,
            rootTargetName,
            podfile: (_b = parsePodfileLock_1.parsePodfileLock(podfileContents)) !== null && _b !== void 0 ? _b : {},
        });
        return formatter;
    }
    get podfile() {
        return this.props.podfile || {};
    }
    getNodeModuleNameForTargetWithoutCache(target) {
        if (!target) {
            return null;
        }
        // Check the list of known pods that are hardcoded into the system.
        if (target in knownPackages) {
            return { name: knownPackages[target], isRootTarget: false };
        }
        // Check if the target matches the root project.
        if (this.isRootTarget(target)) {
            // Get the root package.json
            const pkg = this.getPackageJsonAnyFilePathInModule({
                target,
                filePath: this.props.projectRoot,
            });
            return pkg ? { name: pkg.name, isRootTarget: true } : null;
        }
        // Otherwise, start tracing for dependencies.
        let source = this.getExternalSourceForPod(target);
        if (!source) {
            // Some modules are formatted incorrectly in Xcode like `EXUpdates-EXUpdates` or `EXConstants-EXConstants`
            // here we'll attempt to split the value, ensure there's more than one copy, and that all copies are the same, then we'll check against that new value.
            const parts = target.split('-');
            if (!!parts[0] && parts.length > 1 && parts.every(s => s === parts[0])) {
                source = this.getExternalSourceForPod(parts[0]);
            }
        }
        if (source === null || source === void 0 ? void 0 : source.source) {
            // Finally attempt to trace the podspec file.
            const pkg = this.getPackageJsonAnyFilePathInModule({
                target: source.pod,
                filePath: source.source,
            });
            if (pkg) {
                return { name: pkg.name, isRootTarget: false };
            }
        }
        return null;
    }
    isRootTarget(target) {
        return (this.props.rootTargetName &&
            (target === this.props.rootTargetName || target === `Pods-${this.props.rootTargetName}`));
    }
    getNodeModuleName(filePath, target) {
        const moduleName = getNodeModuleName_1.getNodeModuleName(filePath);
        if (moduleName) {
            return { name: moduleName, isRootTarget: false };
        }
        else if (!target) {
            return null;
        }
        return this.getNodeModuleNameForTarget(target);
    }
    getExternalSourceForPodWithoutCache(pod) {
        var _a, _b;
        if (!pod) {
            return null;
        }
        const results = getFirstExternalSourceForPod_1.getFirstExternalSourceForPod(this.podfile, { name: pod });
        // Keep tracing until we get to a development pod with a local file reference.
        const filePath = (_b = (_a = results === null || results === void 0 ? void 0 : results.source[':podspec']) !== null && _a !== void 0 ? _a : results === null || results === void 0 ? void 0 : results.source[':path']) !== null && _b !== void 0 ? _b : null;
        if (results && filePath) {
            return { pod: results.pod, source: filePath };
        }
        return null;
    }
    /** This can be a path like `/app/node_modules/expo-camera/ios` or `/app/node_modules/react-native-webrtc` depending on where the podspec is. */
    getPackageJsonAnyFilePathInModule(props) {
        return this.memoizedGetPackageJsonAnyFilePathInModule({
            key: props.target,
            args: [props.filePath],
        });
    }
    getPackageJsonAnyFilePathInModuleWithoutCache(filePath) {
        if (!this.props.projectRoot || !filePath) {
            return null;
        }
        const nativeProjectRoot = path_1.default.join(this.props.projectRoot, 'ios');
        // In the case of the root level podspec file.
        try {
            const rootLevelPkgJsonPath = path_1.default.join(nativeProjectRoot, 'package.json');
            return require(rootLevelPkgJsonPath);
        }
        catch {
            return getPackageJsonForPath_1.getPackageJsonForPath(path_1.default.join(nativeProjectRoot, filePath));
        }
    }
}
exports.PodfileTracer = PodfileTracer;
function memoize(func) {
    const cache = {};
    return function (key) {
        if (key in cache) {
            return cache[key];
        }
        const result = func(key);
        cache[key] = result;
        return result;
    };
}
function memoizeTrigger(func) {
    const cache = {};
    return function ({ key, args }) {
        if (key in cache) {
            return cache[key];
        }
        // @ts-ignore
        const result = func(...args);
        cache[key] = result;
        return result;
    };
}
// A list of packages that aren't linked through cocoapods directly.
const knownPackages = {
    // Added to ReactCore as a `resource_bundle`
    'React-Core-AccessibilityResources': 'react-native',
    YogaKit: 'react-native',
    // flipper
    'Flipper-DoubleConversion': 'react-native',
    'Flipper-Folly': 'react-native',
    'OpenSSL-Universal': 'react-native',
    FlipperKit: 'react-native',
    Flipper: 'react-native',
    'Flipper-RSocket': 'react-native',
};
//# sourceMappingURL=PodfileTracer.js.map