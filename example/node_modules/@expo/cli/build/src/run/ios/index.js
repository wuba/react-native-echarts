#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoRunIos = void 0;
var _chalk = _interopRequireDefault(require("chalk"));
var _path = _interopRequireDefault(require("path"));
var _args = require("../../utils/args");
var _errors = require("../../utils/errors");
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
const expoRunIos = async (argv)=>{
    const rawArgsMap = {
        // Types
        "--help": Boolean,
        "--no-build-cache": Boolean,
        "--no-install": Boolean,
        "--no-bundler": Boolean,
        "--configuration": String,
        "--port": Number,
        // Aliases
        "-p": "--port",
        "-h": "--help"
    };
    const args = (0, _args).assertWithOptionsArgs(rawArgsMap, {
        argv,
        permissive: true
    });
    // '-d' -> '--device': Boolean,
    // '--scheme': String,
    if (args["--help"]) {
        (0, _args).printHelp(`Run the iOS app binary locally`, `npx expo run:ios`, [
            `--no-build-cache                 Clear the native derived data before building`,
            `--no-install                     Skip installing dependencies`,
            `--no-bundler                     Skip starting the Metro bundler`,
            `--scheme [scheme]                Scheme to build`,
            _chalk.default`--configuration <configuration>  Xcode configuration to use. Debug or Release. {dim Default: Debug}`,
            `-d, --device [device]            Device name or UDID to build the app on`,
            _chalk.default`-p, --port <port>                Port to start the Metro bundler on. {dim Default: 8081}`,
            `-h, --help                       Usage info`, 
        ].join("\n"), [
            "",
            _chalk.default`  Build for production (unsigned) with the {bold Release} configuration:`,
            _chalk.default`    {dim $} npx expo run:ios --configuration Release`,
            "", 
        ].join("\n"));
    }
    const { resolveStringOrBooleanArgsAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("../../utils/resolveArgs"));
    });
    const parsed = await resolveStringOrBooleanArgsAsync(argv != null ? argv : [], rawArgsMap, {
        "--scheme": Boolean,
        "--device": Boolean,
        "-d": "--device"
    }).catch(_errors.logCmdError);
    const { runIosAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("./runIosAsync"));
    });
    return runIosAsync(_path.default.resolve(parsed.projectRoot), {
        // Parsed options
        buildCache: !args["--no-build-cache"],
        install: !args["--no-install"],
        bundler: !args["--no-bundler"],
        port: args["--port"],
        // Custom parsed args
        device: parsed.args["--device"],
        scheme: parsed.args["--scheme"],
        configuration: parsed.args["--configuration"]
    }).catch(_errors.logCmdError);
};
exports.expoRunIos = expoRunIos;

//# sourceMappingURL=index.js.map