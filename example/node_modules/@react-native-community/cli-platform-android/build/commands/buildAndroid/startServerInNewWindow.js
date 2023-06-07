"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServerInNewWindow = startServerInNewWindow;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
    return data;
  };
  return data;
}
function _execa() {
  const data = _interopRequireDefault(require("execa"));
  _execa = function () {
    return data;
  };
  return data;
}
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function startServerInNewWindow(port, terminal, reactNativePath) {
  /**
   * Set up OS-specific filenames and commands
   */
  const isWindows = /^win/.test(process.platform);
  const scriptFile = isWindows ? 'launchPackager.bat' : 'launchPackager.command';
  const packagerEnvFilename = isWindows ? '.packager.bat' : '.packager.env';
  const portExportContent = isWindows ? `set RCT_METRO_PORT=${port}` : `export RCT_METRO_PORT=${port}`;

  /**
   * Set up the `.packager.(env|bat)` file to ensure the packager starts on the right port.
   */
  const launchPackagerScript = _path().default.join(reactNativePath, `scripts/${scriptFile}`);

  /**
   * Set up the `launchpackager.(command|bat)` file.
   * It lives next to `.packager.(bat|env)`
   */
  const scriptsDir = _path().default.dirname(launchPackagerScript);
  const packagerEnvFile = _path().default.join(scriptsDir, packagerEnvFilename);
  const procConfig = {
    cwd: scriptsDir
  };

  /**
   * Ensure we overwrite file by passing the `w` flag
   */
  _fs().default.writeFileSync(packagerEnvFile, portExportContent, {
    encoding: 'utf8',
    flag: 'w'
  });
  if (process.platform === 'darwin') {
    try {
      return _execa().default.sync('open', ['-a', terminal, launchPackagerScript], procConfig);
    } catch (error) {
      return _execa().default.sync('open', [launchPackagerScript], procConfig);
    }
  }
  if (process.platform === 'linux') {
    try {
      return _execa().default.sync(terminal, ['-e', `sh ${launchPackagerScript}`], {
        ...procConfig,
        detached: true
      });
    } catch (error) {
      // By default, the child shell process will be attached to the parent
      return _execa().default.sync('sh', [launchPackagerScript], procConfig);
    }
  }
  if (/^win/.test(process.platform)) {
    // Awaiting this causes the CLI to hang indefinitely, so this must execute without await.
    return (0, _execa().default)('cmd.exe', ['/C', launchPackagerScript], {
      ...procConfig,
      detached: true,
      stdio: 'ignore'
    });
  }
  _cliTools().logger.error(`Cannot start the packager. Unknown platform ${process.platform}`);
  return;
}

//# sourceMappingURL=startServerInNewWindow.js.map