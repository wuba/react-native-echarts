#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoWhoami = void 0;
var _args = require("../utils/args");
var _errors = require("../utils/errors");
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
const expoWhoami = async (argv)=>{
    const args = (0, _args).assertArgs({
        // Types
        "--help": Boolean,
        // Aliases
        "-h": "--help"
    }, argv);
    if (args["--help"]) {
        (0, _args).printHelp(`Show the currently authenticated username`, `npx expo whoami`, `-h, --help    Usage info`);
    }
    const { whoamiAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("./whoamiAsync"));
    });
    return whoamiAsync().catch(_errors.logCmdError);
};
exports.expoWhoami = expoWhoami;

//# sourceMappingURL=index.js.map