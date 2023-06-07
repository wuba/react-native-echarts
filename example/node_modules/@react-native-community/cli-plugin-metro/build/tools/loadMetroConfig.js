"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadMetroConfig;
exports.getDefaultConfig = void 0;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _metroConfig() {
  const data = require("metro-config");
  _metroConfig = function () {
    return data;
  };
  return data;
}
var _metroPlatformResolver = require("./metroPlatformResolver");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Configuration file of Metro.
 */

// @ts-ignore - no typed definition for the package

const INTERNAL_CALLSITES_REGEX = new RegExp(['/Libraries/Renderer/implementations/.+\\.js$', '/Libraries/BatchedBridge/MessageQueue\\.js$', '/Libraries/YellowBox/.+\\.js$', '/Libraries/LogBox/.+\\.js$', '/Libraries/Core/Timers/.+\\.js$', '/Libraries/WebSocket/.+\\.js$', '/Libraries/vendor/.+\\.js$', '/node_modules/react-devtools-core/.+\\.js$', '/node_modules/react-refresh/.+\\.js$', '/node_modules/scheduler/.+\\.js$', '/node_modules/event-target-shim/.+\\.js$', '/node_modules/invariant/.+\\.js$', '/node_modules/react-native/index.js$', '/metro-runtime/.+\\.js$', '^\\[native code\\]$'].join('|'));
/**
 * Default configuration
 */
const getDefaultConfig = ctx => {
  const outOfTreePlatforms = Object.keys(ctx.platforms).filter(platform => ctx.platforms[platform].npmPackageName);
  return {
    resolver: {
      resolveRequest: outOfTreePlatforms.length === 0 ? undefined : (0, _metroPlatformResolver.reactNativePlatformResolver)(outOfTreePlatforms.reduce((result, platform) => {
        result[platform] = ctx.platforms[platform].npmPackageName;
        return result;
      }, {})),
      resolverMainFields: ['react-native', 'browser', 'main'],
      platforms: [...Object.keys(ctx.platforms), 'native']
    },
    serializer: {
      // We can include multiple copies of InitializeCore here because metro will
      // only add ones that are already part of the bundle
      getModulesRunBeforeMainModule: () => [require.resolve(_path().default.join(ctx.reactNativePath, 'Libraries/Core/InitializeCore')), ...outOfTreePlatforms.map(platform => require.resolve(`${ctx.platforms[platform].npmPackageName}/Libraries/Core/InitializeCore`))],
      getPolyfills: () => require(_path().default.join(ctx.reactNativePath, 'rn-get-polyfills'))()
    },
    server: {
      port: Number(process.env.RCT_METRO_PORT) || 8081
    },
    symbolicator: {
      customizeFrame: frame => {
        const collapse = Boolean(frame.file && INTERNAL_CALLSITES_REGEX.test(frame.file));
        return {
          collapse
        };
      }
    },
    transformer: {
      allowOptionalDependencies: true,
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
      assetRegistryPath: 'react-native/Libraries/Image/AssetRegistry',
      asyncRequireModulePath: require.resolve('metro-runtime/src/modules/asyncRequire')
    },
    watchFolders: []
  };
};
exports.getDefaultConfig = getDefaultConfig;
/**
 * Loads Metro Config and applies `options` on top of the resolved config.
 *
 * This allows the CLI to always overwrite the file settings.
 */
function loadMetroConfig(ctx, options) {
  const defaultConfig = getDefaultConfig(ctx);
  if (options && options.reporter) {
    defaultConfig.reporter = options.reporter;
  }
  return (0, _metroConfig().loadConfig)({
    cwd: ctx.root,
    ...options
  }, defaultConfig);
}

//# sourceMappingURL=loadMetroConfig.js.map