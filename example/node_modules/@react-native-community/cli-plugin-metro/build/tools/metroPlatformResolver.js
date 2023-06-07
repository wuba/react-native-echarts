"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactNativePlatformResolver = reactNativePlatformResolver;
/**
 * This is an implementation of a metro resolveRequest option which will remap react-native imports
 * to different npm packages based on the platform requested.  This allows a single metro instance/config
 * to produce bundles for multiple out of tree platforms at a time.
 *
 * @param platformImplementations
 * A map of platform to npm package that implements that platform
 *
 * Ex:
 * {
 *    windows: 'react-native-windows'
 *    macos: 'react-native-macos'
 * }
 */

function reactNativePlatformResolver(platformImplementations) {
  return (context, moduleName, platform) => {
    let modifiedModuleName = moduleName;
    if (platformImplementations[platform]) {
      if (moduleName === 'react-native') {
        modifiedModuleName = platformImplementations[platform];
      } else if (moduleName.startsWith('react-native/')) {
        modifiedModuleName = `${platformImplementations[platform]}/${modifiedModuleName.slice('react-native/'.length)}`;
      }
    }
    return context.resolveRequest(context, modifiedModuleName, platform);
  };
}

//# sourceMappingURL=metroPlatformResolver.js.map