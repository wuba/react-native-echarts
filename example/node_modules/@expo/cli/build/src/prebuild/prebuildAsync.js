"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prebuildAsync = prebuildAsync;
var _installAsync = require("../install/installAsync");
var _env = require("../utils/env");
var _nodeModules = require("../utils/nodeModules");
var _ora = require("../utils/ora");
var _profile = require("../utils/profile");
var _clearNativeFolder = require("./clearNativeFolder");
var _configureProjectAsync = require("./configureProjectAsync");
var _ensureConfigAsync = require("./ensureConfigAsync");
var _resolveOptions = require("./resolveOptions");
var _updateFromTemplate = require("./updateFromTemplate");
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
const debug = require("debug")("expo:prebuild");
async function prebuildAsync(projectRoot, options) {
    if (options.clean) {
        const { maybeBailOnGitStatusAsync  } = await Promise.resolve().then(function() {
            return _interopRequireWildcard(require("../utils/git"));
        });
        // Clean the project folders...
        if (await maybeBailOnGitStatusAsync()) {
            return null;
        }
        // Clear the native folders before syncing
        await (0, _clearNativeFolder).clearNativeFolder(projectRoot, options.platforms);
    } else {
        // Check if the existing project folders are malformed.
        await (0, _clearNativeFolder).promptToClearMalformedNativeProjectsAsync(projectRoot, options.platforms);
    }
    // Warn if the project is attempting to prebuild an unsupported platform (iOS on Windows).
    options.platforms = (0, _resolveOptions).ensureValidPlatforms(options.platforms);
    // Assert if no platforms are left over after filtering.
    (0, _resolveOptions).assertPlatforms(options.platforms);
    // Get the Expo config, create it if missing.
    const { exp , pkg  } = await (0, _ensureConfigAsync).ensureConfigAsync(projectRoot, {
        platforms: options.platforms
    });
    // Create native projects from template.
    const { hasNewProjectFiles , needsPodInstall , hasNewDependencies  } = await (0, _updateFromTemplate).updateFromTemplateAsync(projectRoot, {
        exp,
        pkg,
        template: options.template != null ? (0, _resolveOptions).resolveTemplateOption(options.template) : undefined,
        platforms: options.platforms,
        skipDependencyUpdate: options.skipDependencyUpdate
    });
    // Install node modules
    if (options.install) {
        var ref;
        if (hasNewDependencies && ((ref = options.packageManager) == null ? void 0 : ref.npm)) {
            await (0, _nodeModules).clearNodeModulesAsync(projectRoot);
        }
        await (0, _installAsync).installAsync([], {
            ...options.packageManager,
            silent: !_env.env.EXPO_DEBUG
        });
    }
    // Apply Expo config to native projects
    const configSyncingStep = (0, _ora).logNewSection("Config syncing");
    try {
        await (0, _profile).profile(_configureProjectAsync.configureProjectAsync)(projectRoot, {
            platforms: options.platforms
        });
        configSyncingStep.succeed("Config synced");
    } catch (error) {
        configSyncingStep.fail("Config sync failed");
        throw error;
    }
    // Install CocoaPods
    let podsInstalled = false;
    // err towards running pod install less because it's slow and users can easily run npx pod-install afterwards.
    if (options.platforms.includes("ios") && options.install && needsPodInstall) {
        const { installCocoaPodsAsync  } = await Promise.resolve().then(function() {
            return _interopRequireWildcard(require("../utils/cocoapods"));
        });
        podsInstalled = await installCocoaPodsAsync(projectRoot);
    } else {
        debug("Skipped pod install");
    }
    return {
        nodeInstall: !!options.install,
        podInstall: !podsInstalled,
        platforms: options.platforms,
        hasNewProjectFiles,
        exp
    };
}

//# sourceMappingURL=prebuildAsync.js.map