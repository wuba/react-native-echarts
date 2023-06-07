"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDevServerMiddleware = createDevServerMiddleware;
Object.defineProperty(exports, "devToolsMiddleware", {
  enumerable: true,
  get: function () {
    return _devToolsMiddleware.default;
  }
});
Object.defineProperty(exports, "indexPageMiddleware", {
  enumerable: true,
  get: function () {
    return _indexPageMiddleware.default;
  }
});
Object.defineProperty(exports, "openStackFrameInEditorMiddleware", {
  enumerable: true,
  get: function () {
    return _openStackFrameInEditorMiddleware.default;
  }
});
Object.defineProperty(exports, "openURLMiddleware", {
  enumerable: true,
  get: function () {
    return _openURLMiddleware.default;
  }
});
Object.defineProperty(exports, "rawBodyMiddleware", {
  enumerable: true,
  get: function () {
    return _rawBodyMiddleware.default;
  }
});
Object.defineProperty(exports, "securityHeadersMiddleware", {
  enumerable: true,
  get: function () {
    return _securityHeadersMiddleware.default;
  }
});
Object.defineProperty(exports, "statusPageMiddleware", {
  enumerable: true,
  get: function () {
    return _statusPageMiddleware.default;
  }
});
Object.defineProperty(exports, "systraceProfileMiddleware", {
  enumerable: true,
  get: function () {
    return _systraceProfileMiddleware.default;
  }
});
function _compression() {
  const data = _interopRequireDefault(require("compression"));
  _compression = function () {
    return data;
  };
  return data;
}
function _connect() {
  const data = _interopRequireDefault(require("connect"));
  _connect = function () {
    return data;
  };
  return data;
}
function _errorhandler() {
  const data = _interopRequireDefault(require("errorhandler"));
  _errorhandler = function () {
    return data;
  };
  return data;
}
function _nocache() {
  const data = _interopRequireDefault(require("nocache"));
  _nocache = function () {
    return data;
  };
  return data;
}
function _serveStatic() {
  const data = _interopRequireDefault(require("serve-static"));
  _serveStatic = function () {
    return data;
  };
  return data;
}
function _cliDebuggerUi() {
  const data = require("@react-native-community/cli-debugger-ui");
  _cliDebuggerUi = function () {
    return data;
  };
  return data;
}
var _devToolsMiddleware = _interopRequireDefault(require("./devToolsMiddleware"));
var _indexPageMiddleware = _interopRequireDefault(require("./indexPageMiddleware"));
var _openStackFrameInEditorMiddleware = _interopRequireDefault(require("./openStackFrameInEditorMiddleware"));
var _openURLMiddleware = _interopRequireDefault(require("./openURLMiddleware"));
var _rawBodyMiddleware = _interopRequireDefault(require("./rawBodyMiddleware"));
var _securityHeadersMiddleware = _interopRequireDefault(require("./securityHeadersMiddleware"));
var _statusPageMiddleware = _interopRequireDefault(require("./statusPageMiddleware"));
var _systraceProfileMiddleware = _interopRequireDefault(require("./systraceProfileMiddleware"));
var _createDebuggerProxyEndpoint = _interopRequireDefault(require("./websocket/createDebuggerProxyEndpoint"));
var _createMessageSocketEndpoint = _interopRequireDefault(require("./websocket/createMessageSocketEndpoint"));
var _createEventsSocketEndpoint = _interopRequireDefault(require("./websocket/createEventsSocketEndpoint"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createDevServerMiddleware(options) {
  const debuggerProxyEndpoint = (0, _createDebuggerProxyEndpoint.default)();
  const isDebuggerConnected = debuggerProxyEndpoint.isDebuggerConnected;
  const messageSocketEndpoint = (0, _createMessageSocketEndpoint.default)();
  const broadcast = messageSocketEndpoint.broadcast;
  const eventsSocketEndpoint = (0, _createEventsSocketEndpoint.default)(broadcast);
  const middleware = (0, _connect().default)().use(_securityHeadersMiddleware.default)
  // @ts-ignore compression and connect types mismatch
  .use((0, _compression().default)()).use((0, _nocache().default)()).use('/debugger-ui', (0, _cliDebuggerUi().debuggerUIMiddleware)()).use('/launch-js-devtools', (0, _devToolsMiddleware.default)(options, isDebuggerConnected)).use('/open-stack-frame', (0, _openStackFrameInEditorMiddleware.default)(options)).use('/open-url', _openURLMiddleware.default).use('/status', _statusPageMiddleware.default).use('/symbolicate', _rawBodyMiddleware.default).use('/systrace', _systraceProfileMiddleware.default).use('/reload', (_req, res) => {
    broadcast('reload');
    res.end('OK');
  }).use((0, _errorhandler().default)());
  options.watchFolders.forEach(folder => {
    // @ts-ignore mismatch between express and connect middleware types
    middleware.use((0, _serveStatic().default)(folder));
  });
  return {
    websocketEndpoints: {
      '/debugger-proxy': debuggerProxyEndpoint.server,
      '/message': messageSocketEndpoint.server,
      '/events': eventsSocketEndpoint.server
    },
    debuggerProxyEndpoint,
    messageSocketEndpoint,
    eventsSocketEndpoint,
    middleware
  };
}

//# sourceMappingURL=index.js.map