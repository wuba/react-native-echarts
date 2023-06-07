"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasPackageJsonDependencyListChangedAsync = hasPackageJsonDependencyListChangedAsync;
exports.installCocoaPodsAsync = installCocoaPodsAsync;
exports.maybePromptToSyncPodsAsync = maybePromptToSyncPodsAsync;
var _config = require("@expo/config");
var _jsonFile = _interopRequireDefault(require("@expo/json-file"));
var PackageManager = _interopRequireWildcard(require("@expo/package-manager"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../log"));
var _updatePackageJson = require("../prebuild/updatePackageJson");
var _dir = require("./dir");
var _env = require("./env");
var _errors = require("./errors");
var _ora = require("./ora");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const PROJECT_PREBUILD_SETTINGS = ".expo/prebuild";
const CACHED_PACKAGE_JSON = "cached-packages.json";
function getTempPrebuildFolder(projectRoot) {
    return _path.default.join(projectRoot, PROJECT_PREBUILD_SETTINGS);
}
function hasNewDependenciesSinceLastBuild(projectRoot, packageChecksums) {
    // TODO: Maybe comparing lock files would be better...
    const templateDirectory = getTempPrebuildFolder(projectRoot);
    const tempPkgJsonPath = _path.default.join(templateDirectory, CACHED_PACKAGE_JSON);
    if (!_fs.default.existsSync(tempPkgJsonPath)) {
        return true;
    }
    const { dependencies , devDependencies  } = _jsonFile.default.read(tempPkgJsonPath);
    // Only change the dependencies if the normalized hash changes, this helps to reduce meaningless changes.
    const hasNewDependencies = packageChecksums.dependencies !== dependencies;
    const hasNewDevDependencies = packageChecksums.devDependencies !== devDependencies;
    return hasNewDependencies || hasNewDevDependencies;
}
function createPackageChecksums(pkg) {
    return {
        dependencies: (0, _updatePackageJson).hashForDependencyMap(pkg.dependencies || {}),
        devDependencies: (0, _updatePackageJson).hashForDependencyMap(pkg.devDependencies || {})
    };
}
async function hasPackageJsonDependencyListChangedAsync(projectRoot) {
    const pkg = (0, _config).getPackageJson(projectRoot);
    const packages = createPackageChecksums(pkg);
    const hasNewDependencies = hasNewDependenciesSinceLastBuild(projectRoot, packages);
    // Cache package.json
    await (0, _dir).ensureDirectoryAsync(getTempPrebuildFolder(projectRoot));
    const templateDirectory = _path.default.join(getTempPrebuildFolder(projectRoot), CACHED_PACKAGE_JSON);
    await _jsonFile.default.writeAsync(templateDirectory, packages);
    return hasNewDependencies;
}
async function installCocoaPodsAsync(projectRoot) {
    let step = (0, _ora).logNewSection("Installing CocoaPods...");
    if (process.platform !== "darwin") {
        step.succeed("Skipped installing CocoaPods because operating system is not on macOS.");
        return false;
    }
    const packageManager = new PackageManager.CocoaPodsPackageManager({
        cwd: _path.default.join(projectRoot, "ios"),
        silent: !_env.env.EXPO_DEBUG
    });
    if (!await packageManager.isCLIInstalledAsync()) {
        try {
            // prompt user -- do you want to install cocoapods right now?
            step.text = "CocoaPods CLI not found in your PATH, installing it now.";
            step.stopAndPersist();
            await PackageManager.CocoaPodsPackageManager.installCLIAsync({
                nonInteractive: true,
                spawnOptions: {
                    ...packageManager.options,
                    // Don't silence this part
                    stdio: [
                        "inherit",
                        "inherit",
                        "pipe"
                    ]
                }
            });
            step.succeed("Installed CocoaPods CLI.");
            step = (0, _ora).logNewSection("Running `pod install` in the `ios` directory.");
        } catch (error) {
            step.stopAndPersist({
                symbol: "\u26A0\uFE0F ",
                text: _chalk.default.red("Unable to install the CocoaPods CLI.")
            });
            if (error instanceof PackageManager.CocoaPodsError) {
                Log.log(error.message);
            } else {
                Log.log(`Unknown error: ${error.message}`);
            }
            return false;
        }
    }
    try {
        await packageManager.installAsync({
            spinner: step
        });
        // Create cached list for later
        await hasPackageJsonDependencyListChangedAsync(projectRoot).catch(()=>null
        );
        step.succeed("Installed pods and initialized Xcode workspace.");
        return true;
    } catch (error) {
        step.stopAndPersist({
            symbol: "\u26A0\uFE0F ",
            text: _chalk.default.red("Something went wrong running `pod install` in the `ios` directory.")
        });
        if (error instanceof PackageManager.CocoaPodsError) {
            Log.log(error.message);
        } else {
            Log.log(`Unknown error: ${error.message}`);
        }
        return false;
    }
}
function doesProjectUseCocoaPods(projectRoot) {
    return _fs.default.existsSync(_path.default.join(projectRoot, "ios", "Podfile"));
}
function isLockfileCreated(projectRoot) {
    const podfileLockPath = _path.default.join(projectRoot, "ios", "Podfile.lock");
    return _fs.default.existsSync(podfileLockPath);
}
function isPodFolderCreated(projectRoot) {
    const podFolderPath = _path.default.join(projectRoot, "ios", "Pods");
    return _fs.default.existsSync(podFolderPath);
}
async function maybePromptToSyncPodsAsync(projectRoot) {
    if (!doesProjectUseCocoaPods(projectRoot)) {
        // Project does not use CocoaPods
        return;
    }
    if (!isLockfileCreated(projectRoot) || !isPodFolderCreated(projectRoot)) {
        if (!await installCocoaPodsAsync(projectRoot)) {
            throw new _errors.AbortCommandError();
        }
        return;
    }
    // Getting autolinked packages can be heavy, optimize around checking every time.
    if (!await hasPackageJsonDependencyListChangedAsync(projectRoot)) {
        return;
    }
    await promptToInstallPodsAsync(projectRoot, []);
}
async function promptToInstallPodsAsync(projectRoot, missingPods) {
    if (missingPods == null ? void 0 : missingPods.length) {
        Log.log(`Could not find the following native modules: ${missingPods.map((pod)=>_chalk.default.bold(pod)
        ).join(", ")}. Did you forget to run "${_chalk.default.bold("pod install")}" ?`);
    }
    try {
        if (!await installCocoaPodsAsync(projectRoot)) {
            throw new _errors.AbortCommandError();
        }
    } catch (error) {
        await _fs.default.promises.rm(_path.default.join(getTempPrebuildFolder(projectRoot), CACHED_PACKAGE_JSON), {
            recursive: true,
            force: true
        });
        throw error;
    }
}

//# sourceMappingURL=cocoapods.js.map