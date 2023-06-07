"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientEnvironment = void 0;
const getenv_1 = require("getenv");
const semver_1 = __importDefault(require("semver"));
const webpack_1 = __importDefault(require("webpack"));
const env_1 = require("../env");
const defaults_1 = require("../env/defaults");
const RESTRICTED_MANIFEST_FIELDS = [
    // Omit app.json properties that get removed during the native build
    'facebookScheme',
    'facebookAppId',
    'facebookDisplayName',
    // Remove iOS and Android.
    'ios',
    'android',
    // Hide internal / build values
    'plugins',
    'hooks',
    '_internal',
    // Remove metro-specific values
    'assetBundlePatterns',
];
function createEnvironmentConstants(appManifest) {
    var _a;
    const publicManifest = {
        ...appManifest,
        // @ts-ignore: displayName doesn't exist on ExpoConfig
        name: appManifest.displayName || appManifest.name,
        // Use the PWA `manifest.json` as the native web manifest.
        web: {
            // Pass through config properties that are not stored in the
            // PWA `manifest.json`, but still need to be accessible
            // through `Constants.manifest`.
            config: (_a = appManifest.web) === null || _a === void 0 ? void 0 : _a.config,
        },
    };
    for (const field of RESTRICTED_MANIFEST_FIELDS) {
        delete publicManifest[field];
    }
    return publicManifest;
}
/**
 * Create the global environment variables to surface in the project. Also creates the `__DEV__` boolean to provide better parity with Metro bundler.
 *
 * @param mode defines the Metro bundler `global.__DEV__` value.
 * @param publicPath passed as `process.env.PUBLIC_URL` to the app.
 * @param nativeAppManifest public values to be used in `expo-constants`.
 * @param platform native platform.
 * @internal
 */
function createClientEnvironment(mode, publicPath, nativeAppManifest, platform) {
    const environment = (0, env_1.getMode)({ mode });
    const __DEV__ = environment !== 'production';
    // Adding the env variables to the Expo manifest is unsafe.
    // This feature is deprecated in SDK 41 forward.
    const isEnvBindingSupported = lteSdkVersion(nativeAppManifest, '40.0.0');
    const ENV_VAR_REGEX = isEnvBindingSupported ? /^(EXPO_|REACT_NATIVE_|CI$)/i : /^(CI$)/i;
    const SECRET_REGEX = /(PASSWORD|SECRET|TOKEN)/i;
    const shouldDefineKeys = (0, getenv_1.boolish)('EXPO_WEBPACK_DEFINE_ENVIRONMENT_AS_KEYS', false);
    const prefix = shouldDefineKeys ? 'process.env.' : '';
    const processEnv = Object.keys(process.env)
        .filter(key => ENV_VAR_REGEX.test(key) && !SECRET_REGEX.test(key))
        .reduce((env, key) => {
        env[`${prefix}${key}`] = JSON.stringify(process.env[key]);
        return env;
    }, {
        /**
         * Useful for determining whether we’re running in production mode.
         * Most importantly, it switches React into the correct mode.
         */
        [`${prefix}NODE_ENV`]: JSON.stringify(environment),
        /**
         * Useful for resolving the correct path to static assets in `public`.
         * For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
         * This should only be used as an escape hatch. Normally you would put
         * images into the root folder and `import` them in code to get their paths.
         */
        [`${prefix}PUBLIC_URL`]: JSON.stringify(publicPath),
        /**
         * Surfaces the `app.json` (config) as an environment variable which is then parsed by
         * `expo-constants` https://docs.expo.dev/versions/latest/sdk/constants/
         */
        [`${prefix}APP_MANIFEST`]: JSON.stringify(nativeAppManifest),
        [`${prefix}EXPO_DEBUG`]: defaults_1.EXPO_DEBUG,
        [`${prefix}PLATFORM`]: JSON.stringify(platform),
        // [`${prefix}WDS_SOCKET_HOST`]: process.env.WDS_SOCKET_HOST,
        // [`${prefix}WDS_SOCKET_PORT`]: process.env.WDS_SOCKET_PORT,
        [`${prefix}WDS_SOCKET_PATH`]: defaults_1.sockPath ? JSON.stringify(defaults_1.sockPath) : undefined,
    });
    if (shouldDefineKeys) {
        return {
            ...processEnv,
            __DEV__,
        };
    }
    return {
        'process.env': processEnv,
        __DEV__,
    };
}
exports.createClientEnvironment = createClientEnvironment;
/**
 * Required for `expo-constants` https://docs.expo.dev/versions/latest/sdk/constants/.
 * This surfaces the `app.json` (config) as an environment variable which is then parsed by `expo-constants`.
 * @category plugins
 */
class DefinePlugin extends webpack_1.default.DefinePlugin {
    constructor({ mode, publicUrl, config, platform, }) {
        const publicAppManifest = createEnvironmentConstants(config);
        const environmentVariables = createClientEnvironment(mode, publicUrl, publicAppManifest, platform);
        super(environmentVariables);
    }
}
exports.default = DefinePlugin;
DefinePlugin.createClientEnvironment = createClientEnvironment;
DefinePlugin.fromEnv = (env) => {
    const mode = (0, env_1.getMode)(env);
    const { publicUrl } = (0, env_1.getPublicPaths)(env);
    const config = env.config || (0, env_1.getConfig)(env);
    return new DefinePlugin({
        mode,
        publicUrl,
        config,
        platform: env.platform,
    });
};
function lteSdkVersion(exp, sdkVersion) {
    if (!exp.sdkVersion) {
        return false;
    }
    if (exp.sdkVersion === 'UNVERSIONED') {
        return false;
    }
    try {
        return semver_1.default.lte(exp.sdkVersion, sdkVersion);
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=ExpoDefinePlugin.js.map