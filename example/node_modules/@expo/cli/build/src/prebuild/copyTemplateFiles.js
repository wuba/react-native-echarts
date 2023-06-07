"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCopyFilesSuccessMessage = createCopyFilesSuccessMessage;
exports.copyTemplateFilesAsync = copyTemplateFilesAsync;
exports.resolveBareEntryFile = resolveBareEntryFile;
var _paths = require("@expo/config/paths");
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _dir = require("../utils/dir");
var _mergeGitIgnorePaths = require("../utils/mergeGitIgnorePaths");
var _updatePackageJson = require("./updatePackageJson");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:prebuild:copyTemplateFiles");
/**
 * Return true if the given platforms all have an internal `.gitignore` file.
 *
 * @param projectRoot
 * @param platforms
 */ function hasAllPlatformSpecificGitIgnores(projectRoot, platforms) {
    return platforms.reduce((p, platform)=>p && _fs.default.existsSync(_path.default.join(projectRoot, platform, ".gitignore"))
    , true);
}
function createCopyFilesSuccessMessage(platforms, { skippedPaths , gitignore  }) {
    let message = `Created native project${platforms.length > 1 ? "s" : ""}`;
    if (skippedPaths.length) {
        message += _chalk.default.dim(` | ${skippedPaths.map((path)=>_chalk.default.bold(`/${path}`)
        ).join(", ")} already created`);
    }
    if (!gitignore) {
        message += _chalk.default.dim(` | gitignore skipped`);
    } else if (!gitignore.didMerge) {
        message += _chalk.default.dim(` | gitignore already synced`);
    } else if (gitignore.didMerge && gitignore.didClear) {
        message += _chalk.default.dim(` | synced gitignore`);
    }
    return message;
}
async function copyTemplateFilesAsync(projectRoot, { pkg , templateDirectory , platforms  }) {
    const copyFilePaths = getFilePathsToCopy(projectRoot, pkg, platforms);
    const copyResults = await copyPathsFromTemplateAsync(projectRoot, {
        templateDirectory,
        copyFilePaths
    });
    const hasPlatformSpecificGitIgnores = hasAllPlatformSpecificGitIgnores(templateDirectory, platforms);
    debug(`All platforms have an internal gitignore: ${hasPlatformSpecificGitIgnores}`);
    const gitignore = hasPlatformSpecificGitIgnores ? null : (0, _mergeGitIgnorePaths).mergeGitIgnorePaths(_path.default.join(projectRoot, ".gitignore"), _path.default.join(templateDirectory, ".gitignore"));
    return {
        ...copyResults,
        gitignore
    };
}
async function copyPathsFromTemplateAsync(/** File path to the project. */ projectRoot, { templateDirectory , copyFilePaths  }) {
    const copiedPaths = [];
    const skippedPaths = [];
    for (const copyFilePath of copyFilePaths){
        const projectPath = _path.default.join(projectRoot, copyFilePath);
        if (!await (0, _dir).directoryExistsAsync(projectPath)) {
            copiedPaths.push(copyFilePath);
            (0, _dir).copySync(_path.default.join(templateDirectory, copyFilePath), projectPath);
        } else {
            skippedPaths.push(copyFilePath);
        }
    }
    debug(`Copied files:`, copiedPaths);
    debug(`Skipped files:`, copiedPaths);
    return {
        copiedPaths,
        skippedPaths
    };
}
/** Get a list of relative file paths to copy from the template folder. Example: `['ios', 'android', 'index.js']` */ function getFilePathsToCopy(projectRoot, pkg, platforms) {
    const targetPaths = [
        ...platforms
    ];
    const bareEntryFile = resolveBareEntryFile(projectRoot, pkg.main);
    // Only create index.js if we cannot resolve the existing entry point (after replacing the expo entry).
    if (!bareEntryFile) {
        targetPaths.push("index.js");
    }
    debug(`Files to copy:`, targetPaths);
    return targetPaths;
}
function resolveBareEntryFile(projectRoot, main) {
    // expo app entry is not needed for bare projects.
    if ((0, _updatePackageJson).isPkgMainExpoAppEntry(main)) {
        return null;
    }
    // Look at the `package.json`s `main` field for the main file.
    const resolvedMainField = main != null ? main : "./index";
    // Get a list of possible extensions for the main file.
    const extensions = (0, _paths).getBareExtensions([
        "ios",
        "android"
    ]);
    // Testing the main field against all of the provided extensions - for legacy reasons we can't use node module resolution as the package.json allows you to pass in a file without a relative path and expect it as a relative path.
    return (0, _paths).getFileWithExtensions(projectRoot, resolvedMainField, extensions);
}

//# sourceMappingURL=copyTemplateFiles.js.map