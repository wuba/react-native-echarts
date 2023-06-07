"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideWithPropertyOrConfig = exports.enableWithPropertyOrConfig = void 0;
function isObject(val) {
    if (val === null) {
        return false;
    }
    return typeof val === 'function' || typeof val === 'object';
}
/**
 * Given a config option that could evalutate to true, config, or null; return a config.
 * e.g.
 * `polyfill: true` returns the `config`
 * `polyfill: {}` returns `{}`
 *
 * @category utils
 */
function enableWithPropertyOrConfig(prop, config, merge = false) {
    // Value is truthy.
    if (prop) {
        if (isObject(prop)) {
            if (merge) {
                if (config == null || typeof config !== 'object') {
                    throw new Error('enableWithPropertyOrConfig cannot merge config: ' + config);
                }
                return {
                    ...config,
                    ...prop,
                };
            }
            // Return property
            return prop;
        }
        // Value is truthy but not a replacement config, thus return the default config.
        return config;
    }
    // Return falsey.
    return prop;
}
exports.enableWithPropertyOrConfig = enableWithPropertyOrConfig;
/**
 * Used for features that are enabled by default unless specified otherwise.
 *
 * @category utils
 */
function overrideWithPropertyOrConfig(prop, config, merge = false) {
    if (prop === undefined) {
        return config;
    }
    return enableWithPropertyOrConfig(prop, config, merge);
}
exports.overrideWithPropertyOrConfig = overrideWithPropertyOrConfig;
//# sourceMappingURL=config.js.map