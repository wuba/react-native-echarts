"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const command_exists_1 = require("command-exists");
const shared_1 = require("./shared");
const utils_1 = require("../utils");
const user_interface_1 = tslib_1.__importDefault(require("../user-interface"));
const debug = debug_1.default('devcert:platforms:linux');
class LinuxPlatform {
    constructor() {
        this.FIREFOX_NSS_DIR = path_1.default.join(process.env.HOME, '.mozilla/firefox/*');
        this.CHROME_NSS_DIR = path_1.default.join(process.env.HOME, '.pki/nssdb');
        this.FIREFOX_BIN_PATH = '/usr/bin/firefox';
        this.CHROME_BIN_PATH = '/usr/bin/google-chrome';
        this.HOST_FILE_PATH = '/etc/hosts';
    }
    /**
     * Linux is surprisingly difficult. There seems to be multiple system-wide
     * repositories for certs, so we copy ours to each. However, Firefox does it's
     * usual separate trust store. Plus Chrome relies on the NSS tooling (like
     * Firefox), but uses the user's NSS database, unlike Firefox (which uses a
     * separate Mozilla one). And since Chrome doesn't prompt the user with a GUI
     * flow when opening certs, if we can't use certutil to install our certificate
     * into the user's NSS database, we're out of luck.
     */
    addToTrustStores(certificatePath, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            debug('Adding devcert root CA to Linux system-wide trust stores');
            // run(`sudo cp ${ certificatePath } /etc/ssl/certs/devcert.crt`);
            utils_1.run('sudo', ['cp', certificatePath, '/usr/local/share/ca-certificates/devcert.crt']);
            // run(`sudo bash -c "cat ${ certificatePath } >> /etc/ssl/certs/ca-certificates.crt"`);
            utils_1.run('sudo', ['update-ca-certificates']);
            if (this.isFirefoxInstalled()) {
                // Firefox
                debug('Firefox install detected: adding devcert root CA to Firefox-specific trust stores ...');
                if (!command_exists_1.sync('certutil')) {
                    if (options.skipCertutilInstall) {
                        debug('NSS tooling is not already installed, and `skipCertutil` is true, so falling back to manual certificate install for Firefox');
                        shared_1.openCertificateInFirefox(this.FIREFOX_BIN_PATH, certificatePath);
                    }
                    else {
                        debug('NSS tooling is not already installed. Trying to install NSS tooling now with `apt install`');
                        utils_1.run('sudo', ['apt', 'install', 'libnss3-tools']);
                        debug('Installing certificate into Firefox trust stores using NSS tooling');
                        yield shared_1.closeFirefox();
                        yield shared_1.addCertificateToNSSCertDB(this.FIREFOX_NSS_DIR, certificatePath, 'certutil');
                    }
                }
            }
            else {
                debug('Firefox does not appear to be installed, skipping Firefox-specific steps...');
            }
            if (this.isChromeInstalled()) {
                debug('Chrome install detected: adding devcert root CA to Chrome trust store ...');
                if (!command_exists_1.sync('certutil')) {
                    user_interface_1.default.warnChromeOnLinuxWithoutCertutil();
                }
                else {
                    yield shared_1.closeFirefox();
                    yield shared_1.addCertificateToNSSCertDB(this.CHROME_NSS_DIR, certificatePath, 'certutil');
                }
            }
            else {
                debug('Chrome does not appear to be installed, skipping Chrome-specific steps...');
            }
        });
    }
    removeFromTrustStores(certificatePath) {
        try {
            utils_1.run('sudo', ['rm', '/usr/local/share/ca-certificates/devcert.crt']);
            utils_1.run('sudo', ['update-ca-certificates']);
        }
        catch (e) {
            debug(`failed to remove ${certificatePath} from /usr/local/share/ca-certificates, continuing. ${e.toString()}`);
        }
        if (command_exists_1.sync('certutil')) {
            if (this.isFirefoxInstalled()) {
                shared_1.removeCertificateFromNSSCertDB(this.FIREFOX_NSS_DIR, certificatePath, 'certutil');
            }
            if (this.isChromeInstalled()) {
                shared_1.removeCertificateFromNSSCertDB(this.CHROME_NSS_DIR, certificatePath, 'certutil');
            }
        }
    }
    addDomainToHostFileIfMissing(domain) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const trimDomain = domain.trim().replace(/[\s;]/g, '');
            let hostsFileContents = fs_1.readFileSync(this.HOST_FILE_PATH, 'utf8');
            if (!hostsFileContents.includes(trimDomain)) {
                utils_1.sudoAppend(this.HOST_FILE_PATH, `127.0.0.1 ${trimDomain}\n`);
            }
        });
    }
    deleteProtectedFiles(filepath) {
        shared_1.assertNotTouchingFiles(filepath, 'delete');
        utils_1.run('sudo', ['rm', '-rf', filepath]);
    }
    readProtectedFile(filepath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            shared_1.assertNotTouchingFiles(filepath, 'read');
            return (yield utils_1.run('sudo', ['cat', filepath])).toString().trim();
        });
    }
    writeProtectedFile(filepath, contents) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            shared_1.assertNotTouchingFiles(filepath, 'write');
            if (fs_1.existsSync(filepath)) {
                yield utils_1.run('sudo', ['rm', filepath]);
            }
            fs_1.writeFileSync(filepath, contents);
            yield utils_1.run('sudo', ['chown', '0', filepath]);
            yield utils_1.run('sudo', ['chmod', '600', filepath]);
        });
    }
    isFirefoxInstalled() {
        return fs_1.existsSync(this.FIREFOX_BIN_PATH);
    }
    isChromeInstalled() {
        return fs_1.existsSync(this.CHROME_BIN_PATH);
    }
}
exports.default = LinuxPlatform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGludXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2V2YW5iYWNvbi9Eb2N1bWVudHMvR2l0SHViL2RldmNlcnQvIiwic291cmNlcyI6WyJwbGF0Zm9ybXMvbGludXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQXdCO0FBQ3hCLDJCQUE0RjtBQUM1RiwwREFBZ0M7QUFDaEMsbURBQXVEO0FBQ3ZELHFDQUFxSjtBQUNySixvQ0FBMkM7QUFFM0MsK0VBQW1DO0FBR25DLE1BQU0sS0FBSyxHQUFHLGVBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRXJEO0lBQUE7UUFFVSxvQkFBZSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUNwRSxtQkFBYyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDM0QscUJBQWdCLEdBQUcsa0JBQWtCLENBQUM7UUFDdEMsb0JBQWUsR0FBRyx3QkFBd0IsQ0FBQztRQUUzQyxtQkFBYyxHQUFHLFlBQVksQ0FBQztJQXdHeEMsQ0FBQztJQXRHQzs7Ozs7Ozs7T0FRRztJQUNHLGdCQUFnQixDQUFDLGVBQXVCLEVBQUUsVUFBbUIsRUFBRTs7WUFFbkUsS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7WUFDbEUsa0VBQWtFO1lBQ2xFLFdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLDhDQUE4QyxDQUFDLENBQUMsQ0FBQztZQUNyRix3RkFBd0Y7WUFDeEYsV0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztZQUV4QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO2dCQUM3QixVQUFVO2dCQUNWLEtBQUssQ0FBQyx1RkFBdUYsQ0FBQyxDQUFDO2dCQUMvRixJQUFJLENB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K0JBQXNCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxNQUFNLFdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xFLENBQUM7S0FBQTtJQUVLLGtCQUFrQixDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7O1lBQ3pELCtCQUFzQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMxQyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDcEIsTUFBTSxXQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDckM7WUFDRCxrQkFBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM5QixNQUFNLFdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUMsTUFBTSxXQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVPLGtCQUFrQjtRQUN4QixPQUFPLGVBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLE9BQU8sZUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBRUY7QUEvR0QsZ0NBK0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBleGlzdHNTeW5jIGFzIGV4aXN0cywgcmVhZEZpbGVTeW5jIGFzIHJlYWQsIHdyaXRlRmlsZVN5bmMgYXMgd3JpdGVGaWxlIH0gZnJvbSAnZnMnO1xuaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCB7IHN5bmMgYXMgY29tbWFuZEV4aXN0cyB9IGZyb20gJ2NvbW1hbmQtZXhpc3RzJztcbmltcG9ydCB7IGFkZENlcnRpZmljYXRlVG9OU1NDZXJ0REIsIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMsIG9wZW5DZXJ0aWZpY2F0ZUluRmlyZWZveCwgY2xvc2VGaXJlZm94LCByZW1vdmVDZXJ0aWZpY2F0ZUZyb21OU1NDZXJ0REIgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgeyBydW4sIHN1ZG9BcHBlbmQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IFVJIGZyb20gJy4uL3VzZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLic7XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQ6cGxhdGZvcm1zOmxpbnV4Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbnV4UGxhdGZvcm0gaW1wbGVtZW50cyBQbGF0Zm9ybSB7XG5cbiAgcHJpdmF0ZSBGSVJFRk9YX05TU19ESVIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuSE9NRSwgJy5tb3ppbGxhL2ZpcmVmb3gvKicpO1xuICBwcml2YXRlIENIUk9NRV9OU1NfRElSID0gcGF0aC5qb2luKHByb2Nlc3MuZW52LkhPTUUsICcucGtpL25zc2RiJyk7XG4gIHByaXZhdGUgRklSRUZPWF9CSU5fUEFUSCA9ICcvdXNyL2Jpbi9maXJlZm94JztcbiAgcHJpdmF0ZSBDSFJPTUVfQklOX1BBVEggPSAnL3Vzci9iaW4vZ29vZ2xlLWNocm9tZSc7XG5cbiAgcHJpdmF0ZSBIT1NUX0ZJTEVfUEFUSCA9ICcvZXRjL2hvc3RzJztcblxuICAvKipcbiAgICogTGludXggaXMgc3VycHJpc2luZ2x5IGRpZmZpY3VsdC4gVGhlcmUgc2VlbXMgdG8gYmUgbXVsdGlwbGUgc3lzdGVtLXdpZGVcbiAgICogcmVwb3NpdG9yaWVzIGZvciBjZXJ0cywgc28gd2UgY29weSBvdXJzIHRvIGVhY2guIEhvd2V2ZXIsIEZpcmVmb3ggZG9lcyBpdCdzXG4gICAqIHVzdWFsIHNlcGFyYXRlIHRydXN0IHN0b3JlLiBQbHVzIENocm9tZSByZWxpZXMgb24gdGhlIE5TUyB0b29saW5nIChsaWtlXG4gICAqIEZpcmVmb3gpLCBidXQgdXNlcyB0aGUgdXNlcidzIE5TUyBkYXRhYmFzZSwgdW5saWtlIEZpcmVmb3ggKHdoaWNoIHVzZXMgYVxuICAgKiBzZXBhcmF0ZSBNb3ppbGxhIG9uZSkuIEFuZCBzaW5jZSBDaHJvbWUgZG9lc24ndCBwcm9tcHQgdGhlIHVzZXIgd2l0aCBhIEdVSVxuICAgKiBmbG93IHdoZW4gb3BlbmluZyBjZXJ0cywgaWYgd2UgY2FuJ3QgdXNlIGNlcnR1dGlsIHRvIGluc3RhbGwgb3VyIGNlcnRpZmljYXRlXG4gICAqIGludG8gdGhlIHVzZXIncyBOU1MgZGF0YWJhc2UsIHdlJ3JlIG91dCBvZiBsdWNrLlxuICAgKi9cbiAgYXN5bmMgYWRkVG9UcnVzdFN0b3JlcyhjZXJ0aWZpY2F0ZVBhdGg6IHN0cmluZywgb3B0aW9uczogT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICBkZWJ1ZygnQWRkaW5nIGRldmNlcnQgcm9vdCBDQSB0byBMaW51eCBzeXN0ZW0td2lkZSB0cnVzdCBzdG9yZXMnKTtcbiAgICAvLyBydW4oYHN1ZG8gY3AgJHsgY2VydGlmaWNhdGVQYXRoIH0gL2V0Yy9zc2wvY2VydHMvZGV2Y2VydC5jcnRgKTtcbiAgICBydW4oJ3N1ZG8nLCBbJ2NwJywgY2VydGlmaWNhdGVQYXRoLCAnL3Vzci9sb2NhbC9zaGFyZS9jYS1jZXJ0aWZpY2F0ZXMvZGV2Y2VydC5jcnQnXSk7XG4gICAgLy8gcnVuKGBzdWRvIGJhc2ggLWMgXCJjYXQgJHsgY2VydGlmaWNhdGVQYXRoIH0gPj4gL2V0Yy9zc2wvY2VydHMvY2EtY2VydGlmaWNhdGVzLmNydFwiYCk7XG4gICAgcnVuKCdzdWRvJywgWyd1cGRhdGUtY2EtY2VydGlmaWNhdGVzJ10pO1xuXG4gICAgaWYgKHRoaXMuaXNGaXJlZm94SW5zdGFsbGVkKCkpIHtcbiAgICAgIC8vIEZpcmVmb3hcbiAgICAgIGRlYnVnKCdGaXJlZm94IGluc3RhbGwgZGV0ZWN0ZWQ6IGFkZGluZyBkZXZjZXJ0IHJvb3QgQ0EgdG8gRmlyZWZveC1zcGVjaWZpYyB0cnVzdCBzdG9yZXMgLi4uJyk7XG4gICAgICBpZiAoIWNvbW1hbmRFeGlzdHMoJ2NlcnR1dGlsJykpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcENlcnR1dGlsSW5zdGFsbCkge1xuICAgICAgICAgIGRlYnVnKCdOU1MgdG9vbGluZyBpcyBub3QgYWxyZWFkeSBpbnN0YWxsZWQsIGFuZCBgc2tpcENlcnR1dGlsYCBpcyB0cnVlLCBzbyBmYWxsaW5nIGJhY2sgdG8gbWFudWFsIGNlcnRpZmljYXRlIGluc3RhbGwgZm9yIEZpcmVmb3gnKTtcbiAgICAgICAgICBvcGVuQ2VydGlmaWNhdGVJbkZpcmVmb3godGhpcy5GSVJFRk9YX0JJTl9QQVRILCBjZXJ0aWZpY2F0ZVBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlYnVnKCdOU1MgdG9vbGluZyBpcyBub3QgYWxyZWFkeSBpbnN0YWxsZWQuIFRyeWluZyB0byBpbnN0YWxsIE5TUyB0b29saW5nIG5vdyB3aXRoIGBhcHQgaW5zdGFsbGAnKTtcbiAgICAgICAgICBydW4oJ3N1ZG8nLCAgWydhcHQnLCAnaW5zdGFsbCcsICdsaWJuc3MzLXRvb2xzJ10pO1xuICAgICAgICAgIGRlYnVnKCdJbnN0YWxsaW5nIGNlcnRpZmljYXRlIGludG8gRmlyZWZveCB0cnVzdCBzdG9yZXMgdXNpbmcgTlNTIHRvb2xpbmcnKTtcbiAgICAgICAgICBhd2FpdCBjbG9zZUZpcmVmb3goKTtcbiAgICAgICAgICBhd2FpdCBhZGRDZXJ0aWZpY2F0ZVRvTlNTQ2VydERCKHRoaXMuRklSRUZPWF9OU1NfRElSLCBjZXJ0aWZpY2F0ZVBhdGgsICdjZXJ0dXRpbCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdGaXJlZm94IGRvZXMgbm90IGFwcGVhciB0byBiZSBpbnN0YWxsZWQsIHNraXBwaW5nIEZpcmVmb3gtc3BlY2lmaWMgc3RlcHMuLi4nKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Nocm9tZUluc3RhbGxlZCgpKSB7XG4gICAgICBkZWJ1ZygnQ2hyb21lIGluc3RhbGwgZGV0ZWN0ZWQ6IGFkZGluZyBkZXZjZXJ0IHJvb3QgQ0EgdG8gQ2hyb21lIHRydXN0IHN0b3JlIC4uLicpO1xuICAgICAgaWYgKCFjb21tYW5kRXhpc3RzKCdjZXJ0dXRpbCcpKSB7XG4gICAgICAgIFVJLndhcm5DaHJvbWVPbkxpbnV4V2l0aG91dENlcnR1dGlsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBjbG9zZUZpcmVmb3goKTtcbiAgICAgICAgYXdhaXQgYWRkQ2VydGlmaWNhdGVUb05TU0NlcnREQih0aGlzLkNIUk9NRV9OU1NfRElSLCBjZXJ0aWZpY2F0ZVBhdGgsICdjZXJ0dXRpbCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1ZygnQ2hyb21lIGRvZXMgbm90IGFwcGVhciB0byBiZSBpbnN0YWxsZWQsIHNraXBwaW5nIENocm9tZS1zcGVjaWZpYyBzdGVwcy4uLicpO1xuICAgIH1cbiAgfVxuICBcbiAgcmVtb3ZlRnJvbVRydXN0U3RvcmVzKGNlcnRpZmljYXRlUGF0aDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJ1bignc3VkbycsIFsncm0nLCAnL3Vzci9sb2NhbC9zaGFyZS9jYS1jZXJ0aWZpY2F0ZXMvZGV2Y2VydC5jcnQnXSk7XG4gICAgICBydW4oJ3N1ZG8nLCBbJ3VwZGF0ZS1jYS1jZXJ0aWZpY2F0ZXMnXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVidWcoYGZhaWxlZCB0byByZW1vdmUgJHsgY2VydGlmaWNhdGVQYXRoIH0gZnJvbSAvdXNyL2xvY2FsL3NoYXJlL2NhLWNlcnRpZmljYXRlcywgY29udGludWluZy4gJHsgZS50b1N0cmluZygpIH1gKTtcbiAgICB9XG4gICAgaWYgKGNvbW1hbmRFeGlzdHMoJ2NlcnR1dGlsJykpIHtcbiAgICAgIGlmICh0aGlzLmlzRmlyZWZveEluc3RhbGxlZCgpKSB7XG4gICAgICAgIHJlbW92ZUNlcnRpZmljYXRlRnJvbU5TU0NlcnREQih0aGlzLkZJUkVGT1hfTlNTX0RJUiwgY2VydGlmaWNhdGVQYXRoLCAnY2VydHV0aWwnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzQ2hyb21lSW5zdGFsbGVkKCkpIHtcbiAgICAgICAgcmVtb3ZlQ2VydGlmaWNhdGVGcm9tTlNTQ2VydERCKHRoaXMuQ0hST01FX05TU19ESVIsIGNlcnRpZmljYXRlUGF0aCwgJ2NlcnR1dGlsJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkRG9tYWluVG9Ib3N0RmlsZUlmTWlzc2luZyhkb21haW46IHN0cmluZykge1xuICAgIGNvbnN0IHRyaW1Eb21haW4gPSBkb21haW4udHJpbSgpLnJlcGxhY2UoL1tcXHM7XS9nLCcnKVxuICAgIGxldCBob3N0c0ZpbGVDb250ZW50cyA9IHJlYWQodGhpcy5IT1NUX0ZJTEVfUEFUSCwgJ3V0ZjgnKTtcbiAgICBpZiAoIWhvc3RzRmlsZUNvbnRlbnRzLmluY2x1ZGVzKHRyaW1Eb21haW4pKSB7XG4gICAgICBzdWRvQXBwZW5kKHRoaXMuSE9TVF9GSUxFX1BBVEgsIGAxMjcuMC4wLjEgJHt0cmltRG9tYWlufVxcbmApO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZVByb3RlY3RlZEZpbGVzKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBhc3NlcnROb3RUb3VjaGluZ0ZpbGVzKGZpbGVwYXRoLCAnZGVsZXRlJyk7XG4gICAgcnVuKCdzdWRvJywgWydybScsICctcmYnLCBmaWxlcGF0aF0pO1xuICB9XG5cbiAgYXN5bmMgcmVhZFByb3RlY3RlZEZpbGUoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICdyZWFkJyk7XG4gICAgcmV0dXJuIChhd2FpdCBydW4oJ3N1ZG8nLCBbJ2NhdCcsIGZpbGVwYXRoXSkpLnRvU3RyaW5nKCkudHJpbSgpO1xuICB9XG5cbiAgYXN5bmMgd3JpdGVQcm90ZWN0ZWRGaWxlKGZpbGVwYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBhc3NlcnROb3RUb3VjaGluZ0ZpbGVzKGZpbGVwYXRoLCAnd3JpdGUnKTtcbiAgICBpZiAoZXhpc3RzKGZpbGVwYXRoKSkge1xuICAgICAgYXdhaXQgcnVuKCdzdWRvJywgWydybScsIGZpbGVwYXRoXSk7XG4gICAgfVxuICAgIHdyaXRlRmlsZShmaWxlcGF0aCwgY29udGVudHMpO1xuICAgIGF3YWl0IHJ1bignc3VkbycsIFsnY2hvd24nLCAnMCcsIGZpbGVwYXRoXSk7XG4gICAgYXdhaXQgcnVuKCdzdWRvJywgWydjaG1vZCcsICc2MDAnLCBmaWxlcGF0aF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0ZpcmVmb3hJbnN0YWxsZWQoKSB7XG4gICAgcmV0dXJuIGV4aXN0cyh0aGlzLkZJUkVGT1hfQklOX1BBVEgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0Nocm9tZUluc3RhbGxlZCgpIHtcbiAgICByZXR1cm4gZXhpc3RzKHRoaXMuQ0hST01FX0JJTl9QQVRIKTtcbiAgfVxuXG59Il19