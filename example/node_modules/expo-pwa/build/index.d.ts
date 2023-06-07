import { ExpoConfig } from '@expo/config';
import { getConfigForPWA } from './Manifest';
import { HTMLOutput, IconOptions, Manifest, ProjectOptions } from './Manifest.types';
/**
 * Joins a url protocol + host to path segments, falls back to path.join
 * if result is not a valid url.
 */
export declare function joinUrlPath(publicPath: string, ...toJoin: string[]): string;
export declare function generateAsync(type: string, options: ProjectOptions, icon: IconOptions): Promise<HTMLOutput[]>;
export declare function generateSplashAsync({ projectRoot, publicPath }: ProjectOptions, icon: IconOptions): Promise<HTMLOutput[]>;
export declare function generateAppleIconAsync({ projectRoot, publicPath }: ProjectOptions, icon: IconOptions, { sizes }: {
    sizes?: number[];
}): Promise<HTMLOutput[]>;
export declare function generateChromeIconAsync({ projectRoot, publicPath }: ProjectOptions, icon: IconOptions, { sizes }: {
    sizes?: number[];
}): Promise<HTMLOutput[]>;
export declare function generateFaviconAsync({ projectRoot, publicPath }: ProjectOptions, icon: IconOptions): Promise<HTMLOutput[]>;
export declare function generateManifestAsync(options: ProjectOptions, configPath?: string, config?: ExpoConfig): Promise<HTMLOutput[]>;
export declare function generateManifestJson({ projectRoot }: Partial<ProjectOptions>, config?: ExpoConfig): Manifest;
export { getConfigForPWA };
export { getSafariStartupImageConfig, getSafariIconConfig, getFaviconIconConfig, getChromeIconConfig, } from './Manifest';
export { IconOptions, ProjectOptions, HTMLOutput, PWAConfig } from './Manifest.types';
