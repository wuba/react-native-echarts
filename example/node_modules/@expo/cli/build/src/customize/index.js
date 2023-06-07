#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoCustomize = void 0;
var _chalk = _interopRequireDefault(require("chalk"));
var _args = require("../utils/args");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const expoCustomize = async (argv)=>{
    const args = (0, _args).assertWithOptionsArgs({
        // Other options are parsed manually.
        "--help": Boolean,
        // Aliases
        "-h": "--help"
    }, {
        argv,
        // Allow other options, we'll throw an error if unexpected values are passed.
        permissive: true
    });
    if (args["--help"]) {
        (0, _args).printHelp(`Generate static project files`, _chalk.default`npx expo customize {dim [files...] -- [options]}`, [
            _chalk.default`[files...]  List of files to generate`,
            _chalk.default`[options]   Options to pass to the install command`,
            `-h, --help  Usage info`, 
        ].join("\n"));
    }
    // Load modules after the help prompt so `npx expo install -h` shows as fast as possible.
    const { customizeAsync  } = require("./customizeAsync");
    const { logCmdError  } = require("../utils/errors");
    const { resolveArgsAsync  } = require("./resolveOptions");
    const { variadic , options , extras  } = await resolveArgsAsync(process.argv.slice(3)).catch(logCmdError);
    return customizeAsync(variadic, options, extras).catch(logCmdError);
};
exports.expoCustomize = expoCustomize;

//# sourceMappingURL=index.js.map