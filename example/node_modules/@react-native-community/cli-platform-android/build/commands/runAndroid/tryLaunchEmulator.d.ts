export declare const getEmulators: () => string[];
export default function tryLaunchEmulator(adbPath: string, emulatorName?: string, port?: number): Promise<{
    success: boolean;
    error?: string;
}>;
//# sourceMappingURL=tryLaunchEmulator.d.ts.map