"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const command_exists_1 = require("command-exists");
const utils_1 = require("../utils");
const shared_1 = require("./shared");
const debug = debug_1.default('devcert:platforms:macos');
const getCertUtilPath = () => path_1.default.join(utils_1.run('brew', ['--prefix', 'nss']).toString().trim(), 'bin', 'certutil');
class MacOSPlatform {
    constructor() {
        this.FIREFOX_BUNDLE_PATH = '/Applications/Firefox.app';
        this.FIREFOX_BIN_PATH = path_1.default.join(this.FIREFOX_BUNDLE_PATH, 'Contents/MacOS/firefox');
        this.FIREFOX_NSS_DIR = path_1.default.join(process.env.HOME, 'Library/Application Support/Firefox/Profiles/*');
        this.HOST_FILE_PATH = '/etc/hosts';
    }
    /**
     * macOS is pretty simple - just add the certificate to the system keychain,
     * and most applications will delegate to that for determining trusted
     * certificates. Firefox, of course, does it's own thing. We can try to
     * automatically install the cert with Firefox if we can use certutil via the
     * `nss` Homebrew package, otherwise we go manual with user-facing prompts.
     */
    addToTrustStores(certificatePath, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Chrome, Safari, system utils
            debug('Adding devcert root CA to macOS system keychain');
            utils_1.run('sudo', [
                'security',
                'add-trusted-cert',
                '-d',
                '-r',
                'trustRoot',
                '-k',
                '/Library/Keychains/System.keychain',
                '-p',
                'ssl',
                '-p',
                'basic',
                certificatePath
            ]);
            if (this.isFirefoxInstalled()) {
                // Try to use certutil to install the cert automatically
                debug('Firefox install detected. Adding devcert root CA to Firefox trust store');
                if (!this.isNSSInstalled()) {
                    if (!options.skipCertutilInstall) {
                        if (command_exists_1.sync('brew')) {
                            debug(`certutil is not already installed, but Homebrew is detected. Trying to install certutil via Homebrew...`);
                            try {
                                utils_1.run('brew', ['install', 'nss'], { stdio: 'ignore' });
                            }
                            catch (e) {
                                debug(`brew install nss failed`);
                            }
                        }
                        else {
                            debug(`Homebrew didn't work, so we can't try to install certutil. Falling back to manual certificate install`);
                            return yield shared_1.openCertificateInFirefox(this.FIREFOX_BIN_PATH, certificatePath);
                        }
                    }
                    else {
                        debug(`certutil is not already installed, and skipCertutilInstall is true, so we have to fall back to a manual install`);
                        return yield shared_1.openCertificateInFirefox(this.FIREFOX_BIN_PATH, certificatePath);
                    }
                }
                yield shared_1.closeFirefox();
                yield shared_1.addCertificateToNSSCertDB(this.FIREFOX_NSS_DIR, certificatePath, getCertUtilPath());
            }
            else {
                debug('Firefox does not appear to be installed, skipping Firefox-specific steps...');
            }
        });
    }
    removeFromTrustStores(certificatePath) {
        debug('Removing devcert root CA from macOS system keychain');
        try {
            utils_1.run('sudo', [
                'security',
                'remove-trusted-cert',
                '-d',
                certificatePath
            ], {
                stdio: 'ignore'
            });
        }
        catch (e) {
            debug(`failed to remove ${certificatePath} from macOS cert store, continuing. ${e.toString()}`);
        }
        if (this.isFirefoxInstalled() && this.isNSSInstalled()) {
            debug('Firefox install and certutil install detected. Trying to remove root CA from Firefox NSS databases');
            shared_1.removeCertificateFromNSSCertDB(this.FIREFOX_NSS_DIR, certificatePath, getCertUtilPath());
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
        return fs_1.existsSync(this.FIREFOX_BUNDLE_PATH);
    }
    isNSSInstalled() {
        try {
            return utils_1.run('brew', ['list', '-1']).toString().includes('\nnss\n');
        }
        catch (e) {
            return false;
        }
    }
}
exports.default = MacOSPlatform;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFyd2luLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ldmFuYmFjb24vRG9jdW1lbnRzL0dpdEh1Yi9kZXZjZXJ0LyIsInNvdXJjZXMiOlsicGxhdGZvcm1zL2Rhcndpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBd0I7QUFDeEIsMkJBQTRGO0FBQzVGLDBEQUFnQztBQUNoQyxtREFBdUQ7QUFDdkQsb0NBQTJDO0FBRTNDLHFDQUFxSjtBQUdySixNQUFNLEtBQUssR0FBRyxlQUFXLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUVyRCxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFL0c7SUFBQTtRQUVVLHdCQUFtQixHQUFHLDJCQUEyQixDQUFDO1FBQ2xELHFCQUFnQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDakYsb0JBQWUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGdEQUFnRCxDQUFDLENBQUM7UUFFaEcsbUJBQWMsR0FBRyxZQUFZLENBQUM7SUFvSHhDLENBQUM7SUFsSEM7Ozs7OztPQU1HO0lBQ0csZ0JBQWdCLENBQUMsZUFBdUIsRUFBRSxVQUFtQixFQUFFOztZQUVuRSwrQkFBK0I7WUFDL0IsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDekQsV0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFDVixVQUFVO2dCQUNWLGtCQUFrQjtnQkFDbEIsSUFBSTtnQkFDSixJQUFJO2dCQUNKLFdBQVc7Z0JBQ1gsSUFBSTtnQkFDSixvQ0FBb0M7Z0JBQ3BDLElB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WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHdyaXRlRmlsZVN5bmMgYXMgd3JpdGVGaWxlLCBleGlzdHNTeW5jIGFzIGV4aXN0cywgcmVhZEZpbGVTeW5jIGFzIHJlYWQgfSBmcm9tICdmcyc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHsgc3luYyBhcyBjb21tYW5kRXhpc3RzIH0gZnJvbSAnY29tbWFuZC1leGlzdHMnO1xuaW1wb3J0IHsgcnVuLCBzdWRvQXBwZW5kIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCB7IGFkZENlcnRpZmljYXRlVG9OU1NDZXJ0REIsIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMsIG9wZW5DZXJ0aWZpY2F0ZUluRmlyZWZveCwgY2xvc2VGaXJlZm94LCByZW1vdmVDZXJ0aWZpY2F0ZUZyb21OU1NDZXJ0REIgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4nO1xuXG5jb25zdCBkZWJ1ZyA9IGNyZWF0ZURlYnVnKCdkZXZjZXJ0OnBsYXRmb3JtczptYWNvcycpO1xuXG5jb25zdCBnZXRDZXJ0VXRpbFBhdGggPSAoKSA9PiBwYXRoLmpvaW4ocnVuKCdicmV3JywgWyctLXByZWZpeCcsICduc3MnXSkudG9TdHJpbmcoKS50cmltKCksICdiaW4nLCAnY2VydHV0aWwnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFjT1NQbGF0Zm9ybSBpbXBsZW1lbnRzIFBsYXRmb3JtIHtcblxuICBwcml2YXRlIEZJUkVGT1hfQlVORExFX1BBVEggPSAnL0FwcGxpY2F0aW9ucy9GaXJlZm94LmFwcCc7XG4gIHByaXZhdGUgRklSRUZPWF9CSU5fUEFUSCA9IHBhdGguam9pbih0aGlzLkZJUkVGT1hfQlVORExFX1BBVEgsICdDb250ZW50cy9NYWNPUy9maXJlZm94Jyk7XG4gIHByaXZhdGUgRklSRUZPWF9OU1NfRElSID0gcGF0aC5qb2luKHByb2Nlc3MuZW52LkhPTUUsICdMaWJyYXJ5L0FwcGxpY2F0aW9uIFN1cHBvcnQvRmlyZWZveC9Qcm9maWxlcy8qJyk7XG5cbiAgcHJpdmF0ZSBIT1NUX0ZJTEVfUEFUSCA9ICcvZXRjL2hvc3RzJztcblxuICAvKipcbiAgICogbWFjT1MgaXMgcHJldHR5IHNpbXBsZSAtIGp1c3QgYWRkIHRoZSBjZXJ0aWZpY2F0ZSB0byB0aGUgc3lzdGVtIGtleWNoYWluLFxuICAgKiBhbmQgbW9zdCBhcHBsaWNhdGlvbnMgd2lsbCBkZWxlZ2F0ZSB0byB0aGF0IGZvciBkZXRlcm1pbmluZyB0cnVzdGVkXG4gICAqIGNlcnRpZmljYXRlcy4gRmlyZWZveCwgb2YgY291cnNlLCBkb2VzIGl0J3Mgb3duIHRoaW5nLiBXZSBjYW4gdHJ5IHRvXG4gICAqIGF1dG9tYXRpY2FsbHkgaW5zdGFsbCB0aGUgY2VydCB3aXRoIEZpcmVmb3ggaWYgd2UgY2FuIHVzZSBjZXJ0dXRpbCB2aWEgdGhlXG4gICAqIGBuc3NgIEhvbWVicmV3IHBhY2thZ2UsIG90aGVyd2lzZSB3ZSBnbyBtYW51YWwgd2l0aCB1c2VyLWZhY2luZyBwcm9tcHRzLlxuICAgKi9cbiAgYXN5bmMgYWRkVG9UcnVzdFN0b3JlcyhjZXJ0aWZpY2F0ZVBhdGg6IHN0cmluZywgb3B0aW9uczogT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICAvLyBDaHJvbWUsIFNhZmFyaSwgc3lzdGVtIHV0aWxzXG4gICAgZGVidWcoJ0FkZGluZyBkZXZjZXJ0IHJvb3QgQ0EgdG8gbWFjT1Mgc3lzdGVtIGtleWNoYWluJyk7XG4gICAgcnVuKCdzdWRvJywgW1xuICAgICAgJ3NlY3VyaXR5JyxcbiAgICAgICdhZGQtdHJ1c3RlZC1jZXJ0JyxcbiAgICAgICctZCcsXG4gICAgICAnLXInLFxuICAgICAgJ3RydXN0Um9vdCcsXG4gICAgICAnLWsnLFxuICAgICAgJy9MaWJyYXJ5L0tleWNoYWlucy9TeXN0ZW0ua2V5Y2hhaW4nLFxuICAgICAgJy1wJyxcbiAgICAgICdzc2wnLFxuICAgICAgJy1wJyxcbiAgICAgICdiYXNpYycsXG4gICAgICBjZXJ0aWZpY2F0ZVBhdGhcbiAgICBdKTtcblxuICAgIGlmICh0aGlzLmlzRmlyZWZveEluc3RhbGxlZCgpKSB7XG4gICAgICAvLyBUcnkgdG8gdXNlIGNlcnR1dGlsIHRvIGluc3RhbGwgdGhlIGNlcnQgYXV0b21hdGljYWxseVxuICAgICAgZGVidWcoJ0ZpcmVmb3ggaW5zdGFsbCBkZXRlY3RlZC4gQWRkaW5nIGRldmNlcnQgcm9vdCBDQSB0byBGaXJlZm94IHRydXN0IHN0b3JlJyk7XG4gICAgICBpZiAoIXRoaXMuaXNOU1NJbnN0YWxsZWQoKSkge1xuICAgICAgICBpZiAoIW9wdGlvbnMuc2tpcENlcnR1dGlsSW5zdGFsbCkge1xuICAgICAgICAgIGlmIChjb21tYW5kRXhpc3RzKCdicmV3JykpIHtcbiAgICAgICAgICAgIGRlYnVnKGBjZXJ0dXRpbCBpcyBub3QgYWxyZWFkeSBpbnN0YWxsZWQsIGJ1dCBIb21lYnJldyBpcyBkZXRlY3RlZC4gVHJ5aW5nIHRvIGluc3RhbGwgY2VydHV0aWwgdmlhIEhvbWVicmV3Li4uYCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBydW4oJ2JyZXcnLCBbJ2luc3RhbGwnLCAnbnNzJ10sIHsgc3RkaW86ICdpZ25vcmUnIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBkZWJ1ZyhgYnJldyBpbnN0YWxsIG5zcyBmYWlsZWRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVidWcoYEhvbWVicmV3IGRpZG4ndCB3b3JrLCBzbyB3ZSBjYW4ndCB0cnkgdG8gaW5zdGFsbCBjZXJ0dXRpbC4gRmFsbGluZyBiYWNrIHRvIG1hbnVhbCBjZXJ0aWZpY2F0ZSBpbnN0YWxsYCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgb3BlbkNlcnRpZmljYXRlSW5GaXJlZm94KHRoaXMuRklSRUZPWF9CSU5fUEFUSCwgY2VydGlmaWNhdGVQYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVidWcoYGNlcnR1dGlsIGlzIG5vdCBhbHJlYWR5IGluc3RhbGxlZCwgYW5kIHNraXBDZXJ0dXRpbEluc3RhbGwgaXMgdHJ1ZSwgc28gd2UgaGF2ZSB0byBmYWxsIGJhY2sgdG8gYSBtYW51YWwgaW5zdGFsbGApXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IG9wZW5DZXJ0aWZpY2F0ZUluRmlyZWZveCh0aGlzLkZJUkVGT1hfQklOX1BBVEgsIGNlcnRpZmljYXRlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF3YWl0IGNsb3NlRmlyZWZveCgpO1xuICAgICAgYXdhaXQgYWRkQ2VydGlmaWNhdGVUb05TU0NlcnREQih0aGlzLkZJUkVGT1hfTlNTX0RJUiwgY2VydGlmaWNhdGVQYXRoLCBnZXRDZXJ0VXRpbFBhdGgoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdGaXJlZm94IGRvZXMgbm90IGFwcGVhciB0byBiZSBpbnN0YWxsZWQsIHNraXBwaW5nIEZpcmVmb3gtc3BlY2lmaWMgc3RlcHMuLi4nKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJlbW92ZUZyb21UcnVzdFN0b3JlcyhjZXJ0aWZpY2F0ZVBhdGg6IHN0cmluZykge1xuICAgIGRlYnVnKCdSZW1vdmluZyBkZXZjZXJ0IHJvb3QgQ0EgZnJvbSBtYWNPUyBzeXN0ZW0ga2V5Y2hhaW4nKTtcbiAgICB0cnkge1xuICAgICAgcnVuKCdzdWRvJywgW1xuICAgICAgICAnc2VjdXJpdHknLFxuICAgICAgICAncmVtb3ZlLXRydXN0ZWQtY2VydCcsXG4gICAgICAgICctZCcsXG4gICAgICAgIGNlcnRpZmljYXRlUGF0aFxuICAgICAgXSwge1xuICAgICAgICBzdGRpbzogJ2lnbm9yZSdcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZGVidWcoYGZhaWxlZCB0byByZW1vdmUgJHsgY2VydGlmaWNhdGVQYXRoIH0gZnJvbSBtYWNPUyBjZXJ0IHN0b3JlLCBjb250aW51aW5nLiAkeyBlLnRvU3RyaW5nKCkgfWApO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0ZpcmVmb3hJbnN0YWxsZWQoKSAmJiB0aGlzLmlzTlNTSW5zdGFsbGVkKCkpIHtcbiAgICAgIGRlYnVnKCdGaXJlZm94IGluc3RhbGwgYW5kIGNlcnR1dGlsIGluc3RhbGwgZGV0ZWN0ZWQuIFRyeWluZyB0byByZW1vdmUgcm9vdCBDQSBmcm9tIEZpcmVmb3ggTlNTIGRhdGFiYXNlcycpO1xuICAgICAgcmVtb3ZlQ2VydGlmaWNhdGVGcm9tTlNTQ2VydERCKHRoaXMuRklSRUZPWF9OU1NfRElSLCBjZXJ0aWZpY2F0ZVBhdGgsIGdldENlcnRVdGlsUGF0aCgpKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGREb21haW5Ub0hvc3RGaWxlSWZNaXNzaW5nKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgY29uc3QgdHJpbURvbWFpbiA9IGRvbWFpbi50cmltKCkucmVwbGFjZSgvW1xccztdL2csJycpXG4gICAgbGV0IGhvc3RzRmlsZUNvbnRlbnRzID0gcmVhZCh0aGlzLkhPU1RfRklMRV9QQVRILCAndXRmOCcpO1xuICAgIGlmICghaG9zdHNGaWxlQ29udGVudHMuaW5jbHVkZXModHJpbURvbWFpbikpIHtcbiAgICAgIHN1ZG9BcHBlbmQodGhpcy5IT1NUX0ZJTEVfUEFUSCwgYDEyNy4wLjAuMSAke3RyaW1Eb21haW59XFxuYCk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlUHJvdGVjdGVkRmlsZXMoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICdkZWxldGUnKTtcbiAgICBydW4oJ3N1ZG8nLCBbJ3JtJywgJy1yZicsIGZpbGVwYXRoXSk7XG4gIH1cblxuICBhc3luYyByZWFkUHJvdGVjdGVkRmlsZShmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcyhmaWxlcGF0aCwgJ3JlYWQnKTtcbiAgICByZXR1cm4gKGF3YWl0IHJ1bignc3VkbycsIFsnY2F0JywgZmlsZXBhdGhdKSkudG9TdHJpbmcoKS50cmltKCk7XG4gIH1cblxuICBhc3luYyB3cml0ZVByb3RlY3RlZEZpbGUoZmlsZXBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZykge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICd3cml0ZScpO1xuICAgIGlmIChleGlzdHMoZmlsZXBhdGgpKSB7XG4gICAgICBhd2FpdCBydW4oJ3N1ZG8nLCBbJ3JtJywgZmlsZXBhdGhdKTtcbiAgICB9XG4gICAgd3JpdGVGaWxlKGZpbGVwYXRoLCBjb250ZW50cyk7XG4gICAgYXdhaXQgcnVuKCdzdWRvJywgWydjaG93bicsICcwJywgZmlsZXBhdGhdKTtcbiAgICBhd2FpdCBydW4oJ3N1ZG8nLCBbJ2NobW9kJywgJzYwMCcsIGZpbGVwYXRoXSk7XG4gIH1cblxuICBwcml2YXRlIGlzRmlyZWZveEluc3RhbGxlZCgpIHtcbiAgICByZXR1cm4gZXhpc3RzKHRoaXMuRklSRUZPWF9CVU5ETEVfUEFUSCk7XG4gIH1cblxuICBwcml2YXRlIGlzTlNTSW5zdGFsbGVkKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gcnVuKCdicmV3JywgWydsaXN0JywgJy0xJ10pLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ1xcbm5zc1xcbicpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxufTtcbiJdfQ==