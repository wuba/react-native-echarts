import { RequestInit as FetchOptions, Request, Headers } from 'node-fetch';
/**
 * Downloads the given `url` to the OS's temp folder and
 * returns the path to it.
 */
declare const fetchToTemp: (url: string) => Promise<string>;
declare const fetch: (url: string | Request, options?: FetchOptions | undefined) => Promise<{
    status: number;
    data: any;
    headers: Headers;
}>;
export { fetch, fetchToTemp };
//# sourceMappingURL=fetch.d.ts.map