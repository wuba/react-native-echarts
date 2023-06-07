"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _nodeFetch = require("node-fetch");
const responseInternalSymbol = Object.getOwnPropertySymbols(new _nodeFetch.Response())[1];
class NFCResponse extends _nodeFetch.Response {
    constructor(bodyStream, metaData, ejectFromCache = function ejectFromCache() {
        return this.ejectSelfFromCache();
    }, fromCache = false){
        super(bodyStream, metaData);
        this.ejectFromCache = ejectFromCache;
        this.fromCache = fromCache;
    }
    static serializeMetaFromNodeFetchResponse(res) {
        const metaData = {
            url: res.url,
            status: res.status,
            statusText: res.statusText,
            headers: res.headers.raw(),
            size: res.size,
            timeout: res.timeout,
            // @ts-ignore
            counter: res[responseInternalSymbol].counter
        };
        return metaData;
    }
}
exports.NFCResponse = NFCResponse;

//# sourceMappingURL=response.js.map