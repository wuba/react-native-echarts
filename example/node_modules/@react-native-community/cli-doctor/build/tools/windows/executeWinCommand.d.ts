import execa from 'execa';
/**
 * Executes the given `command` on a shell taking care of slicing the parameters
 * if needed.
 */
declare const executeShellCommand: (command: string, elevated?: boolean) => execa.ExecaChildProcess;
export { executeShellCommand as executeCommand };
//# sourceMappingURL=executeWinCommand.d.ts.map