"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureDependenciesAsync = ensureDependenciesAsync;
exports.createInstallCommand = createInstallCommand;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var _wrapAnsi = _interopRequireDefault(require("wrap-ansi"));
var _installAsync = require("../../../install/installAsync");
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _interactive = require("../../../utils/interactive");
var _ora = require("../../../utils/ora");
var _prompts = require("../../../utils/prompts");
var _getMissingPackages = require("./getMissingPackages");
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
async function ensureDependenciesAsync(projectRoot, { exp =(0, _config).getConfig(projectRoot).exp , requiredPackages , warningMessage , installMessage , // Don't prompt in CI
skipPrompt =!(0, _interactive).isInteractive()  }) {
    const { missing  } = await (0, _getMissingPackages).getMissingPackagesAsync(projectRoot, {
        sdkVersion: exp.sdkVersion,
        requiredPackages
    });
    if (!missing.length) {
        return true;
    }
    // Prompt to install or bail out...
    const readableMissingPackages = missing.map(({ pkg , version  })=>version ? [
            pkg,
            version
        ].join("@") : pkg
    ).join(", ");
    let title = installMessage;
    if (skipPrompt) {
        title += "\n\n";
    } else {
        const confirm = await (0, _prompts).confirmAsync({
            message: wrapForTerminal(title + ` Would you like to install ${_chalk.default.cyan(readableMissingPackages)}?`),
            initial: true
        });
        if (confirm) {
            // Format with version if available.
            const packages = missing.map(({ pkg , version  })=>version ? [
                    pkg,
                    version
                ].join("@") : pkg
            );
            // Install packages with versions
            await installPackagesAsync(projectRoot, {
                packages
            });
            // Try again but skip prompting twice, simply fail if the packages didn't install correctly.
            return await ensureDependenciesAsync(projectRoot, {
                skipPrompt: true,
                installMessage,
                warningMessage,
                requiredPackages
            });
        }
        // Reset the title so it doesn't print twice in interactive mode.
        title = "";
    }
    const installCommand = createInstallCommand({
        packages: missing
    });
    const disableMessage = warningMessage;
    const solution = `Please install ${_chalk.default.bold(readableMissingPackages)} by running:\n\n  ${_chalk.default.reset.bold(installCommand)}\n\n`;
    // This prevents users from starting a misconfigured JS or TS project by default.
    throw new _errors.CommandError(wrapForTerminal(title + solution + disableMessage + "\n"));
}
/**  Wrap long messages to fit smaller terminals. */ function wrapForTerminal(message) {
    return (0, _wrapAnsi).default(message, process.stdout.columns || 80);
}
function createInstallCommand({ packages  }) {
    return "npx expo install " + packages.map(({ pkg , version  })=>{
        if (version) {
            return [
                pkg,
                version
            ].join("@");
        }
        return pkg;
    }).join(" ");
}
/** Install packages in the project. */ async function installPackagesAsync(projectRoot, { packages  }) {
    const packagesStr = _chalk.default.bold(packages.join(", "));
    Log.log();
    const installingPackageStep = (0, _ora).logNewSection(`Installing ${packagesStr}`);
    try {
        await (0, _installAsync).installAsync(packages, {
            projectRoot
        });
    } catch (e) {
        installingPackageStep.fail(`Failed to install ${packagesStr} with error: ${e.message}`);
        throw e;
    }
    installingPackageStep.succeed(`Installed ${packagesStr}`);
}

//# sourceMappingURL=ensureDependenciesAsync.js.map