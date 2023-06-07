/// <reference types="ws" />
import devToolsMiddleware from './devToolsMiddleware';
import indexPageMiddleware from './indexPageMiddleware';
import openStackFrameInEditorMiddleware from './openStackFrameInEditorMiddleware';
import openURLMiddleware from './openURLMiddleware';
import rawBodyMiddleware from './rawBodyMiddleware';
import securityHeadersMiddleware from './securityHeadersMiddleware';
import statusPageMiddleware from './statusPageMiddleware';
import systraceProfileMiddleware from './systraceProfileMiddleware';
export { devToolsMiddleware };
export { indexPageMiddleware };
export { openStackFrameInEditorMiddleware };
export { openURLMiddleware };
export { rawBodyMiddleware };
export { securityHeadersMiddleware };
export { statusPageMiddleware };
export { systraceProfileMiddleware };
declare type MiddlewareOptions = {
    host?: string;
    watchFolders: ReadonlyArray<string>;
    port: number;
};
export declare function createDevServerMiddleware(options: MiddlewareOptions): {
    websocketEndpoints: {
        '/debugger-proxy': import("ws").Server;
        '/message': import("ws").Server;
        '/events': import("ws").Server;
    };
    debuggerProxyEndpoint: {
        server: import("ws").Server;
        isDebuggerConnected: () => boolean;
    };
    messageSocketEndpoint: {
        server: import("ws").Server;
        broadcast: (method: string, params?: Record<string, any> | undefined) => void;
    };
    eventsSocketEndpoint: {
        server: import("ws").Server;
        reportEvent: (event: any) => void;
    };
    middleware: any;
};
//# sourceMappingURL=index.d.ts.map