"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDebuggerProxyEndpoint;
function _ws() {
  const data = _interopRequireDefault(require("ws"));
  _ws = function () {
    return data;
  };
  return data;
}
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

function createDebuggerProxyEndpoint() {
  const WebSocketServer = _ws().default.Server;
  const wss = new WebSocketServer({
    noServer: true
  });
  let debuggerSocket;
  let clientSocket;
  function send(dest, message) {
    if (!dest) {
      return;
    }
    try {
      dest.send(message);
    } catch (e) {
      _cliTools().logger.warn(e);
      // Sometimes this call throws 'not opened'
    }
  }

  const debuggerSocketCloseHandler = () => {
    debuggerSocket = null;
    if (clientSocket) {
      clientSocket.close(1011, 'Debugger was disconnected');
    }
  };
  const clientSocketCloseHandler = () => {
    clientSocket = null;
    send(debuggerSocket, JSON.stringify({
      method: '$disconnected'
    }));
  };
  wss.on('connection', (socket, request) => {
    const {
      url
    } = request;
    if (url && url.indexOf('role=debugger') > -1) {
      if (debuggerSocket) {
        socket.close(1011, 'Another debugger is already connected');
        return;
      }
      debuggerSocket = socket;
      if (debuggerSocket) {
        debuggerSocket.onerror = debuggerSocketCloseHandler;
        debuggerSocket.onclose = debuggerSocketCloseHandler;
        debuggerSocket.onmessage = ({
          data
        }) => send(clientSocket, data);
      }
    } else if (url && url.indexOf('role=client') > -1) {
      if (clientSocket) {
        clientSocket.onerror = () => {};
        clientSocket.onclose = () => {};
        clientSocket.onmessage = () => {};
        clientSocket.close(1011, 'Another client connected');
      }
      clientSocket = socket;
      clientSocket.onerror = clientSocketCloseHandler;
      clientSocket.onclose = clientSocketCloseHandler;
      clientSocket.onmessage = ({
        data
      }) => send(debuggerSocket, data);
    } else {
      socket.close(1011, 'Missing role param');
    }
  });
  return {
    server: wss,
    isDebuggerConnected() {
      return !!debuggerSocket;
    }
  };
}

//# sourceMappingURL=createDebuggerProxyEndpoint.js.map