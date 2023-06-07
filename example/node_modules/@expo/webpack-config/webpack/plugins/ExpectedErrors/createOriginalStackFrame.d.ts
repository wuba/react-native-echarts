/**
 * Copyright © 2021 650 Industries.
 * Copyright © 2021 Vercel, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/vercel/next.js/blob/1552b8341e5b512a2827485a4a9689cd429c520e/packages/react-dev-overlay/src/middleware.ts#L63-L178
 */
import { StackFrame } from 'stacktrace-parser';
export declare type OriginalStackFrameResponse = {
    originalStackFrame: StackFrame;
    originalCodeFrame: string | null;
};
export declare function createOriginalStackFrame({ line, column, source, modulePath, rootDirectory, frame, frameNodeModules, }: {
    line: number;
    column: number | null;
    source: any;
    modulePath?: string;
    rootDirectory: string;
    frameNodeModules?: boolean;
    frame: any;
}): Promise<OriginalStackFrameResponse | null>;
