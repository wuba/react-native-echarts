"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import path from 'path';
const debug_1 = tslib_1.__importDefault(require("debug"));
const mkdirp_1 = require("mkdirp");
const fs_1 = require("fs");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const certificate_authority_1 = require("./certificate-authority");
const debug = debug_1.default('devcert:certificates');
/**
 * Generate a domain certificate signed by the devcert root CA. Domain
 * certificates are cached in their own directories under
 * CONFIG_ROOT/domains/<domain>, and reused on subsequent requests. Because the
 * individual domain certificates are signed by the devcert root CA (which was
 * added to the OS/browser trust stores), they are trusted.
 */
function generateDomainCertificate(domain) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        mkdirp_1.sync(constants_1.pathForDomain(domain));
        debug(`Generating private key for ${domain}`);
        let domainKeyPath = constants_1.pathForDomain(domain, 'private-key.key');
        generateKey(domainKeyPath);
        debug(`Generating certificate signing request for ${domain}`);
        let csrFile = constants_1.pathForDomain(domain, `certificate-signing-request.csr`);
        constants_1.withDomainSigningRequestConfig(domain, (configpath) => {
            utils_1.openssl(['req', '-new', '-config', configpath, '-key', domainKeyPath, '-out', csrFile]);
        });
        debug(`Generating certificate for ${domain} from signing request and signing with root CA`);
        let domainCertPath = constants_1.pathForDomain(domain, `certificate.crt`);
        yield certificate_authority_1.withCertificateAuthorityCredentials(({ caKeyPath, caCertPath }) => {
            constants_1.withDomainCertificateConfig(domain, (domainCertConfigPath) => {
                utils_1.openssl(['ca', '-config', domainCertConfigPath, '-in', csrFile, '-out', domainCertPath, '-keyfile', caKeyPath, '-cert', caCertPath, '-days', '825', '-batch']);
            });
        });
    });
}
exports.default = generateDomainCertificate;
// Generate a cryptographic key, used to sign certificates or certificate signing requests.
function generateKey(filename) {
    debug(`generateKey: ${filename}`);
    utils_1.openssl(['genrsa', '-out', filename, '2048']);
    fs_1.chmodSync(filename, 400);
}
exports.generateKey = generateKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGVzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ldmFuYmFjb24vRG9jdW1lbnRzL0dpdEh1Yi9kZXZjZXJ0LyIsInNvdXJjZXMiOlsiY2VydGlmaWNhdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiwwREFBZ0M7QUFDaEMsbUNBQXdDO0FBQ3hDLDJCQUF3QztBQUN4QywyQ0FBeUc7QUFDekcsbUNBQWtDO0FBQ2xDLG1FQUE4RTtBQUU5RSxNQUFNLEtBQUssR0FBRyxlQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVsRDs7Ozs7O0dBTUc7QUFDSCxtQ0FBd0QsTUFBYzs7UUFDcEUsYUFBTSxDQUFDLHlCQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUU5QixLQUFLLENBQUMsOEJBQStCLE1BQU8sRUFBRSxDQUFDLENBQUM7UUFDaEQsSUFBSSxhQUFhLEdBQUcseUJBQWEsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUM3RCxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFM0IsS0FBSyxDQUFDLDhDQUErQyxNQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksT0FBTyxHQUFHLHlCQUFhLENBQUMsTUFBTSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7UUFDdkUsMENBQThCLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDcEQsZUFBTyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDMUYsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsOEJBQStCLE1BQU8sZ0RBQWdELENBQUMsQ0FBQztRQUM5RixJQUFJLGNBQWMsR0FBRyx5QkFBYSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRTlELE1BQU0sMkRBQW1DLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO1lBQ3RFLHVDQUEyQixDQUFDLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixFQUFFLEVBQUU7Z0JBQzNELGVBQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFDaEssQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQXJCRCw0Q0FxQkM7QUFFRCwyRkFBMkY7QUFDM0YscUJBQTRCLFFBQWdCO0lBQzFDLEtBQUssQ0FBQyxnQkFBaUIsUUFBUyxFQUFFLENBQUMsQ0FBQztJQUNwQyxlQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlDLGNBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUpELGtDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHsgc3luYyBhcyBta2RpcnAgfSBmcm9tICdta2RpcnAnO1xuaW1wb3J0IHsgY2htb2RTeW5jIGFzIGNobW9kIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcGF0aEZvckRvbWFpbiwgd2l0aERvbWFpblNpZ25pbmdSZXF1ZXN0Q29uZmlnLCB3aXRoRG9tYWluQ2VydGlmaWNhdGVDb25maWcgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBvcGVuc3NsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB3aXRoQ2VydGlmaWNhdGVBdXRob3JpdHlDcmVkZW50aWFscyB9IGZyb20gJy4vY2VydGlmaWNhdGUtYXV0aG9yaXR5JztcblxuY29uc3QgZGVidWcgPSBjcmVhdGVEZWJ1ZygnZGV2Y2VydDpjZXJ0aWZpY2F0ZXMnKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGRvbWFpbiBjZXJ0aWZpY2F0ZSBzaWduZWQgYnkgdGhlIGRldmNlcnQgcm9vdCBDQS4gRG9tYWluXG4gKiBjZXJ0aWZpY2F0ZXMgYXJlIGNhY2hlZCBpbiB0aGVpciBvd24gZGlyZWN0b3JpZXMgdW5kZXJcbiAqIENPTkZJR19ST09UL2RvbWFpbnMvPGRvbWFpbj4sIGFuZCByZXVzZWQgb24gc3Vic2VxdWVudCByZXF1ZXN0cy4gQmVjYXVzZSB0aGVcbiAqIGluZGl2aWR1YWwgZG9tYWluIGNlcnRpZmljYXRlcyBhcmUgc2lnbmVkIGJ5IHRoZSBkZXZjZXJ0IHJvb3QgQ0EgKHdoaWNoIHdhc1xuICogYWRkZWQgdG8gdGhlIE9TL2Jyb3dzZXIgdHJ1c3Qgc3RvcmVzKSwgdGhleSBhcmUgdHJ1c3RlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVEb21haW5DZXJ0aWZpY2F0ZShkb21haW46IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBta2RpcnAocGF0aEZvckRvbWFpbihkb21haW4pKTtcblxuICBkZWJ1ZyhgR2VuZXJhdGluZyBwcml2YXRlIGtleSBmb3IgJHsgZG9tYWluIH1gKTtcbiAgbGV0IGRvbWFpbktleVBhdGggPSBwYXRoRm9yRG9tYWluKGRvbWFpbiwgJ3ByaXZhdGUta2V5LmtleScpO1xuICBnZW5lcmF0ZUtleShkb21haW5LZXlQYXRoKTtcblxuICBkZWJ1ZyhgR2VuZXJhdGluZyBjZXJ0aWZpY2F0ZSBzaWduaW5nIHJlcXVlc3QgZm9yICR7IGRvbWFpbiB9YCk7XG4gIGxldCBjc3JGaWxlID0gcGF0aEZvckRvbWFpbihkb21haW4sIGBjZXJ0aWZpY2F0ZS1zaWduaW5nLXJlcXVlc3QuY3NyYCk7XG4gIHdpdGhEb21haW5TaWduaW5nUmVxdWVzdENvbmZpZyhkb21haW4sIChjb25maWdwYXRoKSA9PiB7XG4gICAgb3BlbnNzbChbJ3JlcScsICctbmV3JywgJy1jb25maWcnLCBjb25maWdwYXRoLCAnLWtleScsIGRvbWFpbktleVBhdGgsICctb3V0JywgY3NyRmlsZV0pO1xuICB9KTtcblxuICBkZWJ1ZyhgR2VuZXJhdGluZyBjZXJ0aWZpY2F0ZSBmb3IgJHsgZG9tYWluIH0gZnJvbSBzaWduaW5nIHJlcXVlc3QgYW5kIHNpZ25pbmcgd2l0aCByb290IENBYCk7XG4gIGxldCBkb21haW5DZXJ0UGF0aCA9IHBhdGhGb3JEb21haW4oZG9tYWluLCBgY2VydGlmaWNhdGUuY3J0YCk7XG5cbiAgYXdhaXQgd2l0aENlcnRpZmljYXRlQXV0aG9yaXR5Q3JlZGVudGlhbHMoKHsgY2FLZXlQYXRoLCBjYUNlcnRQYXRoIH0pID0+IHtcbiAgICB3aXRoRG9tYWluQ2VydGlmaWNhdGVDb25maWcoZG9tYWluLCAoZG9tYWluQ2VydENvbmZpZ1BhdGgpID0+IHtcbiAgICAgIG9wZW5zc2woWydjYScsICctY29uZmlnJywgZG9tYWluQ2VydENvbmZpZ1BhdGgsICctaW4nLCBjc3JGaWxlLCAnLW91dCcsIGRvbWFpbkNlcnRQYXRoLCAnLWtleWZpbGUnLCBjYUtleVBhdGgsICctY2VydCcsIGNhQ2VydFBhdGgsICctZGF5cycsICc4MjUnLCAnLWJhdGNoJ10pXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBHZW5lcmF0ZSBhIGNyeXB0b2dyYXBoaWMga2V5LCB1c2VkIHRvIHNpZ24gY2VydGlmaWNhdGVzIG9yIGNlcnRpZmljYXRlIHNpZ25pbmcgcmVxdWVzdHMuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVLZXkoZmlsZW5hbWU6IHN0cmluZyk6IHZvaWQge1xuICBkZWJ1ZyhgZ2VuZXJhdGVLZXk6ICR7IGZpbGVuYW1lIH1gKTtcbiAgb3BlbnNzbChbJ2dlbnJzYScsICctb3V0JywgZmlsZW5hbWUsICcyMDQ4J10pO1xuICBjaG1vZChmaWxlbmFtZSwgNDAwKTtcbn0iXX0=