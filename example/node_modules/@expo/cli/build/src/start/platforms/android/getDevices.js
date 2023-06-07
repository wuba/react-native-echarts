"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDevicesAsync = getDevicesAsync;
var _errors = require("../../../utils/errors");
var _adb = require("./adb");
var _emulator = require("./emulator");
async function getDevicesAsync() {
    const bootedDevices = await (0, _adb).getAttachedDevicesAsync();
    const data = await (0, _emulator).listAvdsAsync();
    const connectedNames = bootedDevices.map(({ name  })=>name
    );
    const offlineEmulators = data.filter(({ name  })=>!connectedNames.includes(name)
    ).map(({ name , type  })=>{
        return {
            name,
            type,
            isBooted: false,
            // TODO: Are emulators always authorized?
            isAuthorized: true
        };
    });
    const allDevices = bootedDevices.concat(offlineEmulators);
    if (!allDevices.length) {
        throw new _errors.CommandError([
            `No Android connected device found, and no emulators could be started automatically.`,
            `Please connect a device or create an emulator (https://docs.expo.dev/workflow/android-studio-emulator).`,
            `Then follow the instructions here to enable USB debugging:`,
            `https://developer.android.com/studio/run/device.html#developer-device-options. If you are using Genymotion go to Settings -> ADB, select "Use custom Android SDK tools", and point it at your Android SDK directory.`, 
        ].join("\n"));
    }
    return allDevices;
}

//# sourceMappingURL=getDevices.js.map