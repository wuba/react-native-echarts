"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEntitlementsPlugin = createEntitlementsPlugin;
exports.createInfoPlistPlugin = createInfoPlistPlugin;
exports.withXcodeProject = exports.withPodfileProperties = exports.withInfoPlist = exports.withExpoPlist = exports.withEntitlementsPlist = exports.withAppDelegate = void 0;

function _withMod() {
  const data = require("./withMod");

  _withMod = function () {
    return data;
  };

  return data;
}

/**
 * Helper method for creating mods from existing config functions.
 *
 * @param action
 */
function createInfoPlistPlugin(action, name) {
  const withUnknown = config => withInfoPlist(config, async config => {
    config.modResults = await action(config, config.modResults);
    return config;
  });

  if (name) {
    Object.defineProperty(withUnknown, 'name', {
      value: name
    });
  }

  return withUnknown;
}

/**
 * Helper method for creating mods from existing config functions.
 *
 * @param action
 */
function createEntitlementsPlugin(action, name) {
  const withUnknown = config => withEntitlementsPlist(config, async config => {
    config.modResults = await action(config, config.modResults);
    return config;
  });

  if (name) {
    Object.defineProperty(withUnknown, 'name', {
      value: name
    });
  }

  return withUnknown;
}
/**
 * Provides the AppDelegate file for modification.
 *
 * @param config
 * @param action
 */


const withAppDelegate = (config, action) => {
  return (0, _withMod().withMod)(config, {
    platform: 'ios',
    mod: 'appDelegate',
    action
  });
};
/**
 * Provides the Info.plist file for modification.
 * Keeps the config's expo.ios.infoPlist object in sync with the data.
 *
 * @param config
 * @param action
 */


exports.withAppDelegate = withAppDelegate;

const withInfoPlist = (config, action) => {
  return (0, _withMod().withMod)(config, {
    platform: 'ios',
    mod: 'infoPlist',

    async action(config) {
      config = await action(config);

      if (!config.ios) {
        config.ios = {};
      }

      config.ios.infoPlist = config.modResults;
      return config;
    }

  });
};
/**
 * Provides the main .entitlements file for modification.
 * Keeps the config's expo.ios.entitlements object in sync with the data.
 *
 * @param config
 * @param action
 */


exports.withInfoPlist = withInfoPlist;

const withEntitlementsPlist = (config, action) => {
  return (0, _withMod().withMod)(config, {
    platform: 'ios',
    mod: 'entitlements',

    async action(config) {
      config = await action(config);

      if (!config.ios) {
        config.ios = {};
      }

      config.ios.entitlements = config.modResults;
      return config;
    }

  });
};
/**
 * Provides the Expo.plist for modification.
 *
 * @param config
 * @param action
 */


exports.withEntitlementsPlist = withEntitlementsPlist;

const withExpoPlist = (config, action) => {
  return (0, _withMod().withMod)(config, {
    platform: 'ios',
    mod: 'expoPlist',
    action
  });
};
/**
 * Provides the main .xcodeproj for modification.
 *
 * @param config
 * @param action
 */


exports.withExpoPlist = withExpoPlist;

const withXcodeProject = (config, action) => {
  return (0, _withMod().withMod)(config, {
    platform: 'ios',
    mod: 'xcodeproj',
    action
  });
};
/**
 * Provides the Podfile.properties.json for modification.
 *
 * @param config
 * @param action
 */


exports.withXcodeProject = withXcodeProject;

const withPodfileProperties = (config, action) => {
  return (0, _withMod().withMod)(config, {
    platform: 'ios',
    mod: 'podfileProperties',
    action
  });
};

exports.withPodfileProperties = withPodfileProperties;
//# sourceMappingURL=ios-plugins.js.map