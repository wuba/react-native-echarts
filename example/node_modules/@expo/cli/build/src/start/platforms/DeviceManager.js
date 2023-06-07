"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _chalk = _interopRequireDefault(require("chalk"));
var Log = _interopRequireWildcard(require("../../log"));
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
class DeviceManager {
    constructor(device){
        this.device = device;
    }
    logOpeningUrl(url) {
        Log.log(_chalk.default`\u203A Opening {underline ${url}} on {bold ${this.name}}`);
    }
}
exports.DeviceManager = DeviceManager;

//# sourceMappingURL=DeviceManager.js.map