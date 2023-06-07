/// <reference types="execa" />
declare type HypervisorStatus = {
    hypervisor: 'WHPX' | 'HAXM' | 'AMDH' | 'none';
    installed: boolean;
};
/**
 * Returns the path to where all Android related things should be installed
 * locally to the user.
 */
export declare const getUserAndroidPath: () => string;
/**
 * Deals with ANDROID_HOME, ANDROID_SDK_ROOT or generates a new one
 */
export declare const getAndroidSdkRootInstallation: () => string;
/**
 * Installs an Android component (e.g.: `platform-tools`, `emulator`)
 * using the `sdkmanager` tool and automatically accepting the licenses.
 */
export declare const installComponent: (component: string, androidSdkRoot: string) => Promise<unknown>;
/**
 * Creates a new Android Virtual Device in the default folder with the
 * name, device and system image passed by parameter.
 */
export declare const createAVD: (androidSDKRoot: string, name: string, device: string, image: string) => Promise<any>;
/**
 * Returns what hypervisor should be installed for the Android emulator
 * using [Microsoft's official
 * documentation](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-emulator/hardware-acceleration?pivots=windows)
 * as a reference.
 */
export declare const getBestHypervisor: (androidSDKRoot: string) => Promise<HypervisorStatus>;
/**
 * Enables the Windows HypervisorPlatform and Hyper-V features.
 * Will prompt the User Account Control (UAC)
 */
export declare const enableWHPX: () => import("execa").ExecaChildProcess;
/**
 * Installs and enables the [HAXM](https://github.com/intel/haxm)
 * version available through the Android SDK manager.
 * @param androidSdkInstallPath The path to the Android SDK installation
 */
export declare const enableHAXM: (androidSdkInstallPath: string) => Promise<void>;
/**
 * Installs and enables the
 * [Hypervisor Driver for AMD Processors](https://androidstudio.googleblog.com/2019/10/android-emulator-hypervisor-driver-for.html)
 * version available through the Android SDK manager.
 * @param androidSdkInstallPath The path to the Android SDK installation
 */
export declare const enableAMDH: (androidSdkInstallPath: string) => Promise<void>;
export {};
//# sourceMappingURL=androidWinHelpers.d.ts.map