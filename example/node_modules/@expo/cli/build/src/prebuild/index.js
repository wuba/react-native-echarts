#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoPrebuild = void 0;
var _chalk = _interopRequireDefault(require("chalk"));
var _args = require("../utils/args");
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
const expoPrebuild = async (argv)=>{
    const args = (0, _args).assertArgs({
        // Types
        "--help": Boolean,
        "--clean": Boolean,
        "--npm": Boolean,
        "--pnpm": Boolean,
        "--yarn": Boolean,
        "--no-install": Boolean,
        "--template": String,
        "--platform": String,
        "--skip-dependency-update": String,
        // Aliases
        "-h": "--help",
        "-p": "--platform",
        "-t": "--type"
    }, argv);
    if (args["--help"]) {
        (0, _args).printHelp(`Create native iOS and Android project files for building natively`, _chalk.default`npx expo prebuild {dim <dir>}`, [
            _chalk.default`<dir>                                    Directory of the Expo project. {dim Default: Current working directory}`,
            `--no-install                             Skip installing npm packages and CocoaPods`,
            `--clean                                  Delete the native folders and regenerate them before applying changes`,
            _chalk.default`--npm                                    Use npm to install dependencies. {dim Default when package-lock.json exists}`,
            _chalk.default`--yarn                                   Use Yarn to install dependencies. {dim Default when yarn.lock exists}`,
            _chalk.default`--pnpm                                   Use pnpm to install dependencies. {dim Default when pnpm-lock.yaml exists}`,
            `--template <template>                    Project template to clone from. File path pointing to a local tar file or a github repo`,
            _chalk.default`-p, --platform <all|android|ios>         Platforms to sync: ios, android, all. {dim Default: all}`,
            `--skip-dependency-update <dependencies>  Preserves versions of listed packages in package.json (comma separated list)`,
            `-h, --help                               Usage info`, 
        ].join("\n"));
    }
    // Load modules after the help prompt so `npx expo prebuild -h` shows as fast as possible.
    const [// ./prebuildAsync
    { prebuildAsync  }, // ./resolveOptions
    { resolvePlatformOption , resolvePackageManagerOptions , resolveSkipDependencyUpdate  }, // ../utils/errors
    { logCmdError  }, ] = await Promise.all([
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("./prebuildAsync"));
        }),
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("./resolveOptions"));
        }),
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("../utils/errors"));
        }), 
    ]);
    return (()=>{
        return prebuildAsync((0, _args).getProjectRoot(args), {
            // Parsed options
            clean: args["--clean"],
            packageManager: resolvePackageManagerOptions(args),
            install: !args["--no-install"],
            platforms: resolvePlatformOption(args["--platform"]),
            // TODO: Parse
            skipDependencyUpdate: resolveSkipDependencyUpdate(args["--skip-dependency-update"]),
            template: args["--template"]
        });
    })().catch(logCmdError);
};
exports.expoPrebuild = expoPrebuild;

//# sourceMappingURL=index.js.map