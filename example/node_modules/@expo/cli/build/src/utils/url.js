"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUrlAvailableAsync = isUrlAvailableAsync;
exports.isUrlOk = isUrlOk;
exports.validateUrl = validateUrl;
exports.stripPort = stripPort;
exports.stripExtension = stripExtension;
var _dns = _interopRequireDefault(require("dns"));
var _url = require("url");
var _client = require("../api/rest/client");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function isUrlAvailableAsync(url) {
    return new Promise((resolve)=>{
        _dns.default.lookup(url, (err)=>{
            resolve(!err);
        });
    });
}
async function isUrlOk(url) {
    try {
        const res = await (0, _client).fetchAsync(url);
        return res.ok;
    } catch  {
        return false;
    }
}
function validateUrl(urlString, { protocols , requireProtocol  } = {}) {
    try {
        const results = new _url.URL(urlString);
        if (!results.protocol && !requireProtocol) {
            return true;
        }
        return protocols ? results.protocol ? protocols.map((x)=>`${x.toLowerCase()}:`
        ).includes(results.protocol) : false : true;
    } catch  {
        return false;
    }
}
function stripPort(host) {
    var ref;
    var ref1;
    return (ref1 = (ref = coerceUrl(host)) == null ? void 0 : ref.hostname) != null ? ref1 : null;
}
function coerceUrl(urlString) {
    if (!urlString) {
        return null;
    }
    try {
        return new _url.URL("/", urlString);
    } catch (error) {
        if (error.code !== "ERR_INVALID_URL") {
            throw error;
        }
        return new _url.URL("/", `http://${urlString}`);
    }
}
function stripExtension(url, extension) {
    return url.replace(new RegExp(`.${extension}$`), "");
}

//# sourceMappingURL=url.js.map