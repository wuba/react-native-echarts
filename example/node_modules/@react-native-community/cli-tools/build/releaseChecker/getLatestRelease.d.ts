export declare type Release = {
    version: string;
    changelogUrl: string;
    diffUrl: string;
};
/**
 * Checks via GitHub API if there is a newer stable React Native release and,
 * if it exists, returns the release data.
 *
 * If the latest release is not newer or if it's a prerelease, the function
 * will return undefined.
 */
export default function getLatestRelease(name: string, currentVersion: string): Promise<Release | void>;
//# sourceMappingURL=getLatestRelease.d.ts.map