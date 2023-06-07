"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startReactDevToolsProxyAsync = startReactDevToolsProxyAsync;
exports.closeReactDevToolsProxy = closeReactDevToolsProxy;
exports.addReactDevToolsReloadListener = addReactDevToolsReloadListener;
var _assert = _interopRequireDefault(require("assert"));
var _events = require("events");
var _ws = _interopRequireDefault(require("ws"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let serverInstance = null;
const eventEmitter = new _events.EventEmitter();
/**
 * Private command to support DevTools frontend reload.
 *
 * The react-devtools maintains state between frontend(webpage) and backend(app).
 * If we reload the frontend without reloading the app, the react-devtools will stuck on incorrect state.
 * We introduce this special reload command.
 * As long as the frontend reload, we will close app's WebSocket connection and tell app to reconnect again.
 */ const RELOAD_COMMAND = "Expo::RELOAD";
async function startReactDevToolsProxyAsync(options) {
    if (serverInstance != null) {
        return;
    }
    var ref;
    serverInstance = new _ws.default.WebSocketServer({
        port: (ref = options == null ? void 0 : options.port) != null ? ref : 8097
    });
    serverInstance.on("connection", function connection(ws) {
        ws.on("message", function message(rawData, isBinary) {
            (0, _assert).default(!isBinary);
            const data = rawData.toString();
            if (data === RELOAD_COMMAND) {
                closeAllOtherClients(ws);
                eventEmitter.emit(RELOAD_COMMAND);
                return;
            }
            serverInstance == null ? void 0 : serverInstance.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === _ws.default.OPEN) {
                    client.send(data, {
                        binary: isBinary
                    });
                }
            });
        });
    });
    serverInstance.on("close", function() {
        serverInstance = null;
    });
}
function closeReactDevToolsProxy() {
    serverInstance == null ? void 0 : serverInstance.close();
    serverInstance = null;
}
function addReactDevToolsReloadListener(listener) {
    eventEmitter.addListener(RELOAD_COMMAND, listener);
}
/**
 * Close all other WebSocket clients other than the current `self` client
 */ function closeAllOtherClients(self) {
    serverInstance == null ? void 0 : serverInstance.clients.forEach(function each(client) {
        if (client !== self && client.readyState === _ws.default.OPEN) {
            client.close();
        }
    });
}

//# sourceMappingURL=ReactDevToolsProxy.js.map