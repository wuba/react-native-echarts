"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compileAsync = compileAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _util = require("util");
var Log = _interopRequireWildcard(require("../../../log"));
var _errors = require("../../../utils/errors");
var _formatWebpackMessages = require("./formatWebpackMessages");
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
async function compileAsync(compiler) {
    const stats = await (0, _util).promisify(compiler.run.bind(compiler))();
    const { errors , warnings  } = (0, _formatWebpackMessages).formatWebpackMessages(stats.toJson({
        all: false,
        warnings: true,
        errors: true
    }));
    if (errors == null ? void 0 : errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (errors.length > 1) {
            errors.length = 1;
        }
        throw new _errors.CommandError("WEBPACK_BUNDLE", errors.join("\n\n"));
    }
    if (warnings == null ? void 0 : warnings.length) {
        Log.warn(_chalk.default.yellow("Compiled with warnings\n"));
        Log.warn(warnings.join("\n\n"));
    } else {
        Log.log(_chalk.default.green("Compiled successfully"));
    }
    return {
        errors,
        warnings
    };
}

//# sourceMappingURL=compile.js.map