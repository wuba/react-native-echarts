#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoConfig = void 0;
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
const expoConfig = async (argv)=>{
    const args = (0, _args).assertArgs({
        // Types
        "--help": Boolean,
        "--full": Boolean,
        "--json": Boolean,
        "--type": String,
        // Aliases
        "-h": "--help",
        "-t": "--type"
    }, argv);
    if (args["--help"]) {
        (0, _args).printHelp(`Show the project config`, _chalk.default`npx expo config {dim <dir>}`, [
            _chalk.default`<dir>                                    Directory of the Expo project. {dim Default: Current working directory}`,
            `--full                                   Include all project config data`,
            `--json                                   Output in JSON format`,
            `-t, --type <public|prebuild|introspect>  Type of config to show`,
            `-h, --help                               Usage info`, 
        ].join("\n"));
    }
    // Load modules after the help prompt so `npx expo config -h` shows as fast as possible.
    const [// ./configAsync
    { configAsync  }, // ../utils/errors
    { logCmdError  }, ] = await Promise.all([
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("./configAsync"));
        }),
        Promise.resolve().then(function() {
            return _interopRequireWildcard(require("../utils/errors"));
        })
    ]);
    return configAsync((0, _args).getProjectRoot(args), {
        // Parsed options
        full: args["--full"],
        json: args["--json"],
        type: args["--type"]
    }).catch(logCmdError);
};
exports.expoConfig = expoConfig;

//# sourceMappingURL=index.js.map