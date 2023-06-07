#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoExportWeb = void 0;
var _chalk = _interopRequireDefault(require("chalk"));
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
const expoExportWeb = async (argv)=>{
    const args = (0, _args).assertArgs({
        // Types
        "--help": Boolean,
        "--clear": Boolean,
        "--dev": Boolean,
        // Aliases
        "-h": "--help",
        "-c": "--clear"
    }, argv);
    if (args["--help"]) {
        (0, _args).printHelp(`Export the static files of the web app for hosting on a web server`, _chalk.default`npx expo export:web {dim <dir>}`, [
            _chalk.default`<dir>                         Directory of the Expo project. {dim Default: Current working directory}`,
            `--dev                         Bundle in development mode`,
            `-c, --clear                   Clear the bundler cache`,
            `-h, --help                    Usage info`, 
        ].join("\n"));
    }
    const projectRoot = (0, _args).getProjectRoot(args);
    const { resolveOptionsAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("./resolveOptions"));
    });
    const options = await resolveOptionsAsync(args).catch(_errors.logCmdError);
    const { exportWebAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("./exportWebAsync"));
    });
    return exportWebAsync(projectRoot, options).catch(_errors.logCmdError);
};
exports.expoExportWeb = expoExportWeb;

//# sourceMappingURL=index.js.map