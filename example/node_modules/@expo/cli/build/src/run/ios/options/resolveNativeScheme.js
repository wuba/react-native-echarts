"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveNativeSchemePropsAsync = resolveNativeSchemePropsAsync;
exports.promptOrQueryNativeSchemeAsync = promptOrQueryNativeSchemeAsync;
exports.getDefaultNativeScheme = getDefaultNativeScheme;
var _configPlugins = require("@expo/config-plugins");
var _chalk = _interopRequireDefault(require("chalk"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _profile = require("../../../utils/profile");
var _prompts = require("../../../utils/prompts");
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
async function resolveNativeSchemePropsAsync(projectRoot, options, xcodeProject) {
    var ref;
    return (ref = await promptOrQueryNativeSchemeAsync(projectRoot, options)) != null ? ref : getDefaultNativeScheme(projectRoot, options, xcodeProject);
}
async function promptOrQueryNativeSchemeAsync(projectRoot, { scheme , configuration  }) {
    const schemes = _configPlugins.IOSConfig.BuildScheme.getRunnableSchemesFromXcodeproj(projectRoot, {
        configuration
    });
    if (!schemes.length) {
        throw new _errors.CommandError("IOS_MALFORMED", "No native iOS build schemes found");
    }
    if (scheme === true) {
        if (schemes.length === 1) {
            Log.log(`Auto selecting only available scheme: ${schemes[0].name}`);
            return schemes[0];
        }
        const resolvedSchemeName = await (0, _prompts).selectAsync("Select a scheme", schemes.map((value)=>{
            const isApp = value.type === _configPlugins.IOSConfig.Target.TargetType.APPLICATION && value.osType === "iOS";
            return {
                value: value.name,
                title: isApp ? _chalk.default.bold(value.name) + _chalk.default.gray(" (app)") : value.name
            };
        }), {
            nonInteractiveHelp: `--scheme: argument must be provided with a string in non-interactive mode. Valid choices are: ${schemes.join(", ")}`
        });
        var ref;
        return (ref = schemes.find(({ name  })=>resolvedSchemeName === name
        )) != null ? ref : null;
    }
    // Attempt to match the schemes up so we can open the correct simulator
    return scheme ? schemes.find(({ name  })=>name === scheme
    ) || {
        name: scheme
    } : null;
}
function getDefaultNativeScheme(projectRoot, options, xcodeProject) {
    // If the resolution failed then we should just use the first runnable scheme that
    // matches the provided configuration.
    const resolvedScheme = (0, _profile).profile(_configPlugins.IOSConfig.BuildScheme.getRunnableSchemesFromXcodeproj)(projectRoot, {
        configuration: options.configuration
    })[0];
    // If we couldn't find the scheme, then we'll guess at it,
    // this is needed for cases where the native code hasn't been generated yet.
    if (resolvedScheme) {
        return resolvedScheme;
    }
    return {
        name: _path.default.basename(xcodeProject.name, _path.default.extname(xcodeProject.name))
    };
}

//# sourceMappingURL=resolveNativeScheme.js.map