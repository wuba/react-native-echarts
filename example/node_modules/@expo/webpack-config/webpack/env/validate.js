"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._resetWarnings = exports.warnEnvironmentDeprecation = exports.validateEnvironment = void 0;
const chalk_1 = __importDefault(require("chalk"));
const getConfig_1 = __importDefault(require("./getConfig"));
const paths_1 = require("./paths");
/**
 * Validate the environment options and apply default values.
 *
 * @param env
 * @category env
 */
function validateEnvironment(env) {
    if (typeof env.projectRoot !== 'string') {
        throw new Error(`@expo/webpack-config requires a valid projectRoot string value which points to the root of your project`);
    }
    warnEnvironmentDeprecation(env, true);
    const validModes = ['development', 'production', 'none'];
    if (!env.mode || !validModes.includes(env.mode)) {
        throw new Error(`@expo/webpack-config requires a valid \`mode\` string which should be one of: ${validModes.join(', ')}`);
    }
    // Default to web. Allow any arbitrary platform.
    if (typeof env.platform === 'undefined') {
        env.platform = 'web';
    }
    // No https by default since it doesn't work well across different browsers and devices.
    if (typeof env.https === 'undefined') {
        env.https = false;
    }
    // Ensure the locations are defined.
    if (!env.locations) {
        env.locations = (0, paths_1.getPaths)(env.projectRoot, env);
    }
    // Ensure the config is evaluated.
    if (!env.config) {
        env.config = (0, getConfig_1.default)(env);
    }
    return env;
}
exports.validateEnvironment = validateEnvironment;
let warned = {};
function shouldWarnDeprecated(config, key, warnOnce) {
    return (!warnOnce || !(key in warned)) && typeof config[key] !== 'undefined';
}
/**
 *
 * @param env
 * @param warnOnce
 * @category env
 * @internal
 */
function warnEnvironmentDeprecation(env, warnOnce = false) {
    const warnings = {
        production: 'Please use `mode: "production"` instead.',
        development: 'Please use `mode: "development"` instead.',
        polyfill: 'Please include polyfills manually in your project.',
    };
    for (const warning of Object.keys(warnings)) {
        if (shouldWarnDeprecated(env, warning, warnOnce)) {
            warned[warning] = true;
            console.warn(chalk_1.default.bgYellow.black(`The environment property \`${warning}\` is deprecated. ${warnings[warning]}`.trim()));
        }
    }
}
exports.warnEnvironmentDeprecation = warnEnvironmentDeprecation;
/**
 * Used for testing
 * @category env
 * @internal
 */
function _resetWarnings() {
    warned = {};
}
exports._resetWarnings = _resetWarnings;
//# sourceMappingURL=validate.js.map