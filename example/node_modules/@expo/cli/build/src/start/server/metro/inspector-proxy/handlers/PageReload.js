"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class PageReloadHandler {
    constructor(metroBundler){
        this.metroBundler = metroBundler;
    }
    onDebuggerMessage(message, { socket  }) {
        if (message.method === "Page.reload") {
            this.metroBundler.broadcastMessage("reload");
            socket.send(JSON.stringify({
                id: message.id
            }));
            return true;
        }
        return false;
    }
}
exports.PageReloadHandler = PageReloadHandler;

//# sourceMappingURL=PageReload.js.map