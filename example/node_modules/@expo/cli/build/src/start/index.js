#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.expoStart = void 0;
var _chalk = _interopRequireDefault(require("chalk"));
var _args = require("../utils/args");
var _errors = require("../utils/errors");
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
const expoStart = async (argv)=>{
    const args = (0, _args).assertArgs({
        // Types
        "--help": Boolean,
        "--clear": Boolean,
        "--max-workers": Number,
        "--no-dev": Boolean,
        "--minify": Boolean,
        "--https": Boolean,
        "--force-manifest-type": String,
        "--private-key-path": String,
        "--port": Number,
        "--dev-client": Boolean,
        "--scheme": String,
        "--android": Boolean,
        "--ios": Boolean,
        "--web": Boolean,
        "--host": String,
        "--tunnel": Boolean,
        "--lan": Boolean,
        "--localhost": Boolean,
        "--offline": Boolean,
        // Aliases
        "-h": "--help",
        "-c": "--clear",
        "-p": "--port",
        "-a": "--android",
        "-i": "--ios",
        "-w": "--web",
        "-m": "--host"
    }, argv);
    if (args["--help"]) {
        (0, _args).printHelp(`Start a local dev server for the app`, _chalk.default`npx expo start {dim <dir>}`, [
            _chalk.default`<dir>                                  Directory of the Expo project. {dim Default: Current working directory}`,
            `-a, --android                          Opens your app in Expo Go on a connected Android device`,
            `-i, --ios                              Opens your app in Expo Go in a currently running iOS simulator on your computer`,
            `-w, --web                              Opens your app in a web browser`,
            ``,
            `-c, --clear                            Clear the bundler cache`,
            `--max-workers <num>                    Maximum number of tasks to allow Metro to spawn`,
            `--no-dev                               Bundle in production mode`,
            `--minify                               Minify JavaScript`,
            ``,
            _chalk.default`-m, --host <mode>                      Dev server hosting type. {dim Default: lan}`,
            _chalk.default`                                       {bold lan}: Use the local network`,
            _chalk.default`                                       {bold tunnel}: Use any network by tunnel through ngrok`,
            _chalk.default`                                       {bold localhost}: Connect to the dev server over localhost`,
            `--tunnel                               Same as --host tunnel`,
            `--lan                                  Same as --host lan`,
            `--localhost                            Same as --host localhost`,
            ``,
            `--offline                              Skip network requests and use anonymous manifest signatures`,
            `--https                                Start the dev server with https protocol`,
            `--scheme <scheme>                      Custom URI protocol to use when launching an app`,
            _chalk.default`-p, --port <port>                      Port to start the dev server on (does not apply to web or tunnel). {dim Default: 19000}`,
            ``,
            _chalk.default`--dev-client                           {yellow Experimental:} Starts the bundler for use with the expo-development-client`,
            `--force-manifest-type <manifest-type>  Override auto detection of manifest type`,
            `--private-key-path <path>              Path to private key for code signing. Default: "private-key.pem" in the same directory as the certificate specified by the expo-updates configuration in app.json.`,
            `-h, --help                             Usage info`, 
        ].join("\n"));
    }
    const projectRoot = (0, _args).getProjectRoot(args);
    const { resolveOptionsAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("./resolveOptions"));
    });
    const options = await resolveOptionsAsync(projectRoot, args).catch(_errors.logCmdError);
    const { APISettings  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("../api/settings"));
    });
    APISettings.isOffline = options.offline;
    const { startAsync  } = await Promise.resolve().then(function() {
        return _interopRequireWildcard(require("./startAsync"));
    });
    return startAsync(projectRoot, options, {
        webOnly: false
    }).catch(_errors.logCmdError);
};
exports.expoStart = expoStart;

//# sourceMappingURL=index.js.map