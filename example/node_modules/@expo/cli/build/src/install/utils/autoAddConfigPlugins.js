"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNamedPlugins = getNamedPlugins;
exports.autoAddConfigPluginsAsync = autoAddConfigPluginsAsync;
var _pluginResolver = require("@expo/config-plugins/build/utils/plugin-resolver");
var _prebuildConfig = require("@expo/prebuild-config");
var _modifyConfigPlugins = require("../../utils/modifyConfigPlugins");
const debug = require("debug")("expo:install:config-plugins");
const AUTO_PLUGINS = (0, _prebuildConfig).getAutoPlugins();
/**
 * Resolve if a package has a config plugin.
 * For sanity, we'll only support config plugins that use the `app.config.js` entry file,
 * this is because a package like `lodash` could be a "valid" config plugin and break the prebuild process.
 *
 * @param projectRoot
 * @param packageName
 * @returns
 */ function packageHasConfigPlugin(projectRoot, packageName) {
    try {
        const info = (0, _pluginResolver).resolveConfigPluginFunctionWithInfo(projectRoot, packageName);
        if (info.isPluginFile) {
            return info.plugin;
        }
    } catch  {}
    return false;
}
function getNamedPlugins(plugins) {
    const namedPlugins = [];
    for (const plugin of plugins){
        try {
            // @ts-ignore
            const [normal] = (0, _pluginResolver).normalizeStaticPlugin(plugin);
            if (typeof normal === "string") {
                namedPlugins.push(normal);
            }
        } catch  {
        // ignore assertions
        }
    }
    return namedPlugins;
}
async function autoAddConfigPluginsAsync(projectRoot, exp, packages) {
    debug("Checking config plugins...");
    const currentPlugins = exp.plugins || [];
    const normalized = getNamedPlugins(currentPlugins);
    debug(`Existing plugins: ${normalized.join(", ")}`);
    const plugins = packages.filter((pkg)=>{
        if (normalized.includes(pkg)) {
            // already included in plugins array
            return false;
        }
        // Check if the package has a valid plugin. Must be a well-made plugin for it to work with this.
        const plugin = packageHasConfigPlugin(projectRoot, pkg);
        debug(`Package "${pkg}" has plugin: ${!!plugin}` + (plugin ? ` (args: ${plugin.length})` : ""));
        if (AUTO_PLUGINS.includes(pkg)) {
            debug(`Package "${pkg}" is an auto plugin, skipping...`);
            return false;
        }
        return !!plugin;
    });
    await (0, _modifyConfigPlugins).attemptAddingPluginsAsync(projectRoot, exp, plugins);
}

//# sourceMappingURL=autoAddConfigPlugins.js.map