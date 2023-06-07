#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoRegister = void 0;
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
const expoRegister = async (argv)=>{
    const args = (0, _args).assertArgs({
        // Types
        "--help": Boolean,
        // Aliases
        "-h": "--help"
    }, argv);
    if (args["--help"]) {
        (0, _args).printHelp(`Sign up for a new Expo account`, `npx expo register`, // Options
        `-h, --help    Usage info`);
    }
    const { registerAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("./registerAsync"));
    });
    return registerAsync().catch(_errors.logCmdError);
};
exports.expoRegister = expoRegister;

//# sourceMappingURL=index.js.map