#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoLogin = void 0;
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
const expoLogin = async (argv)=>{
    const args = (0, _args).assertArgs({
        // Types
        "--help": Boolean,
        "--username": String,
        "--password": String,
        "--otp": String,
        // Aliases
        "-h": "--help",
        "-u": "--username",
        "-p": "--password"
    }, argv);
    if (args["--help"]) {
        (0, _args).printHelp(`Log in to an Expo account`, `npx expo login`, [
            `-u, --username <string>  Username`,
            `-p, --password <string>  Password`,
            `--otp <string>           One-time password from your 2FA device`,
            `-h, --help               Usage info`, 
        ].join("\n"));
    }
    const { showLoginPromptAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("../api/user/actions"));
    });
    return showLoginPromptAsync({
        // Parsed options
        username: args["--username"],
        password: args["--password"],
        otp: args["--otp"]
    }).catch(_errors.logCmdError);
};
exports.expoLogin = expoLogin;

//# sourceMappingURL=index.js.map