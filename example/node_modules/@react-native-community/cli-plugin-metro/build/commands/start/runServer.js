"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _metro() {
  const data = _interopRequireDefault(require("metro"));
  _metro = function () {
    return data;
  };
  return data;
}
function _metroCore() {
  const data = require("metro-core");
  _metroCore = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _cliServerApi() {
  const data = require("@react-native-community/cli-server-api");
  _cliServerApi = function () {
    return data;
  };
  return data;
}
var _loadMetroConfig = _interopRequireDefault(require("../../tools/loadMetroConfig"));
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _watchMode = _interopRequireDefault(require("./watchMode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-ignore untyped metro

// @ts-ignore untyped metro

async function runServer(_argv, ctx, args) {
  let reportEvent;
  const terminal = new (_metroCore().Terminal)(process.stdout);
  const ReporterImpl = getReporterImpl(args.customLogReporterPath);
  const terminalReporter = new ReporterImpl(terminal);
  const reporter = {
    update(event) {
      terminalReporter.update(event);
      if (reportEvent) {
        reportEvent(event);
      }
    }
  };
  const metroConfig = await (0, _loadMetroConfig.default)(ctx, {
    config: args.config,
    maxWorkers: args.maxWorkers,
    port: args.port,
    resetCache: args.resetCache,
    watchFolders: args.watchFolders,
    projectRoot: args.projectRoot,
    sourceExts: args.sourceExts,
    reporter
  });
  if (args.assetPlugins) {
    metroConfig.transformer.assetPlugins = args.assetPlugins.map(plugin => require.resolve(plugin));
  }
  const {
    middleware,
    websocketEndpoints,
    messageSocketEndpoint,
    eventsSocketEndpoint
  } = (0, _cliServerApi().createDevServerMiddleware)({
    host: args.host,
    port: metroConfig.server.port,
    watchFolders: metroConfig.watchFolders
  });
  middleware.use(_cliServerApi().indexPageMiddleware);
  const customEnhanceMiddleware = metroConfig.server.enhanceMiddleware;
  metroConfig.server.enhanceMiddleware = (metroMiddleware, server) => {
    if (customEnhanceMiddleware) {
      metroMiddleware = customEnhanceMiddleware(metroMiddleware, server);
    }
    return middleware.use(metroMiddleware);
  };
  const serverInstance = await _metro().default.runServer(metroConfig, {
    host: args.host,
    secure: args.https,
    secureCert: args.cert,
    secureKey: args.key,
    hmrEnabled: true,
    websocketEndpoints
  });
  reportEvent = eventsSocketEndpoint.reportEvent;
  if (args.interactive) {
    (0, _watchMode.default)(messageSocketEndpoint);
  }

  // In Node 8, the default keep-alive for an HTTP connection is 5 seconds. In
  // early versions of Node 8, this was implemented in a buggy way which caused
  // some HTTP responses (like those containing large JS bundles) to be
  // terminated early.
  //
  // As a workaround, arbitrarily increase the keep-alive from 5 to 30 seconds,
  // which should be enough to send even the largest of JS bundles.
  //
  // For more info: https://github.com/nodejs/node/issues/13391
  //
  serverInstance.keepAliveTimeout = 30000;
  await (0, _cliTools().releaseChecker)(ctx.root);
}
function getReporterImpl(customLogReporterPath) {
  if (customLogReporterPath === undefined) {
    return require('metro/src/lib/TerminalReporter');
  }
  try {
    // First we let require resolve it, so we can require packages in node_modules
    // as expected. eg: require('my-package/reporter');
    return require(customLogReporterPath);
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
    // If that doesn't work, then we next try relative to the cwd, eg:
    // require('./reporter');
    return require(_path().default.resolve(customLogReporterPath));
  }
}
var _default = runServer;
exports.default = _default;

//# sourceMappingURL=runServer.js.map