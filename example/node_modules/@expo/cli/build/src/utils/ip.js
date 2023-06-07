"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIpAddress = getIpAddress;
var _internalIp = _interopRequireDefault(require("internal-ip"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getIpAddress() {
    return _internalIp.default.v4.sync() || "127.0.0.1";
}

//# sourceMappingURL=ip.js.map