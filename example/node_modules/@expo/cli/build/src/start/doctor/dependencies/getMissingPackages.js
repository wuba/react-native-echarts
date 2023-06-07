"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.collectMissingPackages = collectMissingPackages;
exports.versionSatisfiesRequiredPackage = versionSatisfiesRequiredPackage;
exports.getMissingPackagesAsync = getMissingPackagesAsync;
exports.mutatePackagesWithKnownVersionsAsync = mutatePackagesWithKnownVersionsAsync;
var _jsonFile = _interopRequireDefault(require("@expo/json-file"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _semver = _interopRequireDefault(require("semver"));
var _getVersionedPackages = require("./getVersionedPackages");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:doctor:dependencies:getMissingPackages");
function collectMissingPackages(projectRoot, requiredPackages) {
    const resolutions = {};
    const missingPackages = requiredPackages.filter((p)=>{
        const resolved = _resolveFrom.default.silent(projectRoot, p.file);
        if (!resolved || !versionSatisfiesRequiredPackage(resolved, p)) {
            return true;
        }
        resolutions[p.pkg] = resolved;
        return false;
    });
    return {
        missing: missingPackages,
        resolutions
    };
}
function versionSatisfiesRequiredPackage(packageJsonFilePath, resolvedPackage) {
    // If the version is specified, check that it satisfies the installed version.
    if (!resolvedPackage.version) {
        debug(`Required package "${resolvedPackage.pkg}" found (no version constraint specified).`);
        return true;
    }
    const pkgJson = _jsonFile.default.read(packageJsonFilePath);
    if (// package.json has version.
    typeof pkgJson.version === "string" && // semver satisfaction.
    _semver.default.satisfies(pkgJson.version, resolvedPackage.version)) {
        return true;
    }
    debug(`Installed package "${resolvedPackage.pkg}" does not satisfy version constraint "${resolvedPackage.version}" (version: "${pkgJson.version}")`);
    return false;
}
async function getMissingPackagesAsync(projectRoot, { sdkVersion , requiredPackages  }) {
    const results = collectMissingPackages(projectRoot, requiredPackages);
    if (!results.missing.length) {
        return results;
    }
    // Ensure the versions are right for the SDK that the project is currently using.
    await mutatePackagesWithKnownVersionsAsync(projectRoot, sdkVersion, results.missing);
    return results;
}
async function mutatePackagesWithKnownVersionsAsync(projectRoot, sdkVersion, packages) {
    // Ensure the versions are right for the SDK that the project is currently using.
    const relatedPackages = await (0, _getVersionedPackages).getCombinedKnownVersionsAsync({
        projectRoot,
        sdkVersion
    });
    for (const pkg of packages){
        if (// Only use the SDK versions if the package does not already have a hardcoded version.
        // We do this because some packages have API coded into the CLI which expects an exact version.
        !pkg.version && pkg.pkg in relatedPackages) {
            pkg.version = relatedPackages[pkg.pkg];
        }
    }
    return packages;
}

//# sourceMappingURL=getMissingPackages.js.map