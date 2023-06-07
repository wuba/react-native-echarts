"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureEnvironmentSupportsTLSAsync = ensureEnvironmentSupportsTLSAsync;
exports.getTLSCertAsync = getTLSCertAsync;
var _devcert = require("@expo/devcert");
var _chalk = _interopRequireDefault(require("chalk"));
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("../../../log"));
var _dir = require("../../../utils/dir");
var _dotExpo = require("../../project/dotExpo");
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
async function ensureEnvironmentSupportsTLSAsync(projectRoot) {
    if (!process.env.SSL_CRT_FILE || !process.env.SSL_KEY_FILE) {
        const tls = await getTLSCertAsync(projectRoot);
        if (tls) {
            process.env.SSL_CRT_FILE = tls.certPath;
            process.env.SSL_KEY_FILE = tls.keyPath;
        }
    }
}
async function getTLSCertAsync(projectRoot) {
    Log.log(_chalk.default`Creating TLS certificate for localhost. {dim This functionality may not work on all computers.}`);
    const name = "localhost";
    const result = await (0, _devcert).certificateFor(name);
    if (result) {
        const dotExpoDir = (0, _dotExpo).ensureDotExpoProjectDirectoryInitialized(projectRoot);
        const { key , cert  } = result;
        const folder = _path.default.join(dotExpoDir, "tls");
        const keyPath = _path.default.join(folder, `key-${name}.pem`);
        const certPath = _path.default.join(folder, `cert-${name}.pem`);
        await (0, _dir).ensureDirectoryAsync(folder);
        await Promise.allSettled([
            _promises.default.writeFile(keyPath, key),
            _promises.default.writeFile(certPath, cert)
        ]);
        return {
            keyPath,
            certPath
        };
    }
    return result;
}

//# sourceMappingURL=tls.js.map