declare type DeviceData = {
    deviceId: string | undefined;
    readableName: string;
    connected: boolean;
    type: 'emulator' | 'phone';
};
declare function listAndroidDevices(): Promise<DeviceData | undefined>;
export default listAndroidDevices;
//# sourceMappingURL=listAndroidDevices.d.ts.map