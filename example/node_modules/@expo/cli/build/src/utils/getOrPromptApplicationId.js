"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOrPromptForBundleIdentifier = getOrPromptForBundleIdentifier;
exports.getOrPromptForPackage = getOrPromptForPackage;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../log"));
var _link = require("./link");
var _modifyConfigAsync = require("./modifyConfigAsync");
var _prompts = _interopRequireWildcard(require("./prompts"));
var _validateApplicationId = require("./validateApplicationId");
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
function getUsernameAsync(exp) {
    // TODO: Use XDL's UserManager
    // import { UserManager } from 'xdl';
    return (0, _config).getAccountUsername(exp);
}
const NO_BUNDLE_ID_MESSAGE = `Project must have a \`ios.bundleIdentifier\` set in the Expo config (app.json or app.config.js).`;
const NO_PACKAGE_MESSAGE = `Project must have a \`android.package\` set in the Expo config (app.json or app.config.js).`;
async function getOrPromptForBundleIdentifier(projectRoot) {
    var ref;
    const { exp  } = (0, _config).getConfig(projectRoot);
    const current = (ref = exp.ios) == null ? void 0 : ref.bundleIdentifier;
    if (current) {
        (0, _validateApplicationId).assertValidBundleId(current);
        return current;
    }
    Log.log(_chalk.default`\n{bold 📝  iOS Bundle Identifier} {dim ${(0, _link).learnMore("https://expo.fyi/bundle-identifier")}}\n`);
    return await promptForBundleIdAsync(projectRoot, exp);
}
async function promptForBundleIdAsync(projectRoot, exp) {
    var ref;
    // Prompt the user for the bundle ID.
    // Even if the project is using a dynamic config we can still
    // prompt a better error message, recommend a default value, and help the user
    // validate their custom bundle ID upfront.
    const { bundleIdentifier  } = await (0, _prompts).default({
        type: "text",
        name: "bundleIdentifier",
        initial: (ref = await getRecommendedBundleIdAsync(exp)) != null ? ref : undefined,
        // The Apple helps people know this isn't an EAS feature.
        message: `What would you like your iOS bundle identifier to be?`,
        validate: _validateApplicationId.validateBundleId
    }, {
        nonInteractiveHelp: NO_BUNDLE_ID_MESSAGE
    });
    // Warn the user if the bundle ID is already in use.
    const warning = await (0, _validateApplicationId).getBundleIdWarningAsync(bundleIdentifier);
    if (warning && !await warnAndConfirmAsync(warning)) {
        // Cycle the Bundle ID prompt to try again.
        return await promptForBundleIdAsync(projectRoot, exp);
    }
    // Apply the changes to the config.
    await (0, _modifyConfigAsync).attemptModification(projectRoot, {
        ios: {
            ...exp.ios || {},
            bundleIdentifier
        }
    }, {
        ios: {
            bundleIdentifier
        }
    });
    return bundleIdentifier;
}
async function warnAndConfirmAsync(warning) {
    Log.log();
    Log.warn(warning);
    Log.log();
    if (!await (0, _prompts).confirmAsync({
        message: `Continue?`,
        initial: true
    })) {
        return false;
    }
    return true;
}
// Recommend a bundle identifier based on the username and project slug.
async function getRecommendedBundleIdAsync(exp) {
    var ref, ref1;
    // Attempt to use the android package name first since it's convenient to have them aligned.
    if (((ref = exp.android) == null ? void 0 : ref.package) && (0, _validateApplicationId).validateBundleId((ref1 = exp.android) == null ? void 0 : ref1.package)) {
        var ref2;
        return (ref2 = exp.android) == null ? void 0 : ref2.package;
    } else {
        const username = await getUsernameAsync(exp);
        const possibleId = `com.${username}.${exp.slug}`;
        if (username && (0, _validateApplicationId).validateBundleId(possibleId)) {
            return possibleId;
        }
    }
    return null;
}
// Recommend a package name based on the username and project slug.
async function getRecommendedPackageNameAsync(exp) {
    var ref;
    // Attempt to use the ios bundle id first since it's convenient to have them aligned.
    if (((ref = exp.ios) == null ? void 0 : ref.bundleIdentifier) && (0, _validateApplicationId).validatePackage(exp.ios.bundleIdentifier)) {
        return exp.ios.bundleIdentifier;
    } else {
        const username = await getUsernameAsync(exp);
        // It's common to use dashes in your node project name, strip them from the suggested package name.
        const possibleId = `com.${username}.${exp.slug}`.split("-").join("");
        if (username && (0, _validateApplicationId).validatePackage(possibleId)) {
            return possibleId;
        }
    }
    return null;
}
async function getOrPromptForPackage(projectRoot) {
    var ref;
    const { exp  } = (0, _config).getConfig(projectRoot);
    const current = (ref = exp.android) == null ? void 0 : ref.package;
    if (current) {
        (0, _validateApplicationId).assertValidPackage(current);
        return current;
    }
    Log.log(_chalk.default`\n{bold 📝  Android package} {dim ${(0, _link).learnMore("https://expo.fyi/android-package")}}\n`);
    return await promptForPackageAsync(projectRoot, exp);
}
async function promptForPackageAsync(projectRoot, exp) {
    var ref;
    // Prompt the user for the android package.
    // Even if the project is using a dynamic config we can still
    // prompt a better error message, recommend a default value, and help the user
    // validate their custom android package upfront.
    const { packageName  } = await (0, _prompts).default({
        type: "text",
        name: "packageName",
        initial: (ref = await getRecommendedPackageNameAsync(exp)) != null ? ref : undefined,
        message: `What would you like your Android package name to be?`,
        validate: _validateApplicationId.validatePackage
    }, {
        nonInteractiveHelp: NO_PACKAGE_MESSAGE
    });
    // Warn the user if the package name is already in use.
    const warning = await (0, _validateApplicationId).getPackageNameWarningAsync(packageName);
    if (warning && !await warnAndConfirmAsync(warning)) {
        // Cycle the Package name prompt to try again.
        return await promptForPackageAsync(projectRoot, exp);
    }
    // Apply the changes to the config.
    await (0, _modifyConfigAsync).attemptModification(projectRoot, {
        android: {
            ...exp.android || {},
            package: packageName
        }
    }, {
        android: {
            package: packageName
        }
    });
    return packageName;
}

//# sourceMappingURL=getOrPromptApplicationId.js.map