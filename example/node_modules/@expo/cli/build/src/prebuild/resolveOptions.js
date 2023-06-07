"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvePackageManagerOptions = resolvePackageManagerOptions;
exports.resolveTemplateOption = resolveTemplateOption;
exports.resolveSkipDependencyUpdate = resolveSkipDependencyUpdate;
exports.resolvePlatformOption = resolvePlatformOption;
exports.ensureValidPlatforms = ensureValidPlatforms;
exports.assertPlatforms = assertPlatforms;
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../log"));
var _errors = require("../utils/errors");
var _url = require("../utils/url");
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
function resolvePackageManagerOptions(args) {
    const managers = {
        npm: args["--npm"],
        yarn: args["--yarn"],
        pnpm: args["--pnpm"]
    };
    if ([
        managers.npm,
        managers.pnpm,
        managers.yarn,
        !!args["--no-install"]
    ].filter(Boolean).length > 1) {
        throw new _errors.CommandError("BAD_ARGS", "Specify at most one of: --no-install, --npm, --pnpm, --yarn");
    }
    return managers;
}
function resolveTemplateOption(template) {
    if ((0, _url).validateUrl(template)) {
        return template;
    }
    const templatePath = _path.default.resolve(template);
    (0, _assert).default(_fs.default.existsSync(templatePath), "template file does not exist: " + templatePath);
    (0, _assert).default(_fs.default.statSync(templatePath).isFile(), "template must be a tar file created by running `npm pack` in a project: " + templatePath);
    return templatePath;
}
function resolveSkipDependencyUpdate(value) {
    if (!value || typeof value !== "string") {
        return [];
    }
    return value.split(",");
}
function resolvePlatformOption(platform = "all", { loose  } = {}) {
    switch(platform){
        case "ios":
            return [
                "ios"
            ];
        case "android":
            return [
                "android"
            ];
        case "all":
            if (loose || process.platform !== "win32") {
                return [
                    "android",
                    "ios"
                ];
            }
            return [
                "android"
            ];
        default:
            throw new _errors.CommandError(`Unsupported platform "${platform}". Options are: ios, android, all`);
    }
}
function ensureValidPlatforms(platforms) {
    // Skip ejecting for iOS on Windows
    if (process.platform === "win32" && platforms.includes("ios")) {
        Log.warn(_chalk.default`⚠️  Skipping generating the iOS native project files. Run {bold expo eject} again from macOS or Linux to generate the iOS project.\n`);
        return platforms.filter((platform)=>platform !== "ios"
        );
    }
    return platforms;
}
function assertPlatforms(platforms) {
    if (!(platforms == null ? void 0 : platforms.length)) {
        throw new _errors.CommandError("At least one platform must be enabled when syncing");
    }
}

//# sourceMappingURL=resolveOptions.js.map