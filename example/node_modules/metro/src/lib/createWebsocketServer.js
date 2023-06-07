"use strict";

var _ws = _interopRequireDefault(require("ws"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

/**
 * Returns a WebSocketServer to be attached to an existing HTTP instance. It forwards
 * the received events on the given "websocketServer" parameter. It must be an
 * object with the following fields:
 *
 *   - onClientConnect
 *   - onClientError
 *   - onClientMessage
 *   - onClientDisconnect
 */

module.exports = function createWebsocketServer({ websocketServer }) {
  const wss = new _ws.default.Server({
    noServer: true,
  });
  wss.on("connection", async (ws, req) => {
    let connected = true;
    const url = req.url;
    const sendFn = (...args) => {
      if (connected) {
        ws.send(...args);
      }
    };
    const client = await websocketServer.onClientConnect(url, sendFn);
    if (client == null) {
      ws.close();
      return;
    }
    ws.on("error", (e) => {
      websocketServer.onClientError && websocketServer.onClientError(client, e);
    });
    ws.on("close", () => {
      websocketServer.onClientDisconnect &&
        websocketServer.onClientDisconnect(client);
      connected = false;
    });
    ws.on("message", (message) => {
      websocketServer.onClientMessage &&
        websocketServer.onClientMessage(client, message, sendFn);
    });
  });
  return wss;
};
