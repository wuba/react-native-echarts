"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const password_prompt_1 = tslib_1.__importDefault(require("password-prompt"));
const utils_1 = require("./utils");
const DefaultUI = {
    getWindowsEncryptionPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield password_prompt_1.default('devcert password (http://bit.ly/devcert-what-password?):');
        });
    },
    warnChromeOnLinuxWithoutCertutil() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.warn(`
      WARNING: It looks like you have Chrome installed, but you specified
      'skipCertutilInstall: true'. Unfortunately, without installing
      certutil, it's impossible get Chrome to trust devcert's certificates
      The certificates will work, but Chrome will continue to warn you that
      they are untrusted.
    `);
        });
    },
    closeFirefoxBeforeContinuing() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Please close Firefox before continuing');
        });
    },
    startFirefoxWizard(certificateHost) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`
      devcert was unable to automatically configure Firefox. You'll need to
      complete this process manually. Don't worry though - Firefox will walk
      you through it.

      When you're ready, hit any key to continue. Firefox will launch and
      display a wizard to walk you through how to trust the devcert
      certificate. When you are finished, come back here and we'll finish up.

      (If Firefox doesn't start, go ahead and start it and navigate to
      ${certificateHost} in a new tab.)

      If you are curious about why all this is necessary, check out
      https://github.com/davewasmer/devcert#how-it-works

      <Press any key to launch Firefox wizard>
    `);
            yield utils_1.waitForUser();
        });
    },
    firefoxWizardPromptPage(certificateURL) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return `
      <html>
        <head>
          <meta http-equiv="refresh" content="0; url=${certificateURL}" />
        </head>
      </html>
    `;
        });
    },
    waitForFirefoxWizard() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`
      Launching Firefox ...

      Great! Once you've finished the Firefox wizard for adding the devcert
      certificate, just hit any key here again and we'll wrap up.

      <Press any key to continue>
    `);
            yield utils_1.waitForUser();
        });
    }
};
exports.default = DefaultUI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2V2YW5iYWNvbi9Eb2N1bWVudHMvR2l0SHViL2RldmNlcnQvIiwic291cmNlcyI6WyJ1c2VyLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4RUFBNkM7QUFDN0MsbUNBQXNDO0FBV3RDLE1BQU0sU0FBUyxHQUFrQjtJQUN6Qiw0QkFBNEI7O1lBQ2hDLE9BQU8sTUFBTSx5QkFBYyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDMUYsQ0FBQztLQUFBO0lBQ0ssZ0NBQWdDOztZQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDOzs7Ozs7S0FNWixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFDSyw0QkFBNEI7O1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFDSyxrQkFBa0IsQ0FBQyxlQUFlOztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDOzs7Ozs7Ozs7O1FBVVAsZUFBZ0I7Ozs7OztLQU1wQixDQUFDLENBQUM7WUFDSCxNQUFNLG1CQUFXLEVBQUUsQ0FBQztRQUN0QixDQUFDO0tBQUE7SUFDSyx1QkFBdUIsQ0FBQyxjQUFzQjs7WUFDbEQsT0FBTzs7O3VEQUc0QyxjQUFjOzs7S0FHaEUsQ0FBQztRQUNKLENBQUM7S0FBQTtJQUNLLG9CQUFvQjs7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztLQU9YLENBQUMsQ0FBQTtZQUNGLE1BQU0sbUJBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7S0FBQTtDQUNGLENBQUE7QUFFRCxrQkFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3dvcmRQcm9tcHQgZnJvbSAncGFzc3dvcmQtcHJvbXB0JztcbmltcG9ydCB7IHdhaXRGb3JVc2VyIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckludGVyZmFjZSB7XG4gIGdldFdpbmRvd3NFbmNyeXB0aW9uUGFzc3dvcmQoKTogUHJvbWlzZTxzdHJpbmc+O1xuICB3YXJuQ2hyb21lT25MaW51eFdpdGhvdXRDZXJ0dXRpbCgpOiBQcm9taXNlPHZvaWQ+O1xuICBjbG9zZUZpcmVmb3hCZWZvcmVDb250aW51aW5nKCk6IFByb21pc2U8dm9pZD47XG4gIHN0YXJ0RmlyZWZveFdpemFyZChjZXJ0aWZpY2F0ZUhvc3Q6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG4gIGZpcmVmb3hXaXphcmRQcm9tcHRQYWdlKGNlcnRpZmljYXRlVVJMOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG4gIHdhaXRGb3JGaXJlZm94V2l6YXJkKCk6IFByb21pc2U8dm9pZD47XG59XG5cbmNvbnN0IERlZmF1bHRVSTogVXNlckludGVyZmFjZSA9IHtcbiAgYXN5bmMgZ2V0V2luZG93c0VuY3J5cHRpb25QYXNzd29yZCgpIHtcbiAgICByZXR1cm4gYXdhaXQgcGFzc3dvcmRQcm9tcHQoJ2RldmNlcnQgcGFzc3dvcmQgKGh0dHA6Ly9iaXQubHkvZGV2Y2VydC13aGF0LXBhc3N3b3JkPyk6Jyk7XG4gIH0sXG4gIGFzeW5jIHdhcm5DaHJvbWVPbkxpbnV4V2l0aG91dENlcnR1dGlsKCkge1xuICAgIGNvbnNvbGUud2FybihgXG4gICAgICBXQVJOSU5HOiBJdCBsb29rcyBsaWtlIHlvdSBoYXZlIENocm9tZSBpbnN0YWxsZWQsIGJ1dCB5b3Ugc3BlY2lmaWVkXG4gICAgICAnc2tpcENlcnR1dGlsSW5zdGFsbDogdHJ1ZScuIFVuZm9ydHVuYXRlbHksIHdpdGhvdXQgaW5zdGFsbGluZ1xuICAgICAgY2VydHV0aWwsIGl0J3MgaW1wb3NzaWJsZSBnZXQgQ2hyb21lIHRvIHRydXN0IGRldmNlcnQncyBjZXJ0aWZpY2F0ZXNcbiAgICAgIFRoZSBjZXJ0aWZpY2F0ZXMgd2lsbCB3b3JrLCBidXQgQ2hyb21lIHdpbGwgY29udGludWUgdG8gd2FybiB5b3UgdGhhdFxuICAgICAgdGhleSBhcmUgdW50cnVzdGVkLlxuICAgIGApO1xuICB9LFxuICBhc3luYyBjbG9zZUZpcmVmb3hCZWZvcmVDb250aW51aW5nKCkge1xuICAgIGNvbnNvbGUubG9nKCdQbGVhc2UgY2xvc2UgRmlyZWZveCBiZWZvcmUgY29udGludWluZycpO1xuICB9LFxuICBhc3luYyBzdGFydEZpcmVmb3hXaXphcmQoY2VydGlmaWNhdGVIb3N0KSB7XG4gICAgY29uc29sZS5sb2coYFxuICAgICAgZGV2Y2VydCB3YXMgdW5hYmxlIHRvIGF1dG9tYXRpY2FsbHkgY29uZmlndXJlIEZpcmVmb3guIFlvdSdsbCBuZWVkIHRvXG4gICAgICBjb21wbGV0ZSB0aGlzIHByb2Nlc3MgbWFudWFsbHkuIERvbid0IHdvcnJ5IHRob3VnaCAtIEZpcmVmb3ggd2lsbCB3YWxrXG4gICAgICB5b3UgdGhyb3VnaCBpdC5cblxuICAgICAgV2hlbiB5b3UncmUgcmVhZHksIGhpdCBhbnkga2V5IHRvIGNvbnRpbnVlLiBGaXJlZm94IHdpbGwgbGF1bmNoIGFuZFxuICAgICAgZGlzcGxheSBhIHdpemFyZCB0byB3YWxrIHlvdSB0aHJvdWdoIGhvdyB0byB0cnVzdCB0aGUgZGV2Y2VydFxuICAgICAgY2VydGlmaWNhdGUuIFdoZW4geW91IGFyZSBmaW5pc2hlZCwgY29tZSBiYWNrIGhlcmUgYW5kIHdlJ2xsIGZpbmlzaCB1cC5cblxuICAgICAgKElmIEZpcmVmb3ggZG9lc24ndCBzdGFydCwgZ28gYWhlYWQgYW5kIHN0YXJ0IGl0IGFuZCBuYXZpZ2F0ZSB0b1xuICAgICAgJHsgY2VydGlmaWNhdGVIb3N0IH0gaW4gYSBuZXcgdGFiLilcblxuICAgICAgSWYgeW91IGFyZSBjdXJpb3VzIGFib3V0IHdoeSBhbGwgdGhpcyBpcyBuZWNlc3NhcnksIGNoZWNrIG91dFxuICAgICAgaHR0cHM6Ly9naXRodWIuY29tL2RhdmV3YXNtZXIvZGV2Y2VydCNob3ctaXQtd29ya3NcblxuICAgICAgPFByZXNzIGFueSBrZXkgdG8gbGF1bmNoIEZpcmVmb3ggd2l6YXJkPlxuICAgIGApO1xuICAgIGF3YWl0IHdhaXRGb3JVc2VyKCk7XG4gIH0sXG4gIGFzeW5jIGZpcmVmb3hXaXphcmRQcm9tcHRQYWdlKGNlcnRpZmljYXRlVVJMOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGh0bWw+XG4gICAgICAgIDxoZWFkPlxuICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJyZWZyZXNoXCIgY29udGVudD1cIjA7IHVybD0ke2NlcnRpZmljYXRlVVJMfVwiIC8+XG4gICAgICAgIDwvaGVhZD5cbiAgICAgIDwvaHRtbD5cbiAgICBgO1xuICB9LFxuICBhc3luYyB3YWl0Rm9yRmlyZWZveFdpemFyZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgXG4gICAgICBMYXVuY2hpbmcgRmlyZWZveCAuLi5cblxuICAgICAgR3JlYXQhIE9uY2UgeW91J3ZlIGZpbmlzaGVkIHRoZSBGaXJlZm94IHdpemFyZCBmb3IgYWRkaW5nIHRoZSBkZXZjZXJ0XG4gICAgICBjZXJ0aWZpY2F0ZSwganVzdCBoaXQgYW55IGtleSBoZXJlIGFnYWluIGFuZCB3ZSdsbCB3cmFwIHVwLlxuXG4gICAgICA8UHJlc3MgYW55IGtleSB0byBjb250aW51ZT5cbiAgICBgKVxuICAgIGF3YWl0IHdhaXRGb3JVc2VyKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdFVJOyJdfQ==