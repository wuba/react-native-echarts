import { IncomingMessage, ServerResponse } from "http";

declare const nocache: () => (
  _req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) => void;

export = nocache;
