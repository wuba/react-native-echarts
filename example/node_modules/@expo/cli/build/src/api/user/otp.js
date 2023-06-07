"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.retryUsernamePasswordAuthWithOTPAsync = retryUsernamePasswordAuthWithOTPAsync;
exports.UserSecondFactorDeviceMethod = void 0;
var _assert = _interopRequireDefault(require("assert"));
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../log"));
var _errors = require("../../utils/errors");
var _link = require("../../utils/link");
var _prompts = require("../../utils/prompts");
var _client = require("../rest/client");
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
var UserSecondFactorDeviceMethod;
exports.UserSecondFactorDeviceMethod = UserSecondFactorDeviceMethod;
(function(UserSecondFactorDeviceMethod) {
    UserSecondFactorDeviceMethod["AUTHENTICATOR"] = "authenticator";
    UserSecondFactorDeviceMethod["SMS"] = "sms";
})(UserSecondFactorDeviceMethod || (exports.UserSecondFactorDeviceMethod = UserSecondFactorDeviceMethod = {}));
const nonInteractiveHelp = `Use the EXPO_TOKEN environment variable to authenticate in CI (${(0, _link).learnMore("https://docs.expo.dev/accounts/programmatic-access/")})`;
/**
 * Prompt for an OTP with the option to cancel the question by answering empty (pressing return key).
 */ async function promptForOTPAsync(cancelBehavior) {
    const enterMessage = cancelBehavior === "cancel" ? _chalk.default`press {bold Enter} to cancel` : _chalk.default`press {bold Enter} for more options`;
    const { otp  } = await (0, _prompts).promptAsync({
        type: "text",
        name: "otp",
        message: `One-time password or backup code (${enterMessage}):`
    }, {
        nonInteractiveHelp
    });
    return otp || null;
}
/**
 * Prompt for user to choose a backup OTP method. If selected method is SMS, a request
 * for a new OTP will be sent to that method. Then, prompt for the OTP, and retry the user login.
 */ async function promptForBackupOTPAsync(username, password, secondFactorDevices) {
    const nonPrimarySecondFactorDevices = secondFactorDevices.filter((device)=>!device.is_primary
    );
    if (nonPrimarySecondFactorDevices.length === 0) {
        throw new _errors.CommandError("No other second-factor devices set up. Ensure you have set up and certified a backup device.");
    }
    const hasAuthenticatorSecondFactorDevice = nonPrimarySecondFactorDevices.find((device)=>device.method === "authenticator"
    );
    const smsNonPrimarySecondFactorDevices = nonPrimarySecondFactorDevices.filter((device)=>device.method === "sms"
    );
    const authenticatorChoiceSentinel = -1;
    const cancelChoiceSentinel = -2;
    const deviceChoices = smsNonPrimarySecondFactorDevices.map((device, idx)=>({
            title: device.sms_phone_number,
            value: idx
        })
    );
    if (hasAuthenticatorSecondFactorDevice) {
        deviceChoices.push({
            title: "Authenticator",
            value: authenticatorChoiceSentinel
        });
    }
    deviceChoices.push({
        title: "Cancel",
        value: cancelChoiceSentinel
    });
    const selectedValue = await (0, _prompts).selectAsync("Select a second-factor device:", deviceChoices, {
        nonInteractiveHelp
    });
    if (selectedValue === cancelChoiceSentinel) {
        return null;
    } else if (selectedValue === authenticatorChoiceSentinel) {
        return await promptForOTPAsync("cancel");
    }
    const device1 = smsNonPrimarySecondFactorDevices[selectedValue];
    await (0, _client).fetchAsync("auth/send-sms-otp", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
            secondFactorDeviceID: device1.id
        })
    });
    return await promptForOTPAsync("cancel");
}
async function retryUsernamePasswordAuthWithOTPAsync(username, password, metadata) {
    const { secondFactorDevices , smsAutomaticallySent  } = metadata;
    (0, _assert).default(secondFactorDevices !== undefined && smsAutomaticallySent !== undefined, `Malformed OTP error metadata: ${metadata}`);
    const primaryDevice = secondFactorDevices.find((device)=>device.is_primary
    );
    let otp = null;
    if (smsAutomaticallySent) {
        (0, _assert).default(primaryDevice, "OTP should only automatically be sent when there is a primary device");
        Log.log(`One-time password was sent to the phone number ending in ${primaryDevice.sms_phone_number}.`);
        otp = await promptForOTPAsync("menu");
    }
    if ((primaryDevice == null ? void 0 : primaryDevice.method) === "authenticator") {
        Log.log("One-time password from authenticator required.");
        otp = await promptForOTPAsync("menu");
    }
    // user bailed on case 1 or 2, wants to move to case 3
    if (!otp) {
        otp = await promptForBackupOTPAsync(username, password, secondFactorDevices);
    }
    if (!otp) {
        throw new _errors.AbortCommandError();
    }
    await (0, _user).loginAsync({
        username,
        password,
        otp
    });
}

//# sourceMappingURL=otp.js.map