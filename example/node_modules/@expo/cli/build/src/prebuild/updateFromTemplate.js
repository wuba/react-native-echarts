"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateFromTemplateAsync = updateFromTemplateAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../log"));
var _errors = require("../utils/errors");
var _ora = require("../utils/ora");
var _profile = require("../utils/profile");
var _copyTemplateFiles = require("./copyTemplateFiles");
var _resolveTemplate = require("./resolveTemplate");
var _updatePackageJson = require("./updatePackageJson");
var _writeMetroConfig = require("./writeMetroConfig");
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
async function updateFromTemplateAsync(projectRoot, { exp , pkg , template , templateDirectory , platforms , skipDependencyUpdate  }) {
    if (!templateDirectory) {
        const temporary = await Promise.resolve().then(function() {
            return _interopRequireWildcard(require("tempy"));
        });
        templateDirectory = temporary.directory();
    }
    const copiedPaths = await (0, _profile).profile(cloneTemplateAndCopyToProjectAsync)({
        projectRoot,
        template,
        templateDirectory,
        exp,
        pkg,
        platforms
    });
    (0, _profile).profile(_writeMetroConfig.writeMetroConfig)(projectRoot, {
        pkg,
        templateDirectory
    });
    const depsResults = await (0, _profile).profile(_updatePackageJson.updatePackageJSONAsync)(projectRoot, {
        templateDirectory,
        pkg,
        skipDependencyUpdate
    });
    return {
        hasNewProjectFiles: !!copiedPaths.length,
        // If the iOS folder changes or new packages are added, we should rerun pod install.
        needsPodInstall: copiedPaths.includes("ios") || depsResults.hasNewDependencies || depsResults.hasNewDevDependencies,
        ...depsResults
    };
}
/**
 * Extract the template and copy the ios and android directories over to the project directory.
 *
 * @return `true` if any project files were created.
 */ async function cloneTemplateAndCopyToProjectAsync({ projectRoot , templateDirectory , template , exp , pkg , platforms  }) {
    const ora = (0, _ora).logNewSection("Creating native project directories (./ios and ./android) and updating .gitignore");
    try {
        await (0, _resolveTemplate).cloneTemplateAsync({
            templateDirectory,
            template,
            exp,
            ora
        });
        const results = await (0, _copyTemplateFiles).copyTemplateFilesAsync(projectRoot, {
            pkg,
            templateDirectory,
            platforms
        });
        ora.succeed((0, _copyTemplateFiles).createCopyFilesSuccessMessage(platforms, results));
        return results.copiedPaths;
    } catch (e) {
        if (!(e instanceof _errors.AbortCommandError)) {
            Log.error(e.message);
        }
        ora.fail("Failed to create the native project.");
        Log.log(_chalk.default.yellow("You may want to delete the `./ios` and/or `./android` directories before trying again."));
        throw new _errors.SilentError(e);
    }
}

//# sourceMappingURL=updateFromTemplate.js.map