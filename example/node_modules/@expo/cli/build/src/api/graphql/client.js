"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlError", {
    enumerable: true,
    get: function() {
        return _core.CombinedError;
    }
});
exports.withErrorHandlingAsync = withErrorHandlingAsync;
exports.graphqlClient = void 0;
var _core = require("@urql/core");
var _exchangeRetry = require("@urql/exchange-retry");
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var Log = _interopRequireWildcard(require("../../log"));
var _endpoint = require("../endpoint");
var _wrapFetchWithOffline = require("../rest/wrapFetchWithOffline");
var _wrapFetchWithProxy = require("../rest/wrapFetchWithProxy");
var _userSettings = _interopRequireDefault(require("../user/UserSettings"));
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
const graphqlClient = (0, _core).createClient({
    url: (0, _endpoint).getExpoApiBaseUrl() + "/graphql",
    exchanges: [
        _core.dedupExchange,
        _core.cacheExchange,
        (0, _exchangeRetry).retryExchange({
            maxDelayMs: 4000,
            retryIf: (err)=>{
                return !!(err && (err.networkError || err.graphQLErrors.some((e)=>{
                    var ref;
                    return e == null ? void 0 : (ref = e.extensions) == null ? void 0 : ref.isTransient;
                })));
            }
        }),
        _core.fetchExchange, 
    ],
    // @ts-ignore Type 'typeof fetch' is not assignable to type '(input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>'.
    fetch: (0, _wrapFetchWithOffline).wrapFetchWithOffline((0, _wrapFetchWithProxy).wrapFetchWithProxy(_nodeFetch.default)),
    fetchOptions: ()=>{
        var ref;
        const token = _userSettings.default.getAccessToken();
        if (token) {
            return {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };
        }
        const sessionSecret = (ref = _userSettings.default.getSession()) == null ? void 0 : ref.sessionSecret;
        if (sessionSecret) {
            return {
                headers: {
                    "expo-session": sessionSecret
                }
            };
        }
        return {};
    }
});
exports.graphqlClient = graphqlClient;
async function withErrorHandlingAsync(promise) {
    const { data , error  } = await promise;
    if (error) {
        if (error.graphQLErrors.some((e)=>{
            var ref;
            return e == null ? void 0 : (ref = e.extensions) == null ? void 0 : ref.isTransient;
        })) {
            Log.error(`We've encountered a transient error, please try again shortly.`);
        }
        throw error;
    }
    // Check for a malformed response. This only checks the root query's existence. It doesn't affect
    // returning responses with an empty result set.
    if (!data) {
        throw new Error("Returned query result data is null!");
    }
    return data;
}

//# sourceMappingURL=client.js.map