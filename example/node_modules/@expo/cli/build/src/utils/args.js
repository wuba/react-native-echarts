"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getProjectRoot = getProjectRoot;
exports.assertArgs = assertArgs;
exports.assertWithOptionsArgs = assertWithOptionsArgs;
exports.printHelp = printHelp;
var _arg = _interopRequireDefault(require("arg"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = require("fs");
var _path = require("path");
var Log = _interopRequireWildcard(require("../log"));
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
function getProjectRoot(args) {
    const projectRoot = (0, _path).resolve(args._[0] || ".");
    if (!(0, _fs).existsSync(projectRoot)) {
        Log.exit(`Invalid project root: ${projectRoot}`);
    }
    return projectRoot;
}
function assertArgs(schema, argv) {
    return assertWithOptionsArgs(schema, {
        argv
    });
}
function assertWithOptionsArgs(schema, options) {
    try {
        return (0, _arg).default(schema, options);
    } catch (error) {
        // Ensure unknown options are handled the same way.
        if (error.code === "ARG_UNKNOWN_OPTION") {
            Log.exit(error.message, 1);
        }
        // Otherwise rethrow the error.
        throw error;
    }
}
function printHelp(info, usage, options, extra = "") {
    Log.exit(_chalk.default`
  {bold Info}
    ${info}

  {bold Usage}
    {dim $} ${usage}

  {bold Options}
    ${options.split("\n").join("\n    ")}
` + extra, 0);
}

//# sourceMappingURL=args.js.map