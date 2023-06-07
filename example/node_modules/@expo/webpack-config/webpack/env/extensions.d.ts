/**
 * Get the platform specific platform extensions in the format that Webpack expects (with a dot prefix).
 *
 * @param platforms supported platforms in order of priority. ex: ios, android, web, native, electron, etc...
 * @category env
 */
export declare function getModuleFileExtensions(...platforms: string[]): string[];
export declare function getNativeModuleFileExtensions(...platforms: string[]): string[];
