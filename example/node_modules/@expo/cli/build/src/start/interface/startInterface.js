"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startInterfaceAsync = startInterfaceAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../log"));
var _editor = require("../../utils/editor");
var _errors = require("../../utils/errors");
var _ora = require("../../utils/ora");
var _progress = require("../../utils/progress");
var _prompts = require("../../utils/prompts");
var _webSupportProjectPrerequisite = require("../doctor/web/WebSupportProjectPrerequisite");
var _keyPressHandler = require("./KeyPressHandler");
var _commandsTable = require("./commandsTable");
var _interactiveActions = require("./interactiveActions");
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
const debug = require("debug")("expo:start:interface:startInterface");
const CTRL_C = "\x03";
const CTRL_D = "\x04";
const CTRL_L = "\f";
const PLATFORM_SETTINGS = {
    android: {
        name: "Android",
        key: "android",
        launchTarget: "emulator"
    },
    ios: {
        name: "iOS",
        key: "ios",
        launchTarget: "simulator"
    }
};
async function startInterfaceAsync(devServerManager, options) {
    var ref2;
    const actions = new _interactiveActions.DevServerManagerActions(devServerManager);
    const isWebSocketsEnabled = (ref2 = devServerManager.getDefaultDevServer()) == null ? void 0 : ref2.isTargetingNative();
    const usageOptions = {
        isWebSocketsEnabled,
        devClient: devServerManager.options.devClient,
        ...options
    };
    actions.printDevServerInfo(usageOptions);
    const onPressAsync = async (key)=>{
        // Auxillary commands all escape.
        switch(key){
            case CTRL_C:
            case CTRL_D:
                {
                    // Prevent terminal UI from accepting commands while the process is closing.
                    // Without this, fast typers will close the server then start typing their
                    // next command and have a bunch of unrelated things pop up.
                    (0, _prompts).pauseInteractions();
                    const spinners = (0, _ora).getAllSpinners();
                    spinners.forEach((spinner)=>{
                        spinner.fail();
                    });
                    const currentProgress = (0, _progress).getProgressBar();
                    if (currentProgress) {
                        currentProgress.terminate();
                        (0, _progress).setProgressBar(null);
                    }
                    const spinner1 = (0, _ora).ora({
                        text: "Stopping server",
                        color: "white"
                    }).start();
                    try {
                        await devServerManager.stopAsync();
                        spinner1.stopAndPersist({
                            text: "Stopped server",
                            symbol: `\u203A`
                        });
                        // @ts-ignore: Argument of type '"SIGINT"' is not assignable to parameter of type '"disconnect"'.
                        process.emit("SIGINT");
                        // TODO: Is this the right place to do this?
                        process.exit();
                    } catch (error) {
                        spinner1.fail("Failed to stop server");
                        throw error;
                    }
                    break;
                }
            case CTRL_L:
                return Log.clear();
            case "?":
                return (0, _commandsTable).printUsage(usageOptions, {
                    verbose: true
                });
        }
        // Optionally enabled
        if (isWebSocketsEnabled) {
            switch(key){
                case "m":
                    return actions.toggleDevMenu();
                case "M":
                    return actions.openMoreToolsAsync();
            }
        }
        const { platforms =[
            "ios",
            "android",
            "web"
        ]  } = options;
        if ([
            "i",
            "a"
        ].includes(key.toLowerCase())) {
            const platform = key.toLowerCase() === "i" ? "ios" : "android";
            const shouldPrompt = [
                "I",
                "A"
            ].includes(key);
            if (shouldPrompt) {
                Log.clear();
            }
            const server = devServerManager.getDefaultDevServer();
            const settings = PLATFORM_SETTINGS[platform];
            Log.log(`${_commandsTable.BLT} Opening on ${settings.name}...`);
            if (server.isTargetingNative() && !platforms.includes(settings.key)) {
                Log.warn(_chalk.default`${settings.name} is disabled, enable it by adding {bold ${settings.key}} to the platforms array in your app.json or app.config.js`);
            } else {
                try {
                    await server.openPlatformAsync(settings.launchTarget, {
                        shouldPrompt
                    });
                    (0, _commandsTable).printHelp();
                } catch (error) {
                    if (!(error instanceof _errors.AbortCommandError)) {
                        Log.exception(error);
                    }
                }
            }
            // Break out early.
            return;
        }
        switch(key){
            case "w":
                {
                    try {
                        await devServerManager.ensureProjectPrerequisiteAsync(_webSupportProjectPrerequisite.WebSupportProjectPrerequisite);
                        if (!platforms.includes("web")) {
                            var ref;
                            platforms.push("web");
                            (ref = options.platforms) == null ? void 0 : ref.push("web");
                        }
                    } catch (e) {
                        Log.warn(e.message);
                        break;
                    }
                    const isDisabled = !platforms.includes("web");
                    if (isDisabled) {
                        debug("Web is disabled");
                        break;
                    }
                    // Ensure the Webpack dev server is running first
                    if (!devServerManager.getWebDevServer()) {
                        debug("Starting up webpack dev server");
                        await devServerManager.ensureWebDevServerRunningAsync();
                        // When this is the first time webpack is started, reprint the connection info.
                        actions.printDevServerInfo(usageOptions);
                    }
                    Log.log(`${_commandsTable.BLT} Open in the web browser...`);
                    try {
                        var ref1;
                        await ((ref1 = devServerManager.getWebDevServer()) == null ? void 0 : ref1.openPlatformAsync("desktop"));
                        (0, _commandsTable).printHelp();
                    } catch (error) {
                        if (!(error instanceof _errors.AbortCommandError)) {
                            Log.exception(error);
                        }
                    }
                    break;
                }
            case "c":
                Log.clear();
                return actions.printDevServerInfo(usageOptions);
            case "j":
                return actions.openJsInspectorAsync();
            case "r":
                return actions.reloadApp();
            case "o":
                Log.log(`${_commandsTable.BLT} Opening the editor...`);
                return (0, _editor).openInEditorAsync(devServerManager.projectRoot);
        }
    };
    const keyPressHandler = new _keyPressHandler.KeyPressHandler(onPressAsync);
    const listener = keyPressHandler.createInteractionListener();
    (0, _prompts).addInteractionListener(listener);
    // Start observing...
    keyPressHandler.startInterceptingKeyStrokes();
}

//# sourceMappingURL=startInterface.js.map