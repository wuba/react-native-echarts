"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.profile = profile;
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../log"));
var _env = require("./env");
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
function profile(fn, functionName = fn.name) {
    if (!_env.env.EXPO_PROFILE) {
        return fn;
    }
    const name = _chalk.default.dim(`⏱  [profile] ${functionName != null ? functionName : "unknown"}`);
    return (...args)=>{
        // Start the timer.
        Log.time(name);
        // Invoke the method.
        const results1 = fn(...args);
        // If non-promise then return as-is.
        if (!(results1 instanceof Promise)) {
            Log.timeEnd(name);
            return results1;
        }
        // Otherwise await to profile after the promise resolves.
        return new Promise((resolve, reject)=>{
            results1.then((results)=>{
                resolve(results);
                Log.timeEnd(name);
            }, (reason)=>{
                reject(reason);
                Log.timeEnd(name);
            });
        });
    };
}

//# sourceMappingURL=profile.js.map