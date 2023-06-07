"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showLoginPromptAsync = showLoginPromptAsync;
exports.ensureLoggedInAsync = ensureLoggedInAsync;
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../log"));
var _link = require("../../utils/link");
var _prompts = _interopRequireDefault(require("../../utils/prompts"));
var _client = require("../rest/client");
var _otp = require("./otp");
var _user = require("./user");
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
async function showLoginPromptAsync({ printNewLine =false , otp , ...options } = {}) {
    const hasCredentials = options.username && options.password;
    if (printNewLine) {
        Log.log();
    }
    Log.log(hasCredentials ? "Logging in to EAS" : "Log in to EAS");
    let username = options.username;
    let password = options.password;
    if (!hasCredentials) {
        const resolved = await (0, _prompts).default([
            !options.username && {
                type: "text",
                name: "username",
                message: "Email or username"
            },
            !options.password && {
                type: "password",
                name: "password",
                message: "Password"
            }, 
        ].filter(Boolean), {
            nonInteractiveHelp: `Use the EXPO_TOKEN environment variable to authenticate in CI (${(0, _link).learnMore("https://docs.expo.dev/accounts/programmatic-access/")})`
        });
        username != null ? username : username = resolved.username;
        password != null ? password : password = resolved.password;
    }
    // This is just for the types.
    (0, _assert).default(username && password);
    try {
        await (0, _user).loginAsync({
            username,
            password,
            otp
        });
    } catch (e) {
        if (e instanceof _client.ApiV2Error && e.expoApiV2ErrorCode === "ONE_TIME_PASSWORD_REQUIRED") {
            await (0, _otp).retryUsernamePasswordAuthWithOTPAsync(username, password, e.expoApiV2ErrorMetadata);
        } else {
            throw e;
        }
    }
}
async function ensureLoggedInAsync() {
    let user = await (0, _user).getUserAsync().catch(()=>null
    );
    if (!user) {
        Log.warn(_chalk.default.yellow`An Expo user account is required to proceed.`);
        await showLoginPromptAsync({
            printNewLine: true
        });
        user = await (0, _user).getUserAsync();
    }
    (0, _assert).default(user, "User should be logged in");
    return user;
}

//# sourceMappingURL=actions.js.map