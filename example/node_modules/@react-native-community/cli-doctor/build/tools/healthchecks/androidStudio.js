"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _path() {
  const data = require("path");
  _path = function () {
    return data;
  };
  return data;
}
var _downloadAndUnzip = require("../downloadAndUnzip");
var _executeWinCommand = require("../windows/executeWinCommand");
var _androidWinHelpers = require("../windows/androidWinHelpers");
var _createShortcut = require("../windows/create-shortcut");
var _default = {
  label: 'Android Studio',
  description: 'Required for building and installing your app on Android',
  getDiagnostics: async ({
    IDEs
  }) => {
    const needsToBeFixed = IDEs['Android Studio'] === 'Not Found';
    const missing = {
      needsToBeFixed,
      version: IDEs['Android Studio']
    };

    // On Windows `doctor` installs Android Studio locally in a well-known place
    if (needsToBeFixed && process.platform === 'win32') {
      const androidStudioPath = (0, _path().join)((0, _androidWinHelpers.getUserAndroidPath)(), 'android-studio', 'bin', 'studio.exe').replace(/\\/g, '\\\\');
      const {
        stdout
      } = await (0, _executeWinCommand.executeCommand)(`wmic datafile where name="${androidStudioPath}" get Version`);
      const version = stdout.replace(/(\r\n|\n|\r)/gm, '').trim();
      if (version === '') {
        return missing;
      }
      return {
        needsToBeFixed: false,
        version
      };
    }
    return missing;
  },
  win32AutomaticFix: async ({
    loader
  }) => {
    // Need a GitHub action to update automatically. See #1180
    const androidStudioUrl = 'https://redirector.gvt1.com/edgedl/android/studio/ide-zips/3.6.3.0/android-studio-ide-192.6392135-windows.zip';
    const installPath = (0, _androidWinHelpers.getUserAndroidPath)();
    await (0, _downloadAndUnzip.downloadAndUnzip)({
      loader,
      downloadUrl: androidStudioUrl,
      component: 'Android Studio',
      installPath: installPath
    });
    const prefix = process.arch === 'x64' ? '64' : '';
    const binFolder = (0, _path().join)(installPath, 'android-studio', 'bin');
    await (0, _createShortcut.createShortcut)({
      path: (0, _path().join)(binFolder, `studio${prefix}.exe`),
      name: 'Android Studio',
      ico: (0, _path().join)(binFolder, 'studio.ico')
    });
    loader.succeed(`Android Studio installed successfully in "${installPath}".`);
  },
  runAutomaticFix: async ({
    loader,
    logManualInstallation
  }) => {
    loader.fail();
    return logManualInstallation({
      healthcheck: 'Android Studio',
      url: 'https://reactnative.dev/docs/environment-setup'
    });
  }
};
exports.default = _default;

//# sourceMappingURL=androidStudio.js.map