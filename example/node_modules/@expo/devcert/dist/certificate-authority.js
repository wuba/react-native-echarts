"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const constants_1 = require("./constants");
const platforms_1 = tslib_1.__importDefault(require("./platforms"));
const utils_1 = require("./utils");
const certificates_1 = require("./certificates");
const debug = debug_1.default('devcert:certificate-authority');
/**
 * Install the once-per-machine trusted root CA. We'll use this CA to sign
 * per-app certs.
 */
function installCertificateAuthority(options = {}) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debug(`Uninstalling existing certificates, which will be void once any existing CA is gone`);
        uninstall();
        constants_1.ensureConfigDirs();
        debug(`Making a temp working directory for files to copied in`);
        let rootKeyPath = utils_1.mktmp();
        debug(`Generating the OpenSSL configuration needed to setup the certificate authority`);
        seedConfigFiles();
        debug(`Generating a private key`);
        certificates_1.generateKey(rootKeyPath);
        debug(`Generating a CA certificate`);
        utils_1.openssl(['req', '-new', '-x509', '-config', constants_1.caSelfSignConfig, '-key', rootKeyPath, '-out', constants_1.rootCACertPath, '-days', '825']);
        debug('Saving certificate authority credentials');
        yield saveCertificateAuthorityCredentials(rootKeyPath);
        debug(`Adding the root certificate authority to trust stores`);
        yield platforms_1.default.addToTrustStores(constants_1.rootCACertPath, options);
    });
}
exports.default = installCertificateAuthority;
/**
 * Initializes the files OpenSSL needs to sign certificates as a certificate
 * authority, as well as our CA setup version
 */
function seedConfigFiles() {
    // This is v2 of the devcert certificate authority setup
    fs_1.writeFileSync(constants_1.caVersionFile, '2');
    // OpenSSL CA files
    fs_1.writeFileSync(constants_1.opensslDatabaseFilePath, '');
    fs_1.writeFileSync(constants_1.opensslSerialFilePath, '01');
}
function withCertificateAuthorityCredentials(cb) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debug(`Retrieving devcert's certificate authority credentials`);
        let tmpCAKeyPath = utils_1.mktmp();
        let caKey = yield platforms_1.default.readProtectedFile(constants_1.rootCAKeyPath);
        fs_1.writeFileSync(tmpCAKeyPath, caKey);
        yield cb({ caKeyPath: tmpCAKeyPath, caCertPath: constants_1.rootCACertPath });
        fs_1.unlinkSync(tmpCAKeyPath);
    });
}
exports.withCertificateAuthorityCredentials = withCertificateAuthorityCredentials;
function saveCertificateAuthorityCredentials(keypath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debug(`Saving devcert's certificate authority credentials`);
        let key = fs_1.readFileSync(keypath, 'utf-8');
        yield platforms_1.default.writeProtectedFile(constants_1.rootCAKeyPath, key);
    });
}
function certErrors() {
    try {
        utils_1.openssl(['x509', '-in', constants_1.rootCACertPath, '-noout']);
        return '';
    }
    catch (e) {
        return e.toString();
    }
}
// This function helps to migrate from v1.0.x to >= v1.1.0.
/**
 * Smoothly migrate the certificate storage from v1.0.x to >= v1.1.0.
 * In v1.1.0 there are new options for retrieving the CA cert directly,
 * to help third-party Node apps trust the root CA.
 *
 * If a v1.0.x cert already exists, then devcert has written it with
 * platform.writeProtectedFile(), so an unprivileged readFile cannot access it.
 * Pre-detect and remedy this; it should only happen once per installation.
 */
function ensureCACertReadable(options = {}) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!certErrors()) {
            return;
        }
        /**
         * on windows, writeProtectedFile left the cert encrypted on *nix, the cert
         * has no read permissions either way, openssl will fail and that means we
         * have to fix it
         */
        try {
            const caFileContents = yield platforms_1.default.readProtectedFile(constants_1.rootCACertPath);
            platforms_1.default.deleteProtectedFiles(constants_1.rootCACertPath);
            fs_1.writeFileSync(constants_1.rootCACertPath, caFileContents);
        }
        catch (e) {
            return installCertificateAuthority(options);
        }
        // double check that we have a live one
        const remainingErrors = certErrors();
        if (remainingErrors) {
            return installCertificateAuthority(options);
        }
    });
}
exports.ensureCACertReadable = ensureCACertReadable;
/**
 * Remove as much of the devcert files and state as we can. This is necessary
 * when generating a new root certificate, and should be available to API
 * consumers as well.
 *
 * Not all of it will be removable. If certutil is not installed, we'll leave
 * Firefox alone. We try to remove files with maximum permissions, and if that
 * fails, we'll silently fail.
 *
 * It's also possible that the command to untrust will not work, and we'll
 * silently fail that as well; with no existing certificates anymore, the
 * security exposure there is minimal.
 */
function uninstall() {
    platforms_1.default.removeFromTrustStores(constants_1.rootCACertPath);
    platforms_1.default.deleteProtectedFiles(constants_1.domainsDir);
    platforms_1.default.deleteProtectedFiles(constants_1.rootCADir);
    platforms_1.default.deleteProtectedFiles(constants_1.getLegacyConfigDir());
}
exports.uninstall = uninstall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGUtYXV0aG9yaXR5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ldmFuYmFjb24vRG9jdW1lbnRzL0dpdEh1Yi9kZXZjZXJ0LyIsInNvdXJjZXMiOlsiY2VydGlmaWNhdGUtYXV0aG9yaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUlZO0FBQ1osMERBQWdDO0FBRWhDLDJDQVdxQjtBQUNyQixvRUFBMEM7QUFDMUMsbUNBQXlDO0FBQ3pDLGlEQUE2QztBQUc3QyxNQUFNLEtBQUssR0FBRyxlQUFXLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUUzRDs7O0dBR0c7QUFDSCxxQ0FBMEQsVUFBbUIsRUFBRTs7UUFDN0UsS0FBSyxDQUFDLHFGQUFxRixDQUFDLENBQUM7UUFDN0YsU0FBUyxFQUFFLENBQUM7UUFDWiw0QkFBZ0IsRUFBRSxDQUFDO1FBRW5CLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1FBQ2hFLElBQUksV0FBVyxHQUFHLGFBQUssRUFBRSxDQUFDO1FBRTFCLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1FBQ3hGLGVBQWUsRUFBRSxDQUFDO1FBRWxCLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ2xDLDBCQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekIsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDckMsZUFBTyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLDRCQUFnQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLDBCQUFjLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFNUgsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDbEQsTUFBTSxtQ0FBbUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RCxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztRQUMvRCxNQUFNLG1CQUFlLENBQUMsZ0JBQWdCLENBQUMsMEJBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQUE7QUF0QkQsOENBc0JDO0FBRUQ7OztHQUdHO0FBQ0g7SUFDRSx3REFBd0Q7SUFDeEQsa0JBQVMsQ0FBQyx5QkFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLG1CQUFtQjtJQUNuQixrQkFBUyxDQUFDLG1DQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLGtCQUFTLENBQUMsaUNBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELDZDQUEwRCxFQUFrRzs7UUFDMUosS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDaEUsSUFBSSxZQUFZLEdBQUcsYUFBSyxFQUFFLENBQUM7UUFDM0IsSUFBSSxLQUFLLEdBQUcsTUFBTSxtQkFBZSxDQUFDLGlCQUFpQixDQUFDLHlCQUFhLENBQUMsQ0FBQztRQUNuRSxrQkFBUyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQixNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLDBCQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLGVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQixDQUFDO0NBQUE7QUFQRCxrRkFPQztBQUVELDZDQUFtRCxPQUFlOztRQUNoRSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUM1RCxJQUFJLEdBQUcsR0FBRyxpQkFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyQyxNQUFNLG1CQUFlLENBQUMsa0JBQWtCLENBQUMseUJBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQUE7QUFHRDtJQUNFLElBQUk7UUFDRixlQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLDBCQUFjLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNuRCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNyQjtBQUNILENBQUM7QUFFRCwyREFBMkQ7QUFDM0Q7Ozs7Ozs7O0dBUUc7QUFDSCw4QkFBMkMsVUFBbUIsRUFBRTs7UUFDOUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUNEOzs7O1dBSUc7UUFDSCxJQUFJO1lBQ0YsTUFBTSxjQUFjLEdBQUcsTUFBTSxtQkFBZSxDQUFDLGlCQUFpQixDQUFDLDBCQUFjLENBQUMsQ0FBQztZQUMvRSxtQkFBZSxDQUFDLG9CQUFvQixDQUFDLDBCQUFjLENBQUMsQ0FBQztZQUNyRCxrQkFBUyxDQUFDLDBCQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDM0M7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0M7UUFFRCx1Q0FBdUM7UUFDdkMsTUFBTSxlQUFlLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDckMsSUFBSSxlQUFlLEVBQUU7WUFDbkIsT0FBTywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7Q0FBQTtBQXRCRCxvREFzQkM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSDtJQUNFLG1CQUFlLENBQUMscUJBQXFCLENBQUMsMEJBQWMsQ0FBQyxDQUFDO0lBQ3RELG1CQUFlLENBQUMsb0JBQW9CLENBQUMsc0JBQVUsQ0FBQyxDQUFDO0lBQ2pELG1CQUFlLENBQUMsb0JBQW9CLENBQUMscUJBQVMsQ0FBQyxDQUFDO0lBQ2hELG1CQUFlLENBQUMsb0JBQW9CLENBQUMsOEJBQWtCLEVBQUUsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFMRCw4QkFLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHVubGlua1N5bmMgYXMgcm0sXG4gIHJlYWRGaWxlU3luYyBhcyByZWFkRmlsZSxcbiAgd3JpdGVGaWxlU3luYyBhcyB3cml0ZUZpbGVcbn0gZnJvbSAnZnMnO1xuaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcblxuaW1wb3J0IHtcbiAgZG9tYWluc0RpcixcbiAgcm9vdENBRGlyLFxuICBlbnN1cmVDb25maWdEaXJzLFxuICBnZXRMZWdhY3lDb25maWdEaXIsXG4gIHJvb3RDQUtleVBhdGgsXG4gIHJvb3RDQUNlcnRQYXRoLFxuICBjYVNlbGZTaWduQ29uZmlnLFxuICBvcGVuc3NsU2VyaWFsRmlsZVBhdGgsXG4gIG9wZW5zc2xEYXRhYmFzZUZpbGVQYXRoLFxuICBjYVZlcnNpb25GaWxlXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBjdXJyZW50UGxhdGZvcm0gZnJvbSAnLi9wbGF0Zm9ybXMnO1xuaW1wb3J0IHsgb3BlbnNzbCwgbWt0bXAgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGdlbmVyYXRlS2V5IH0gZnJvbSAnLi9jZXJ0aWZpY2F0ZXMnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb25zdCBkZWJ1ZyA9IGNyZWF0ZURlYnVnKCdkZXZjZXJ0OmNlcnRpZmljYXRlLWF1dGhvcml0eScpO1xuXG4vKipcbiAqIEluc3RhbGwgdGhlIG9uY2UtcGVyLW1hY2hpbmUgdHJ1c3RlZCByb290IENBLiBXZSdsbCB1c2UgdGhpcyBDQSB0byBzaWduXG4gKiBwZXItYXBwIGNlcnRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBpbnN0YWxsQ2VydGlmaWNhdGVBdXRob3JpdHkob3B0aW9uczogT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gIGRlYnVnKGBVbmluc3RhbGxpbmcgZXhpc3RpbmcgY2VydGlmaWNhdGVzLCB3aGljaCB3aWxsIGJlIHZvaWQgb25jZSBhbnkgZXhpc3RpbmcgQ0EgaXMgZ29uZWApO1xuICB1bmluc3RhbGwoKTtcbiAgZW5zdXJlQ29uZmlnRGlycygpO1xuXG4gIGRlYnVnKGBNYWtpbmcgYSB0ZW1wIHdvcmtpbmcgZGlyZWN0b3J5IGZvciBmaWxlcyB0byBjb3BpZWQgaW5gKTtcbiAgbGV0IHJvb3RLZXlQYXRoID0gbWt0bXAoKTtcblxuICBkZWJ1ZyhgR2VuZXJhdGluZyB0aGUgT3BlblNTTCBjb25maWd1cmF0aW9uIG5lZWRlZCB0byBzZXR1cCB0aGUgY2VydGlmaWNhdGUgYXV0aG9yaXR5YCk7XG4gIHNlZWRDb25maWdGaWxlcygpO1xuXG4gIGRlYnVnKGBHZW5lcmF0aW5nIGEgcHJpdmF0ZSBrZXlgKTtcbiAgZ2VuZXJhdGVLZXkocm9vdEtleVBhdGgpO1xuXG4gIGRlYnVnKGBHZW5lcmF0aW5nIGEgQ0EgY2VydGlmaWNhdGVgKTtcbiAgb3BlbnNzbChbJ3JlcScsICctbmV3JywgJy14NTA5JywgJy1jb25maWcnLCBjYVNlbGZTaWduQ29uZmlnLCAnLWtleScsIHJvb3RLZXlQYXRoLCAnLW91dCcsIHJvb3RDQUNlcnRQYXRoLCAnLWRheXMnLCAnODI1J10pO1xuXG4gIGRlYnVnKCdTYXZpbmcgY2VydGlmaWNhdGUgYXV0aG9yaXR5IGNyZWRlbnRpYWxzJyk7XG4gIGF3YWl0IHNhdmVDZXJ0aWZpY2F0ZUF1dGhvcml0eUNyZWRlbnRpYWxzKHJvb3RLZXlQYXRoKTtcblxuICBkZWJ1ZyhgQWRkaW5nIHRoZSByb290IGNlcnRpZmljYXRlIGF1dGhvcml0eSB0byB0cnVzdCBzdG9yZXNgKTtcbiAgYXdhaXQgY3VycmVudFBsYXRmb3JtLmFkZFRvVHJ1c3RTdG9yZXMocm9vdENBQ2VydFBhdGgsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBmaWxlcyBPcGVuU1NMIG5lZWRzIHRvIHNpZ24gY2VydGlmaWNhdGVzIGFzIGEgY2VydGlmaWNhdGVcbiAqIGF1dGhvcml0eSwgYXMgd2VsbCBhcyBvdXIgQ0Egc2V0dXAgdmVyc2lvblxuICovXG5mdW5jdGlvbiBzZWVkQ29uZmlnRmlsZXMoKSB7XG4gIC8vIFRoaXMgaXMgdjIgb2YgdGhlIGRldmNlcnQgY2VydGlmaWNhdGUgYXV0aG9yaXR5IHNldHVwXG4gIHdyaXRlRmlsZShjYVZlcnNpb25GaWxlLCAnMicpO1xuICAvLyBPcGVuU1NMIENBIGZpbGVzXG4gIHdyaXRlRmlsZShvcGVuc3NsRGF0YWJhc2VGaWxlUGF0aCwgJycpO1xuICB3cml0ZUZpbGUob3BlbnNzbFNlcmlhbEZpbGVQYXRoLCAnMDEnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdpdGhDZXJ0aWZpY2F0ZUF1dGhvcml0eUNyZWRlbnRpYWxzKGNiOiAoeyBjYUtleVBhdGgsIGNhQ2VydFBhdGggfTogeyBjYUtleVBhdGg6IHN0cmluZywgY2FDZXJ0UGF0aDogc3RyaW5nIH0pID0+IFByb21pc2U8dm9pZD4gfCB2b2lkKSB7XG4gIGRlYnVnKGBSZXRyaWV2aW5nIGRldmNlcnQncyBjZXJ0aWZpY2F0ZSBhdXRob3JpdHkgY3JlZGVudGlhbHNgKTtcbiAgbGV0IHRtcENBS2V5UGF0aCA9IG1rdG1wKCk7XG4gIGxldCBjYUtleSA9IGF3YWl0IGN1cnJlbnRQbGF0Zm9ybS5yZWFkUHJvdGVjdGVkRmlsZShyb290Q0FLZXlQYXRoKTtcbiAgd3JpdGVGaWxlKHRtcENBS2V5UGF0aCwgY2FLZXkpO1xuICBhd2FpdCBjYih7IGNhS2V5UGF0aDogdG1wQ0FLZXlQYXRoLCBjYUNlcnRQYXRoOiByb290Q0FDZXJ0UGF0aCB9KTtcbiAgcm0odG1wQ0FLZXlQYXRoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZUNlcnRpZmljYXRlQXV0aG9yaXR5Q3JlZGVudGlhbHMoa2V5cGF0aDogc3RyaW5nKSB7XG4gIGRlYnVnKGBTYXZpbmcgZGV2Y2VydCdzIGNlcnRpZmljYXRlIGF1dGhvcml0eSBjcmVkZW50aWFsc2ApO1xuICBsZXQga2V5ID0gcmVhZEZpbGUoa2V5cGF0aCwgJ3V0Zi04Jyk7XG4gIGF3YWl0IGN1cnJlbnRQbGF0Zm9ybS53cml0ZVByb3RlY3RlZEZpbGUocm9vdENBS2V5UGF0aCwga2V5KTtcbn1cblxuXG5mdW5jdGlvbiBjZXJ0RXJyb3JzKCk6IHN0cmluZyB7XG4gIHRyeSB7XG4gICAgb3BlbnNzbChbJ3g1MDknLCAnLWluJywgcm9vdENBQ2VydFBhdGgsICctbm9vdXQnXSk7XG4gICAgcmV0dXJuICcnO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGUudG9TdHJpbmcoKTtcbiAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGhlbHBzIHRvIG1pZ3JhdGUgZnJvbSB2MS4wLnggdG8gPj0gdjEuMS4wLlxuLyoqXG4gKiBTbW9vdGhseSBtaWdyYXRlIHRoZSBjZXJ0aWZpY2F0ZSBzdG9yYWdlIGZyb20gdjEuMC54IHRvID49IHYxLjEuMC5cbiAqIEluIHYxLjEuMCB0aGVyZSBhcmUgbmV3IG9wdGlvbnMgZm9yIHJldHJpZXZpbmcgdGhlIENBIGNlcnQgZGlyZWN0bHksXG4gKiB0byBoZWxwIHRoaXJkLXBhcnR5IE5vZGUgYXBwcyB0cnVzdCB0aGUgcm9vdCBDQS5cbiAqIFxuICogSWYgYSB2MS4wLnggY2VydCBhbHJlYWR5IGV4aXN0cywgdGhlbiBkZXZjZXJ0IGhhcyB3cml0dGVuIGl0IHdpdGhcbiAqIHBsYXRmb3JtLndyaXRlUHJvdGVjdGVkRmlsZSgpLCBzbyBhbiB1bnByaXZpbGVnZWQgcmVhZEZpbGUgY2Fubm90IGFjY2VzcyBpdC5cbiAqIFByZS1kZXRlY3QgYW5kIHJlbWVkeSB0aGlzOyBpdCBzaG91bGQgb25seSBoYXBwZW4gb25jZSBwZXIgaW5zdGFsbGF0aW9uLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlQ0FDZXJ0UmVhZGFibGUob3B0aW9uczogT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghY2VydEVycm9ycygpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8qKlxuICAgKiBvbiB3aW5kb3dzLCB3cml0ZVByb3RlY3RlZEZpbGUgbGVmdCB0aGUgY2VydCBlbmNyeXB0ZWQgb24gKm5peCwgdGhlIGNlcnRcbiAgICogaGFzIG5vIHJlYWQgcGVybWlzc2lvbnMgZWl0aGVyIHdheSwgb3BlbnNzbCB3aWxsIGZhaWwgYW5kIHRoYXQgbWVhbnMgd2VcbiAgICogaGF2ZSB0byBmaXggaXRcbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3QgY2FGaWxlQ29udGVudHMgPSBhd2FpdCBjdXJyZW50UGxhdGZvcm0ucmVhZFByb3RlY3RlZEZpbGUocm9vdENBQ2VydFBhdGgpO1xuICAgIGN1cnJlbnRQbGF0Zm9ybS5kZWxldGVQcm90ZWN0ZWRGaWxlcyhyb290Q0FDZXJ0UGF0aCk7XG4gICAgd3JpdGVGaWxlKHJvb3RDQUNlcnRQYXRoLCBjYUZpbGVDb250ZW50cyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gaW5zdGFsbENlcnRpZmljYXRlQXV0aG9yaXR5KG9wdGlvbnMpO1xuICB9XG4gIFxuICAvLyBkb3VibGUgY2hlY2sgdGhhdCB3ZSBoYXZlIGEgbGl2ZSBvbmVcbiAgY29uc3QgcmVtYWluaW5nRXJyb3JzID0gY2VydEVycm9ycygpO1xuICBpZiAocmVtYWluaW5nRXJyb3JzKSB7XG4gICAgcmV0dXJuIGluc3RhbGxDZXJ0aWZpY2F0ZUF1dGhvcml0eShvcHRpb25zKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhcyBtdWNoIG9mIHRoZSBkZXZjZXJ0IGZpbGVzIGFuZCBzdGF0ZSBhcyB3ZSBjYW4uIFRoaXMgaXMgbmVjZXNzYXJ5XG4gKiB3aGVuIGdlbmVyYXRpbmcgYSBuZXcgcm9vdCBjZXJ0aWZpY2F0ZSwgYW5kIHNob3VsZCBiZSBhdmFpbGFibGUgdG8gQVBJXG4gKiBjb25zdW1lcnMgYXMgd2VsbC5cbiAqIFxuICogTm90IGFsbCBvZiBpdCB3aWxsIGJlIHJlbW92YWJsZS4gSWYgY2VydHV0aWwgaXMgbm90IGluc3RhbGxlZCwgd2UnbGwgbGVhdmVcbiAqIEZpcmVmb3ggYWxvbmUuIFdlIHRyeSB0byByZW1vdmUgZmlsZXMgd2l0aCBtYXhpbXVtIHBlcm1pc3Npb25zLCBhbmQgaWYgdGhhdFxuICogZmFpbHMsIHdlJ2xsIHNpbGVudGx5IGZhaWwuXG4gKiBcbiAqIEl0J3MgYWxzbyBwb3NzaWJsZSB0aGF0IHRoZSBjb21tYW5kIHRvIHVudHJ1c3Qgd2lsbCBub3Qgd29yaywgYW5kIHdlJ2xsXG4gKiBzaWxlbnRseSBmYWlsIHRoYXQgYXMgd2VsbDsgd2l0aCBubyBleGlzdGluZyBjZXJ0aWZpY2F0ZXMgYW55bW9yZSwgdGhlXG4gKiBzZWN1cml0eSBleHBvc3VyZSB0aGVyZSBpcyBtaW5pbWFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5pbnN0YWxsKCk6IHZvaWQge1xuICBjdXJyZW50UGxhdGZvcm0ucmVtb3ZlRnJvbVRydXN0U3RvcmVzKHJvb3RDQUNlcnRQYXRoKTtcbiAgY3VycmVudFBsYXRmb3JtLmRlbGV0ZVByb3RlY3RlZEZpbGVzKGRvbWFpbnNEaXIpO1xuICBjdXJyZW50UGxhdGZvcm0uZGVsZXRlUHJvdGVjdGVkRmlsZXMocm9vdENBRGlyKTtcbiAgY3VycmVudFBsYXRmb3JtLmRlbGV0ZVByb3RlY3RlZEZpbGVzKGdldExlZ2FjeUNvbmZpZ0RpcigpKTtcbn0iXX0=