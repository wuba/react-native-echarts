import { Server as WebSocketServer } from 'ws';
/**
 * Starts the eventsSocket at the given path
 *
 */
export default function createEventsSocketEndpoint(broadcast: (method: string, params?: Record<string, any>) => void): {
    server: WebSocketServer;
    reportEvent: (event: any) => void;
};
//# sourceMappingURL=createEventsSocketEndpoint.d.ts.map