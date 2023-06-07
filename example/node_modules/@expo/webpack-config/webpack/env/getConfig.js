"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expo_pwa_1 = require("expo-pwa");
/**
 * Get the Expo project config in a way that's optimized for web.
 *
 * @param env Environment properties used for getting the Expo project config.
 * @category env
 */
function getConfig(env) {
    if (env.config) {
        return env.config;
    }
    // Fill all config values with PWA defaults
    return (0, expo_pwa_1.getConfigForPWA)(env.projectRoot);
}
exports.default = getConfig;
//# sourceMappingURL=getConfig.js.map