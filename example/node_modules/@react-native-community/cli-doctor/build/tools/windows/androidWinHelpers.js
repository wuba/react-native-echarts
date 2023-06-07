"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installComponent = exports.getUserAndroidPath = exports.getBestHypervisor = exports.getAndroidSdkRootInstallation = exports.enableWHPX = exports.enableHAXM = exports.enableAMDH = exports.createAVD = void 0;
function _fsExtra() {
  const data = require("fs-extra");
  _fsExtra = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = require("path");
  _path = function () {
    return data;
  };
  return data;
}
var _executeWinCommand = require("./executeWinCommand");
var _processorType = require("./processorType");
/**
 * Returns the path to where all Android related things should be installed
 * locally to the user.
 */
const getUserAndroidPath = () => {
  return (0, _path().join)(process.env.LOCALAPPDATA || '', 'Android');
};

/**
 * Deals with ANDROID_HOME, ANDROID_SDK_ROOT or generates a new one
 */
exports.getUserAndroidPath = getUserAndroidPath;
const getAndroidSdkRootInstallation = () => {
  const env = process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME;
  const installPath = env ?
  // Happens if previous installations or not fully completed
  env :
  // All Android zip files have a root folder, using `Android` as the common place
  (0, _path().join)(getUserAndroidPath(), 'Sdk');
  if ((0, _fsExtra().pathExistsSync)(installPath)) {
    return installPath;
  } else {
    return '';
  }
};

/**
 * Installs an Android component (e.g.: `platform-tools`, `emulator`)
 * using the `sdkmanager` tool and automatically accepting the licenses.
 */
exports.getAndroidSdkRootInstallation = getAndroidSdkRootInstallation;
const installComponent = (component, androidSdkRoot) => {
  return new Promise((done, error) => {
    var _child$stdout, _child$stderr;
    const sdkmanager = (0, _path().join)(androidSdkRoot, 'tools', 'bin', 'sdkmanager.bat');
    const command = `"${sdkmanager}" --sdk_root="${androidSdkRoot}" "${component}"`;
    const child = (0, _executeWinCommand.executeCommand)(command);
    let stderr = '';
    (_child$stdout = child.stdout) === null || _child$stdout === void 0 ? void 0 : _child$stdout.on('data', data => {
      if (data.includes('(y/N)')) {
        var _child$stdin;
        (_child$stdin = child.stdin) === null || _child$stdin === void 0 ? void 0 : _child$stdin.write('y\n');
      }
    });
    (_child$stderr = child.stderr) === null || _child$stderr === void 0 ? void 0 : _child$stderr.on('data', data => {
      stderr += data.toString('utf-8');
    });
    child.on('close', exitStatus => {
      if (exitStatus === 0) {
        done();
      } else {
        error({
          stderr
        });
      }
    });
    child.on('error', error);
  });
};

/**
 * For the given custom Hypervisor and the output of `emulator-check accel`
 * returns the preferred Hypervisor to use and its installation status.
 * The recommendation order is:
 * 1. WHPX
 * 2. HAXM if Intel
 * 3. AMDH if AMD
 */
exports.installComponent = installComponent;
const parseHypervisor = (status, customHypervisor) => {
  /**
   * Messages:
   * Android Emulator requires an Intel processor with VT-x and NX support.  Your CPU: 'AuthenticAMD'
   * HAXM is not installed, but Windows Hypervisor Platform is available.
   * WHPX (10.0.19041) is installed and usable.
   * * This message outputs for WHPX and when the AMD Hypervisor is installed
   * HAXM version 6.2.1 (4) is installed and usable.
   * HAXM is not installed on this machine
   */

  if (status.includes('is not installed, but Windows Hypervisor Platform is available.')) {
    return {
      hypervisor: 'WHPX',
      installed: false
    };
  }
  if (/WHPX \((\d|\.)+\) is installed and usable\./.test(status)) {
    return {
      hypervisor: 'WHPX',
      installed: true
    };
  }
  if (/is installed and usable\./.test(status)) {
    return {
      hypervisor: customHypervisor,
      installed: true
    };
  }
  if (status.includes("Your CPU: 'AuthenticAMD'")) {
    return {
      hypervisor: customHypervisor,
      installed: false
    };
  }
  if (status.includes('is not installed on this machine')) {
    return {
      hypervisor: 'none',
      installed: false
    };
  }
  return null;
};
const getEmulatorAccelOutputInformation = async androidSDKRoot => {
  /**
   * The output of the following command is something like:
   *
   * ```
   * accel:
   * 0
   * WHPX (10.0.19041) is installed and usable.
   * accel
   * ```
   *
   * If it fails it will still output to stdout with a similar format:
   *
   * ```
   * accel:
   * 1
   * Android Emulator does not support nested virtualization.  Your VM host: 'Microsoft Hv' (Hyper-V)
   * accel
   * ```
   *
   */

  try {
    const {
      stdout
    } = await (0, _executeWinCommand.executeCommand)(`"${(0, _path().join)(androidSDKRoot, 'emulator', 'emulator-check.exe')}" accel`);
    return stdout;
  } catch (e) {
    const {
      stdout
    } = e;
    return stdout;
  }
};

/**
 * Creates a new Android Virtual Device in the default folder with the
 * name, device and system image passed by parameter.
 */
const createAVD = async (androidSDKRoot, name, device, image) => {
  try {
    const abi = image.includes('x86_64') ? 'x86_64' : 'x86';
    const tag = image.includes('google_apis') ? 'google_apis' : 'generic';
    const avdmanager = (0, _path().join)(androidSDKRoot, 'tools', 'bin', 'avdmanager.bat');
    const {
      stdout
    } = await (0, _executeWinCommand.executeCommand)(`${avdmanager} -s create avd --force --name "${name}" --device "${device}" --package "${image}" --tag "${tag}" --abi "${abi}"`);

    // For some reason `image.sysdir.1` in `config.ini` points to the wrong location and needs to be updated
    const configPath = (0, _path().join)(process.env.HOMEPATH || '', '.android', 'avd', `${name}.avd`, 'config.ini');
    const content = await (0, _fsExtra().readFile)(configPath, 'utf-8');
    const updatedContent = content.replace(/Sdk\\system-images/g, 'system-images');
    await (0, _fsExtra().writeFile)(configPath, updatedContent, 'utf-8');
    return stdout;
  } catch (e) {
    const {
      stderr
    } = e;
    return stderr;
  }
};

/**
 * Returns what hypervisor should be installed for the Android emulator
 * using [Microsoft's official
 * documentation](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-emulator/hardware-acceleration?pivots=windows)
 * as a reference.
 */
exports.createAVD = createAVD;
const getBestHypervisor = async androidSDKRoot => {
  const customHypervisor = (0, _processorType.getProcessorType)() === 'Intel' ? 'HAXM' : 'AMDH';
  const stdout = await getEmulatorAccelOutputInformation(androidSDKRoot);
  const lines = stdout.split('\n');
  for (const line of lines) {
    const hypervisor = parseHypervisor(line, customHypervisor);
    if (hypervisor) {
      return hypervisor;
    }
  }

  // Couldn't identify the best one to run so not doing anything
  return {
    hypervisor: 'none',
    installed: false
  };
};

/**
 * Enables the Windows HypervisorPlatform and Hyper-V features.
 * Will prompt the User Account Control (UAC)
 */
exports.getBestHypervisor = getBestHypervisor;
const enableWHPX = () => {
  return (0, _executeWinCommand.executeCommand)('DISM /Quiet /NoRestart /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V /FeatureName:HypervisorPlatform', true);
};

/**
 * Installs and enables the [HAXM](https://github.com/intel/haxm)
 * version available through the Android SDK manager.
 * @param androidSdkInstallPath The path to the Android SDK installation
 */
exports.enableWHPX = enableWHPX;
const enableHAXM = async androidSdkInstallPath => {
  await installComponent('extras;intel;Hardware_Accelerated_Execution_Manager', androidSdkInstallPath);
  await (0, _executeWinCommand.executeCommand)((0, _path().join)(androidSdkInstallPath, 'Sdk', 'extras', 'intel', 'Hardware_Accelerated_Execution_Manager', 'silent_install.bat'));
};

/**
 * Installs and enables the
 * [Hypervisor Driver for AMD Processors](https://androidstudio.googleblog.com/2019/10/android-emulator-hypervisor-driver-for.html)
 * version available through the Android SDK manager.
 * @param androidSdkInstallPath The path to the Android SDK installation
 */
exports.enableHAXM = enableHAXM;
const enableAMDH = async androidSdkInstallPath => {
  await installComponent('extras;google;Android_Emulator_Hypervisor_Driver', androidSdkInstallPath);
  await (0, _executeWinCommand.executeCommand)((0, _path().join)(androidSdkInstallPath, 'Sdk', 'extras', 'google', 'Android_Emulator_Hypervisor_Driver', 'silent_install.bat'));
};
exports.enableAMDH = enableAMDH;

//# sourceMappingURL=androidWinHelpers.js.map