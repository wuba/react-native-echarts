"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
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
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
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
var _androidWinHelpers = require("../windows/androidWinHelpers");
var _downloadAndUnzip = require("../downloadAndUnzip");
var _environmentVariables = require("../windows/environmentVariables");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getBuildToolsVersion = () => {
  let projectRoot = '';
  try {
    // doctor is a detached command, so we may not be in a RN project.
    projectRoot = (0, _cliTools().findProjectRoot)();
  } catch {
    _cliTools().logger.log(); // for extra space
    _cliTools().logger.warn("We couldn't find a package.json in this directory. Android SDK checks may fail. Doctor works best in a React Native project root.");
  }
  const gradleBuildFilePath = _path().default.join(projectRoot, 'android/build.gradle');
  const buildToolsVersionEntry = 'buildToolsVersion';
  if (!_fs().default.existsSync(gradleBuildFilePath)) {
    return 'Not Found';
  }

  // Read the content of the `build.gradle` file
  const gradleBuildFile = _fs().default.readFileSync(gradleBuildFilePath, 'utf-8');
  const buildToolsVersionIndex = gradleBuildFile.indexOf(buildToolsVersionEntry);
  const buildToolsVersion = (gradleBuildFile
  // Get only the portion of the declaration of `buildToolsVersion`
  .substring(buildToolsVersionIndex).split('\n')[0]
  // Get only the the value of `buildToolsVersion`
  .match(/\d|\../g) || []).join('');
  return buildToolsVersion || 'Not Found';
};
const installMessage = `Read more about how to update Android SDK at ${_chalk().default.dim('https://developer.android.com/studio')}`;
const isSDKInstalled = environmentInfo => {
  const version = environmentInfo.SDKs['Android SDK'];
  return version !== 'Not Found';
};
var _default = {
  label: 'Android SDK',
  description: 'Required for building and installing your app on Android',
  getDiagnostics: async ({
    SDKs
  }) => {
    const requiredVersion = getBuildToolsVersion();
    const buildTools = typeof SDKs['Android SDK'] === 'string' ? SDKs['Android SDK'] : SDKs['Android SDK']['Build Tools'];
    const isAndroidSDKInstalled = Array.isArray(buildTools);
    const isRequiredVersionInstalled = isAndroidSDKInstalled ? buildTools.includes(requiredVersion) : false;
    return {
      versions: isAndroidSDKInstalled ? buildTools : SDKs['Android SDK'],
      versionRange: requiredVersion,
      needsToBeFixed: !isRequiredVersionInstalled
    };
  },
  win32AutomaticFix: async ({
    loader
  }) => {
    // Need a GitHub action to update automatically. See #1180
    const cliToolsUrl = 'https://dl.google.com/android/repository/commandlinetools-win-8512546_latest.zip';
    const systemImage = 'system-images;android-31;google_apis;x86_64';
    // Installing 29 as well so Android Studio does not complain on first boot
    const componentsToInstall = ['platform-tools', 'build-tools;31.0.0', 'platforms;android-31',
    // Is 28 still needed?
    'build-tools;28.0.3', 'platforms;android-28', 'emulator', systemImage, '--licenses' // Accept any pending licenses at the end
    ];

    const androidSDKRoot = (0, _androidWinHelpers.getAndroidSdkRootInstallation)();
    if (androidSDKRoot === '') {
      loader.fail('There was an error finding the Android SDK root');
      return;
    }
    await (0, _downloadAndUnzip.downloadAndUnzip)({
      loader,
      downloadUrl: cliToolsUrl,
      component: 'Android Command Line Tools',
      installPath: androidSDKRoot
    });
    for (const component of componentsToInstall) {
      loader.text = `Installing "${component}" (this may take a few minutes)`;
      try {
        await (0, _androidWinHelpers.installComponent)(component, androidSDKRoot);
      } catch (e) {
        // Is there a way to persist a line in loader and continue the execution?
      }
    }
    loader.text = 'Updating environment variables';

    // Required for the emulator to work from the CLI
    await (0, _environmentVariables.setEnvironment)('ANDROID_SDK_ROOT', androidSDKRoot);
    await (0, _environmentVariables.setEnvironment)('ANDROID_HOME', androidSDKRoot);
    await (0, _environmentVariables.updateEnvironment)('PATH', _path().default.join(androidSDKRoot, 'tools'));
    await (0, _environmentVariables.updateEnvironment)('PATH', _path().default.join(androidSDKRoot, 'platform-tools'));
    loader.text = 'Configuring Hypervisor for faster emulation, this might prompt UAC';
    const {
      hypervisor,
      installed
    } = await (0, _androidWinHelpers.getBestHypervisor)(androidSDKRoot);
    if (!installed) {
      if (hypervisor === 'none') {
        loader.warn('Android SDK configured but virtualization could not be enabled.');
        return;
      }
      if (hypervisor === 'AMDH') {
        await (0, _androidWinHelpers.enableAMDH)(androidSDKRoot);
      } else if (hypervisor === 'HAXM') {
        await (0, _androidWinHelpers.enableHAXM)(androidSDKRoot);
      } else if (hypervisor === 'WHPX') {
        await (0, _androidWinHelpers.enableWHPX)();
      }
    }
    loader.text = 'Creating AVD';
    await (0, _androidWinHelpers.createAVD)(androidSDKRoot, 'pixel_9.0', 'pixel', systemImage);
    loader.succeed('Android SDK configured. You might need to restart your PC for all changes to take effect.');
  },
  runAutomaticFix: async ({
    loader,
    logManualInstallation,
    environmentInfo
  }) => {
    loader.fail();
    if (isSDKInstalled(environmentInfo)) {
      return logManualInstallation({
        message: installMessage
      });
    }
    return logManualInstallation({
      healthcheck: 'Android SDK',
      url: 'https://reactnative.dev/docs/environment-setup'
    });
  }
};
exports.default = _default;

//# sourceMappingURL=androidSDK.js.map