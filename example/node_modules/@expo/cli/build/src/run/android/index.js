#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoRunAndroid = void 0;
var _chalk = _interopRequireDefault(require("chalk"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../../log"));
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
const expoRunAndroid = async (argv)=>{
    const rawArgsMap = {
        // Types
        "--help": Boolean,
        "--no-build-cache": Boolean,
        "--no-install": Boolean,
        "--no-bundler": Boolean,
        "--variant": String,
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
    if (args["--help"]) {
        Log.exit(_chalk.default`
  {bold Description}
    Run the native Android app locally

  {bold Usage}
    $ npx expo run:android <dir>

  {bold Options} 
    --no-build-cache       Clear the native build cache
    --no-install           Skip installing dependencies
    --no-bundler           Skip starting the bundler
    --variant <name>       Build variant. {dim Default: debug}
    -d, --device [device]  Device name to run the app on
    -p, --port <port>      Port to start the dev server on. {dim Default: 8081}
    -h, --help             Output usage information
`, 0);
    }
    const { resolveStringOrBooleanArgsAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("../../utils/resolveArgs"));
    });
    const parsed = await resolveStringOrBooleanArgsAsync(argv != null ? argv : [], rawArgsMap, {
        "--device": Boolean,
        "-d": "--device"
    }).catch(_errors.logCmdError);
    const { runAndroidAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("./runAndroidAsync"));
    });
    return runAndroidAsync(_path.default.resolve(parsed.projectRoot), {
        // Parsed options
        buildCache: !args["--no-build-cache"],
        install: !args["--no-install"],
        bundler: !args["--no-bundler"],
        port: args["--port"],
        variant: args["--variant"],
        // Custom parsed args
        device: parsed.args["--device"]
    }).catch(_errors.logCmdError);
};
exports.expoRunAndroid = expoRunAndroid;

//# sourceMappingURL=index.js.map