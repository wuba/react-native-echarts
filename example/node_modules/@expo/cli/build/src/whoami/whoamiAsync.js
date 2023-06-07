"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.whoamiAsync = whoamiAsync;
var _chalk = _interopRequireDefault(require("chalk"));
var _user = require("../api/user/user");
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
async function whoamiAsync() {
    const user = await (0, _user).getUserAsync();
    if (user) {
        Log.exit(_chalk.default.green((0, _user).getActorDisplayName(user)), 0);
    } else {
        Log.exit("Not logged in");
    }
}

//# sourceMappingURL=whoamiAsync.js.map