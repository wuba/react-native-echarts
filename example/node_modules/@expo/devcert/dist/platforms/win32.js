"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const fs_1 = require("fs");
const rimraf_1 = require("rimraf");
const shared_1 = require("./shared");
const utils_1 = require("../utils");
const user_interface_1 = tslib_1.__importDefault(require("../user-interface"));
const debug = debug_1.default('devcert:platforms:windows');
let encryptionKey;
class WindowsPlatform {
    constructor() {
        this.HOST_FILE_PATH = 'C:\\Windows\\System32\\Drivers\\etc\\hosts';
    }
    /**
     * Windows is at least simple. Like macOS, most applications will delegate to
     * the system trust store, which is updated with the confusingly named
     * `certutil` exe (not the same as the NSS/Mozilla certutil). Firefox does it's
     * own thing as usual, and getting a copy of NSS certutil onto the Windows
     * machine to try updating the Firefox store is basically a nightmare, so we
     * don't even try it - we just bail out to the GUI.
     */
    addToTrustStores(certificatePath, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // IE, Chrome, system utils
            debug('adding devcert root to Windows OS trust store');
            try {
                utils_1.run('certutil', ['-addstore', '-user', 'root', certificatePath]);
            }
            catch (e) {
                e.output.map((buffer) => {
                    if (buffer) {
                        console.log(buffer.toString());
                    }
                });
            }
            debug('adding devcert root to Firefox trust store');
            // Firefox (don't even try NSS certutil, no easy install for Windows)
            try {
                yield shared_1.openCertificateInFirefox('start firefox', certificatePath);
            }
            catch (_a) {
                debug('Error opening Firefox, most likely Firefox is not installed');
            }
        });
    }
    removeFromTrustStores(certificatePath) {
        debug('removing devcert root from Windows OS trust store');
        try {
            console.warn('Removing old certificates from trust stores. You may be prompted to grant permission for this. It\'s safe to delete old devcert certificates.');
            utils_1.run('certutil', ['-delstore', '-user', 'root', 'devcert']);
        }
        catch (e) {
            debug(`failed to remove ${certificatePath} from Windows OS trust store, continuing. ${e.toString()}`);
        }
    }
    addDomainToHostFileIfMissing(domain) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let hostsFileContents = fs_1.readFileSync(this.HOST_FILE_PATH, 'utf8');
            if (!hostsFileContents.includes(domain)) {
                yield utils_1.sudo(`echo 127.0.0.1  ${domain} >> ${this.HOST_FILE_PATH}`);
            }
        });
    }
    deleteProtectedFiles(filepath) {
        shared_1.assertNotTouchingFiles(filepath, 'delete');
        rimraf_1.sync(filepath);
    }
    readProtectedFile(filepath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            shared_1.assertNotTouchingFiles(filepath, 'read');
            if (!encryptionKey) {
                encryptionKey = yield user_interface_1.default.getWindowsEncryptionPassword();
            }
            // Try to decrypt the file
            try {
                return this.decrypt(fs_1.readFileSync(filepath, 'utf8'), encryptionKey);
            }
            catch (e) {
                // If it's a bad password, clear the cached copy and retry
                if (e.message.indexOf('bad decrypt') >= -1) {
                    encryptionKey = null;
                    return yield this.readProtectedFile(filepath);
                }
                throw e;
            }
        });
    }
    writeProtectedFile(filepath, contents) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            shared_1.assertNotTouchingFiles(filepath, 'write');
            if (!encryptionKey) {
                encryptionKey = yield user_interface_1.default.getWindowsEncryptionPassword();
            }
            let encryptedContents = this.encrypt(contents, encryptionKey);
            fs_1.writeFileSync(filepath, encryptedContents);
        });
    }
    encrypt(text, key) {
        let cipher = crypto_1.default.createCipher('aes256', new Buffer(key));
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    }
    decrypt(encrypted, key) {
        let decipher = crypto_1.default.createDecipher('aes256', new Buffer(key));
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    }
}
exports.default = WindowsPlatform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luMzIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2V2YW5iYWNvbi9Eb2N1bWVudHMvR2l0SHViL2RldmNlcnQvIiwic291cmNlcyI6WyJwbGF0Zm9ybXMvd2luMzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQWdDO0FBQ2hDLDREQUE0QjtBQUM1QiwyQkFBa0U7QUFDbEUsbUNBQXdDO0FBRXhDLHFDQUE0RTtBQUU1RSxvQ0FBcUM7QUFDckMsK0VBQW1DO0FBRW5DLE1BQU0sS0FBSyxHQUFHLGVBQVcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRXZELElBQUksYUFBcUIsQ0FBQztBQUUxQjtJQUFBO1FBRVUsbUJBQWMsR0FBRyw0Q0FBNEMsQ0FBQztJQTBGeEUsQ0FBQztJQXhGQzs7Ozs7OztPQU9HO0lBQ0csZ0JBQWdCLENBQUMsZUFBdUIsRUFBRSxVQUFtQixFQUFFOztZQUNuRSwyQkFBMkI7WUFDM0IsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUE7WUFDdEQsSUFBSTtnQkFDRixXQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQzthQUNsRTtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7b0JBQzlCLElBQUksTUFBTSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7cUJBQ2hDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtZQUNuRCxxRUFBcUU7WUFDckUsSUFBSTtnQkFDRixNQUFNLGlDQUF3QixDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUNsRTtZQUFDLFdBQU07Z0JBQ04sS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7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T0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBRUY7QUE1RkQsa0NBNEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IHdyaXRlRmlsZVN5bmMgYXMgd3JpdGUsIHJlYWRGaWxlU3luYyBhcyByZWFkIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgc3luYyBhcyByaW1yYWYgfSBmcm9tICdyaW1yYWYnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCB7IGFzc2VydE5vdFRvdWNoaW5nRmlsZXMsIG9wZW5DZXJ0aWZpY2F0ZUluRmlyZWZveCB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLic7XG5pbXBvcnQgeyBydW4sIHN1ZG8gfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgVUkgZnJvbSAnLi4vdXNlci1pbnRlcmZhY2UnO1xuXG5jb25zdCBkZWJ1ZyA9IGNyZWF0ZURlYnVnKCdkZXZjZXJ0OnBsYXRmb3Jtczp3aW5kb3dzJyk7XG5cbmxldCBlbmNyeXB0aW9uS2V5OiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmRvd3NQbGF0Zm9ybSBpbXBsZW1lbnRzIFBsYXRmb3JtIHtcblxuICBwcml2YXRlIEhPU1RfRklMRV9QQVRIID0gJ0M6XFxcXFdpbmRvd3NcXFxcU3lzdGVtMzJcXFxcRHJpdmVyc1xcXFxldGNcXFxcaG9zdHMnO1xuXG4gIC8qKlxuICAgKiBXaW5kb3dzIGlzIGF0IGxlYXN0IHNpbXBsZS4gTGlrZSBtYWNPUywgbW9zdCBhcHBsaWNhdGlvbnMgd2lsbCBkZWxlZ2F0ZSB0b1xuICAgKiB0aGUgc3lzdGVtIHRydXN0IHN0b3JlLCB3aGljaCBpcyB1cGRhdGVkIHdpdGggdGhlIGNvbmZ1c2luZ2x5IG5hbWVkXG4gICAqIGBjZXJ0dXRpbGAgZXhlIChub3QgdGhlIHNhbWUgYXMgdGhlIE5TUy9Nb3ppbGxhIGNlcnR1dGlsKS4gRmlyZWZveCBkb2VzIGl0J3NcbiAgICogb3duIHRoaW5nIGFzIHVzdWFsLCBhbmQgZ2V0dGluZyBhIGNvcHkgb2YgTlNTIGNlcnR1dGlsIG9udG8gdGhlIFdpbmRvd3NcbiAgICogbWFjaGluZSB0byB0cnkgdXBkYXRpbmcgdGhlIEZpcmVmb3ggc3RvcmUgaXMgYmFzaWNhbGx5IGEgbmlnaHRtYXJlLCBzbyB3ZVxuICAgKiBkb24ndCBldmVuIHRyeSBpdCAtIHdlIGp1c3QgYmFpbCBvdXQgdG8gdGhlIEdVSS5cbiAgICovXG4gIGFzeW5jIGFkZFRvVHJ1c3RTdG9yZXMoY2VydGlmaWNhdGVQYXRoOiBzdHJpbmcsIG9wdGlvbnM6IE9wdGlvbnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIElFLCBDaHJvbWUsIHN5c3RlbSB1dGlsc1xuICAgIGRlYnVnKCdhZGRpbmcgZGV2Y2VydCByb290IHRvIFdpbmRvd3MgT1MgdHJ1c3Qgc3RvcmUnKVxuICAgIHRyeSB7XG4gICAgICBydW4oJ2NlcnR1dGlsJywgWyctYWRkc3RvcmUnLCAnLXVzZXInLCAncm9vdCcsIGNlcnRpZmljYXRlUGF0aF0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUub3V0cHV0Lm1hcCgoYnVmZmVyOiBCdWZmZXIpID0+IHtcbiAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGJ1ZmZlci50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGRlYnVnKCdhZGRpbmcgZGV2Y2VydCByb290IHRvIEZpcmVmb3ggdHJ1c3Qgc3RvcmUnKVxuICAgIC8vIEZpcmVmb3ggKGRvbid0IGV2ZW4gdHJ5IE5TUyBjZXJ0dXRpbCwgbm8gZWFzeSBpbnN0YWxsIGZvciBXaW5kb3dzKVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBvcGVuQ2VydGlmaWNhdGVJbkZpcmVmb3goJ3N0YXJ0IGZpcmVmb3gnLCBjZXJ0aWZpY2F0ZVBhdGgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgZGVidWcoJ0Vycm9yIG9wZW5pbmcgRmlyZWZveCwgbW9zdCBsaWtlbHkgRmlyZWZveCBpcyBub3QgaW5zdGFsbGVkJyk7XG4gICAgfVxuICB9XG4gIFxuICByZW1vdmVGcm9tVHJ1c3RTdG9yZXMoY2VydGlmaWNhdGVQYXRoOiBzdHJpbmcpIHtcbiAgICBkZWJ1ZygncmVtb3ZpbmcgZGV2Y2VydCByb290IGZyb20gV2luZG93cyBPUyB0cnVzdCBzdG9yZScpO1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1JlbW92aW5nIG9sZCBjZXJ0aWZpY2F0ZXMgZnJvbSB0cnVzdCBzdG9yZXMuIFlvdSBtYXkgYmUgcHJvbXB0ZWQgdG8gZ3JhbnQgcGVybWlzc2lvbiBmb3IgdGhpcy4gSXRcXCdzIHNhZmUgdG8gZGVsZXRlIG9sZCBkZXZjZXJ0IGNlcnRpZmljYXRlcy4nKTtcbiAgICAgIHJ1bignY2VydHV0aWwnLCBbJy1kZWxzdG9yZScsICctdXNlcicsICdyb290JywgJ2RldmNlcnQnXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVidWcoYGZhaWxlZCB0byByZW1vdmUgJHsgY2VydGlmaWNhdGVQYXRoIH0gZnJvbSBXaW5kb3dzIE9TIHRydXN0IHN0b3JlLCBjb250aW51aW5nLiAkeyBlLnRvU3RyaW5nKCkgfWApXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkRG9tYWluVG9Ib3N0RmlsZUlmTWlzc2luZyhkb21haW46IHN0cmluZykge1xuICAgIGxldCBob3N0c0ZpbGVDb250ZW50cyA9IHJlYWQodGhpcy5IT1NUX0ZJTEVfUEFUSCwgJ3V0ZjgnKTtcbiAgICBpZiAoIWhvc3RzRmlsZUNvbnRlbnRzLmluY2x1ZGVzKGRvbWFpbikpIHtcbiAgICAgIGF3YWl0IHN1ZG8oYGVjaG8gMTI3LjAuMC4xICAkeyBkb21haW4gfSA+PiAkeyB0aGlzLkhPU1RfRklMRV9QQVRIIH1gKTtcbiAgICB9XG4gIH1cbiAgXG4gIGRlbGV0ZVByb3RlY3RlZEZpbGVzKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBhc3NlcnROb3RUb3VjaGluZ0ZpbGVzKGZpbGVwYXRoLCAnZGVsZXRlJyk7XG4gICAgcmltcmFmKGZpbGVwYXRoKTtcbiAgfVxuXG4gIGFzeW5jIHJlYWRQcm90ZWN0ZWRGaWxlKGZpbGVwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICdyZWFkJyk7XG4gICAgaWYgKCFlbmNyeXB0aW9uS2V5KSB7XG4gICAgICBlbmNyeXB0aW9uS2V5ID0gYXdhaXQgVUkuZ2V0V2luZG93c0VuY3J5cHRpb25QYXNzd29yZCgpO1xuICAgIH1cbiAgICAvLyBUcnkgdG8gZGVjcnlwdCB0aGUgZmlsZVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWNyeXB0KHJlYWQoZmlsZXBhdGgsICd1dGY4JyksIGVuY3J5cHRpb25LZXkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIElmIGl0J3MgYSBiYWQgcGFzc3dvcmQsIGNsZWFyIHRoZSBjYWNoZWQgY29weSBhbmQgcmV0cnlcbiAgICAgIGlmIChlLm1lc3NhZ2UuaW5kZXhPZignYmFkIGRlY3J5cHQnKSA+PSAtMSkge1xuICAgICAgICBlbmNyeXB0aW9uS2V5ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVhZFByb3RlY3RlZEZpbGUoZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB3cml0ZVByb3RlY3RlZEZpbGUoZmlsZXBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZykge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICd3cml0ZScpO1xuICAgIGlmICghZW5jcnlwdGlvbktleSkge1xuICAgICAgZW5jcnlwdGlvbktleSA9IGF3YWl0IFVJLmdldFdpbmRvd3NFbmNyeXB0aW9uUGFzc3dvcmQoKTtcbiAgICB9XG4gICAgbGV0IGVuY3J5cHRlZENvbnRlbnRzID0gdGhpcy5lbmNyeXB0KGNvbnRlbnRzLCBlbmNyeXB0aW9uS2V5KTtcbiAgICB3cml0ZShmaWxlcGF0aCwgZW5jcnlwdGVkQ29udGVudHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbmNyeXB0KHRleHQ6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICBsZXQgY2lwaGVyID0gY3J5cHRvLmNyZWF0ZUNpcGhlcignYWVzMjU2JywgbmV3IEJ1ZmZlcihrZXkpKTtcbiAgICByZXR1cm4gY2lwaGVyLnVwZGF0ZSh0ZXh0LCAndXRmOCcsICdoZXgnKSArIGNpcGhlci5maW5hbCgnaGV4Jyk7XG4gIH1cblxuICBwcml2YXRlIGRlY3J5cHQoZW5jcnlwdGVkOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgbGV0IGRlY2lwaGVyID0gY3J5cHRvLmNyZWF0ZURlY2lwaGVyKCdhZXMyNTYnLCBuZXcgQnVmZmVyKGtleSkpO1xuICAgIHJldHVybiBkZWNpcGhlci51cGRhdGUoZW5jcnlwdGVkLCAnaGV4JywgJ3V0ZjgnKSArIGRlY2lwaGVyLmZpbmFsKCd1dGY4Jyk7XG4gIH1cblxufSJdfQ==