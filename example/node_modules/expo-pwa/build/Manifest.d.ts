import { ExpoConfig } from '@expo/config';
import { IconOptions, Manifest, PWAConfig } from './Manifest.types';
export declare function getConfigForPWA(projectRoot: string): PWAConfig;
export declare function getSafariStartupImageConfig(config: ExpoConfig): IconOptions | null;
export declare function getSafariIconConfig(config: ExpoConfig): IconOptions | null;
export declare function getFaviconIconConfig(config: ExpoConfig): IconOptions | null;
export declare function getChromeIconConfig(config: ExpoConfig): IconOptions | null;
export declare function createPWAManifestFromWebConfig(config?: ExpoConfig['web']): Manifest;
