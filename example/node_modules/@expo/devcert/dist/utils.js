"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const tmp_1 = tslib_1.__importDefault(require("tmp"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const path_1 = tslib_1.__importDefault(require("path"));
const sudo_prompt_1 = tslib_1.__importDefault(require("sudo-prompt"));
const constants_1 = require("./constants");
const debug = debug_1.default('devcert:util');
function openssl(args) {
    return run('openssl', args, {
        stdio: 'pipe',
        env: Object.assign({
            RANDFILE: path_1.default.join(constants_1.configPath('.rnd'))
        }, process.env)
    });
}
exports.openssl = openssl;
function run(cmd, args, options = {}) {
    debug(`execFileSync: \`${cmd} ${args.join(' ')}\``);
    return child_process_1.execFileSync(cmd, args, options);
}
exports.run = run;
function sudoAppend(file, input) {
    run('sudo', ['tee', '-a', file], {
        input
    });
}
exports.sudoAppend = sudoAppend;
function waitForUser() {
    return new Promise((resolve) => {
        process.stdin.resume();
        process.stdin.on('data', resolve);
    });
}
exports.waitForUser = waitForUser;
function reportableError(message) {
    return new Error(`${message} | This is a bug in devcert, please report the issue at https://github.com/davewasmer/devcert/issues`);
}
exports.reportableError = reportableError;
function mktmp() {
    // discardDescriptor because windows complains the file is in use if we create a tmp file
    // and then shell out to a process that tries to use it
    return tmp_1.default.fileSync({ discardDescriptor: true }).name;
}
exports.mktmp = mktmp;
function sudo(cmd) {
    return new Promise((resolve, reject) => {
        sudo_prompt_1.default.exec(cmd, { name: 'devcert' }, (err, stdout, stderr) => {
            let error = err || (typeof stderr === 'string' && stderr.trim().length > 0 && new Error(stderr));
            error ? reject(error) : resolve(stdout);
        });
    });
}
exports.sudo = sudo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2V2YW5iYWNvbi9Eb2N1bWVudHMvR2l0SHViL2RldmNlcnQvIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBa0U7QUFDbEUsc0RBQXNCO0FBQ3RCLDBEQUFnQztBQUNoQyx3REFBd0I7QUFDeEIsc0VBQXFDO0FBRXJDLDJDQUF5QztBQUV6QyxNQUFNLEtBQUssR0FBRyxlQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFMUMsaUJBQXdCLElBQWM7SUFDcEMsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRTtRQUMxQixLQUFLLEVBQUUsTUFBTTtRQUNiLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2pCLFFBQVEsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFQRCwwQkFPQztBQUVELGFBQW9CLEdBQVcsRUFBRSxJQUFjLEVBQUUsVUFBK0IsRUFBRTtJQUNoRixLQUFLLENBQUMsbUJBQW9CLEdBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxPQUFPLDRCQUFZLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBSEQsa0JBR0M7QUFFRCxvQkFBMkIsSUFBWSxFQUFFLEtBQW1DO0lBQzFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQy9CLEtBQUs7S0FDTixDQUFDLENBQUM7QUFDTCxDQUFDO0FBSkQsZ0NBSUM7QUFFRDtJQUNFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFMRCxrQ0FLQztBQUVELHlCQUFnQyxPQUFlO0lBQzdDLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxPQUFPLHNHQUFzRyxDQUFDLENBQUM7QUFDckksQ0FBQztBQUZELDBDQUVDO0FBRUQ7SUFDRSx5RkFBeUY7SUFDekYsdURBQXVEO0lBQ3ZELE9BQU8sYUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3hELENBQUM7QUFKRCxzQkFJQztBQUVELGNBQXFCLEdBQVc7SUFDOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxxQkFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxHQUFpQixFQUFFLE1BQXFCLEVBQUUsTUFBcUIsRUFBRSxFQUFFO1lBQzVHLElBQUksS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFO1lBQ2xHLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFQRCxvQkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWNGaWxlU3luYywgRXhlY0ZpbGVTeW5jT3B0aW9ucyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHRtcCBmcm9tICd0bXAnO1xuaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHN1ZG9Qcm9tcHQgZnJvbSAnc3Vkby1wcm9tcHQnO1xuXG5pbXBvcnQgeyBjb25maWdQYXRoIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5jb25zdCBkZWJ1ZyA9IGNyZWF0ZURlYnVnKCdkZXZjZXJ0OnV0aWwnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5zc2woYXJnczogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHJ1bignb3BlbnNzbCcsIGFyZ3MsIHtcbiAgICBzdGRpbzogJ3BpcGUnLFxuICAgIGVudjogT2JqZWN0LmFzc2lnbih7XG4gICAgICBSQU5ERklMRTogcGF0aC5qb2luKGNvbmZpZ1BhdGgoJy5ybmQnKSlcbiAgICB9LCBwcm9jZXNzLmVudilcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW4oY21kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zOiBFeGVjRmlsZVN5bmNPcHRpb25zID0ge30pIHtcbiAgZGVidWcoYGV4ZWNGaWxlU3luYzogXFxgJHsgY21kIH0gJHthcmdzLmpvaW4oJyAnKX1cXGBgKTtcbiAgcmV0dXJuIGV4ZWNGaWxlU3luYyhjbWQsIGFyZ3MsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3Vkb0FwcGVuZChmaWxlOiBzdHJpbmcsIGlucHV0OiBFeGVjRmlsZVN5bmNPcHRpb25zW1wiaW5wdXRcIl0pIHtcbiAgcnVuKCdzdWRvJywgWyd0ZWUnLCAnLWEnLCBmaWxlXSwge1xuICAgIGlucHV0XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvclVzZXIoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHByb2Nlc3Muc3RkaW4ucmVzdW1lKCk7XG4gICAgcHJvY2Vzcy5zdGRpbi5vbignZGF0YScsIHJlc29sdmUpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcG9ydGFibGVFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcihgJHttZXNzYWdlfSB8IFRoaXMgaXMgYSBidWcgaW4gZGV2Y2VydCwgcGxlYXNlIHJlcG9ydCB0aGUgaXNzdWUgYXQgaHR0cHM6Ly9naXRodWIuY29tL2RhdmV3YXNtZXIvZGV2Y2VydC9pc3N1ZXNgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1rdG1wKCkge1xuICAvLyBkaXNjYXJkRGVzY3JpcHRvciBiZWNhdXNlIHdpbmRvd3MgY29tcGxhaW5zIHRoZSBmaWxlIGlzIGluIHVzZSBpZiB3ZSBjcmVhdGUgYSB0bXAgZmlsZVxuICAvLyBhbmQgdGhlbiBzaGVsbCBvdXQgdG8gYSBwcm9jZXNzIHRoYXQgdHJpZXMgdG8gdXNlIGl0XG4gIHJldHVybiB0bXAuZmlsZVN5bmMoeyBkaXNjYXJkRGVzY3JpcHRvcjogdHJ1ZSB9KS5uYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VkbyhjbWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHN1ZG9Qcm9tcHQuZXhlYyhjbWQsIHsgbmFtZTogJ2RldmNlcnQnIH0sIChlcnI6IEVycm9yIHwgbnVsbCwgc3Rkb3V0OiBzdHJpbmcgfCBudWxsLCBzdGRlcnI6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICAgIGxldCBlcnJvciA9IGVyciB8fCAodHlwZW9mIHN0ZGVyciA9PT0gJ3N0cmluZycgJiYgc3RkZXJyLnRyaW0oKS5sZW5ndGggPiAwICYmIG5ldyBFcnJvcihzdGRlcnIpKSA7XG4gICAgICBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKHN0ZG91dCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19