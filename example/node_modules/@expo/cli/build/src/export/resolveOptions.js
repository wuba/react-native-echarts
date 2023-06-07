"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvePlatformOption = resolvePlatformOption;
exports.resolveOptionsAsync = resolveOptionsAsync;
var _config = require("@expo/config");
var _platformBundlers = require("../start/server/platformBundlers");
var _errors = require("../utils/errors");
function resolvePlatformOption(platformBundlers, platform1 = "all") {
    const platforms = Object.fromEntries(Object.entries(platformBundlers).filter(([, bundler])=>bundler === "metro"
    ));
    if (!Object.keys(platforms).length) {
        throw new _errors.CommandError(`No platforms are configured to use the Metro bundler in the project Expo config.`);
    }
    const assertPlatformBundler = (platform)=>{
        if (!platforms[platform]) {
            throw new _errors.CommandError("BAD_ARGS", `Platform "${platform}" is not configured to use the Metro bundler in the project Expo config.`);
        }
    };
    switch(platform1){
        case "ios":
            assertPlatformBundler("ios");
            return [
                "ios"
            ];
        case "web":
            assertPlatformBundler("web");
            return [
                "web"
            ];
        case "android":
            assertPlatformBundler("android");
            return [
                "android"
            ];
        case "all":
            return Object.keys(platforms);
        default:
            throw new _errors.CommandError(`Unsupported platform "${platform1}". Options are: ${Object.keys(platforms).join(",")}, all`);
    }
}
async function resolveOptionsAsync(projectRoot, args) {
    const { exp  } = (0, _config).getConfig(projectRoot, {
        skipPlugins: true,
        skipSDKVersionRequirement: true
    });
    const platformBundlers = (0, _platformBundlers).getPlatformBundlers(exp);
    var ref;
    const platforms = resolvePlatformOption(platformBundlers, (ref = args["--platform"]) != null ? ref : "all");
    var ref1;
    return {
        outputDir: (ref1 = args["--output-dir"]) != null ? ref1 : "dist",
        platforms,
        clear: !!args["--clear"],
        dev: !!args["--dev"],
        maxWorkers: args["--max-workers"],
        dumpAssetmap: !!args["--dump-assetmap"],
        dumpSourcemap: !!args["--dump-sourcemap"]
    };
}

//# sourceMappingURL=resolveOptions.js.map