"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startBundlerAsync = startBundlerAsync;
var _config = require("@expo/config");
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../log"));
var _startInterface = require("../start/interface/startInterface");
var _devServerManager = require("../start/server/DevServerManager");
var _interactive = require("../utils/interactive");
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
async function startBundlerAsync(projectRoot, { port , headless , scheme  }) {
    const options = {
        port,
        headless,
        devClient: true,
        location: {
            scheme
        }
    };
    const devServerManager = new _devServerManager.DevServerManager(projectRoot, options);
    await devServerManager.startAsync([
        {
            // TODO: Allow swapping this value for another bundler.
            type: "metro",
            options
        }, 
    ]);
    // Present the Terminal UI.
    if (!headless && (0, _interactive).isInteractive()) {
        // Only read the config if we are going to use the results.
        const { exp  } = (0, _config).getConfig(projectRoot, {
            // We don't need very many fields here, just use the lightest possible read.
            skipSDKVersionRequirement: true,
            skipPlugins: true
        });
        var _platforms;
        await (0, _startInterface).startInterfaceAsync(devServerManager, {
            platforms: (_platforms = exp.platforms) != null ? _platforms : []
        });
    } else {
        var ref;
        // Display the server location in CI...
        const url = (ref = devServerManager.getDefaultDevServer()) == null ? void 0 : ref.getDevServerUrl();
        if (url) {
            Log.log(_chalk.default`Waiting on {underline ${url}}`);
        }
    }
    return devServerManager;
}

//# sourceMappingURL=startBundler.js.map