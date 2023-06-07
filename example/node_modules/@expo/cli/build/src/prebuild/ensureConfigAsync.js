"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureConfigExistsAsync = ensureConfigExistsAsync;
exports.ensureConfigAsync = ensureConfigAsync;
var _config = require("@expo/config");
var _jsonFile = _interopRequireDefault(require("@expo/json-file"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../log"));
var _errors = require("../utils/errors");
var _getOrPromptApplicationId = require("../utils/getOrPromptApplicationId");
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
async function ensureConfigExistsAsync(projectRoot) {
    try {
        const config = (0, _config).getConfig(projectRoot, {
            skipSDKVersionRequirement: false
        });
        // If no config exists in the file system then we should generate one so the process doesn't fail.
        if (!config.dynamicConfigPath && !config.staticConfigPath) {
            // Remove the internal object before writing.
            delete config.exp._internal;
            // Write the generated config.
            await _jsonFile.default.writeAsync(_path.default.join(projectRoot, "app.json"), {
                expo: config.exp
            }, {
                json5: false
            });
        }
    } catch (error) {
        // TODO(Bacon): Currently this is already handled in the command
        Log.log();
        throw new _errors.CommandError(`${error.message}\n`);
    }
}
async function ensureConfigAsync(projectRoot, { platforms  }) {
    await ensureConfigExistsAsync(projectRoot);
    // Prompt for the Android package first because it's more strict than the bundle identifier
    // this means you'll have a better chance at matching the bundle identifier with the package name.
    if (platforms.includes("android")) {
        await (0, _getOrPromptApplicationId).getOrPromptForPackage(projectRoot);
    }
    if (platforms.includes("ios")) {
        await (0, _getOrPromptApplicationId).getOrPromptForBundleIdentifier(projectRoot);
    }
    // We need the SDK version to proceed
    const { exp , pkg  } = (0, _config).getConfig(projectRoot);
    // TODO(EvanBacon): Remove the requirement for this once we have a
    // custom bundle script that respects Expo entry point resolution.
    if (exp.entryPoint) {
        delete exp.entryPoint;
        Log.log(`\u203A expo.entryPoint is not needed and has been removed.`);
    }
    // Read config again because prompting for bundle id or package name may have mutated the results.
    return {
        exp,
        pkg
    };
}

//# sourceMappingURL=ensureConfigAsync.js.map