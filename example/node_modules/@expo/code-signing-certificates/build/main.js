"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDevelopmentCertificateFromCSR = exports.generateCSR = exports.signBufferRSASHA256AndVerify = exports.validateSelfSignedCertificate = exports.generateSelfSignedCodeSigningCertificate = exports.convertCSRPEMToCSR = exports.convertCSRToCSRPEM = exports.convertCertificatePEMToCertificate = exports.convertPrivateKeyPEMToPrivateKey = exports.convertPublicKeyPEMToPublicKey = exports.convertKeyPairPEMToKeyPair = exports.convertCertificateToCertificatePEM = exports.convertKeyPairToPEM = exports.generateKeyPair = exports.expoProjectInformationOID = void 0;
const assert_1 = __importDefault(require("assert"));
const node_forge_1 = require("node-forge");
const utils_1 = require("./utils");
/**
 * Custom X.509 extension that stores information about the Expo project that a code signing certificate is valid for.
 * Used to prevent spoofing of scoping identifiers in Expo Go.
 *
 * Note: Generated with oidgen script. Resides in the Microsoft OID space. Could apply for Expo space but would take time: https://pen.iana.org/pen/PenApplication.page
 */
exports.expoProjectInformationOID = '1.2.840.113556.1.8000.2554.43437.254.128.102.157.7894389.20439.2.1';
/**
 * Generate a public and private RSA key pair.
 * @returns RSA key pair
 */
function generateKeyPair() {
    return node_forge_1.pki.rsa.generateKeyPair();
}
exports.generateKeyPair = generateKeyPair;
/**
 * Convert a key RSA key pair generated using {@link generateKeyPair} to PEM strings.
 * @param keyPair RSA key pair
 * @returns PEM formatted key pair
 */
function convertKeyPairToPEM(keyPair) {
    return {
        privateKeyPEM: node_forge_1.pki.privateKeyToPem(keyPair.privateKey),
        publicKeyPEM: node_forge_1.pki.publicKeyToPem(keyPair.publicKey),
    };
}
exports.convertKeyPairToPEM = convertKeyPairToPEM;
/**
 * Convert a X.509 certificate generated using {@link generateSelfSignedCodeSigningCertificate} to a PEM string.
 * @param certificate X.509 certificate
 * @returns
 */
function convertCertificateToCertificatePEM(certificate) {
    return node_forge_1.pki.certificateToPem(certificate);
}
exports.convertCertificateToCertificatePEM = convertCertificateToCertificatePEM;
/**
 * Convert a PEM-formatted RSA key pair to a key pair for use with this library.
 * @param keyPair PEM-formatted private key and public key
 * @returns RSA key pair
 */
function convertKeyPairPEMToKeyPair({ privateKeyPEM, publicKeyPEM, }) {
    return {
        privateKey: node_forge_1.pki.privateKeyFromPem(privateKeyPEM),
        publicKey: node_forge_1.pki.publicKeyFromPem(publicKeyPEM),
    };
}
exports.convertKeyPairPEMToKeyPair = convertKeyPairPEMToKeyPair;
/**
 * Convert a PEM-formatted RSA public key to a public key for use with this library.
 * @param publicKeyPEM PEM formatted public key
 * @returns RSA public key
 */
function convertPublicKeyPEMToPublicKey(publicKeyPEM) {
    return node_forge_1.pki.publicKeyFromPem(publicKeyPEM);
}
exports.convertPublicKeyPEMToPublicKey = convertPublicKeyPEMToPublicKey;
/**
 * Convert a PEM-formatted RSA private key to a private key for use with this library.
 * @param privateKeyPEM PEM formatted private key
 * @returns RSA private key
 */
function convertPrivateKeyPEMToPrivateKey(privateKeyPEM) {
    return node_forge_1.pki.privateKeyFromPem(privateKeyPEM);
}
exports.convertPrivateKeyPEMToPrivateKey = convertPrivateKeyPEMToPrivateKey;
/**
 * Convert a PEM-formatted X.509 certificate to a certificate for use with this library.
 * @param certificatePEM PEM formatted X.509 certificate
 * @returns  X.509 Certificate
 */
function convertCertificatePEMToCertificate(certificatePEM) {
    return node_forge_1.pki.certificateFromPem(certificatePEM, true);
}
exports.convertCertificatePEMToCertificate = convertCertificatePEMToCertificate;
/**
 * Convert a CSR to PEM-formatted X.509 CSR
 * @param csr CSR
 * @returns X.509 CSR
 */
function convertCSRToCSRPEM(csr) {
    return node_forge_1.pki.certificationRequestToPem(csr);
}
exports.convertCSRToCSRPEM = convertCSRToCSRPEM;
/**
 * Convert a PEM-formatted X.509 CSR to a CSR
 * @param CSRPEM PEM-formatted X.509 CSR
 * @returns CSR
 */
function convertCSRPEMToCSR(CSRPEM) {
    return node_forge_1.pki.certificationRequestFromPem(CSRPEM, true);
}
exports.convertCSRPEMToCSR = convertCSRPEMToCSR;
/**
 * Generate a self-signed (root) code-signing certificate valid for use with expo-updates.
 *
 * @returns PKI.Certificate valid for expo-updates code signing
 */
function generateSelfSignedCodeSigningCertificate({ keyPair: { publicKey, privateKey }, validityNotBefore, validityNotAfter, commonName, }) {
    const cert = node_forge_1.pki.createCertificate();
    cert.publicKey = publicKey;
    cert.serialNumber = (0, utils_1.toPositiveHex)(node_forge_1.util.bytesToHex(node_forge_1.random.getBytesSync(9)));
    (0, assert_1.default)(validityNotAfter > validityNotBefore, 'validityNotAfter must be later than validityNotBefore');
    cert.validity.notBefore = validityNotBefore;
    cert.validity.notAfter = validityNotAfter;
    const attrs = [
        {
            name: 'commonName',
            value: commonName,
        },
    ];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.setExtensions([
        {
            name: 'keyUsage',
            critical: true,
            keyCertSign: false,
            digitalSignature: true,
            nonRepudiation: false,
            keyEncipherment: false,
            dataEncipherment: false,
        },
        {
            name: 'extKeyUsage',
            critical: true,
            serverAuth: false,
            clientAuth: false,
            codeSigning: true,
            emailProtection: false,
            timeStamping: false,
        },
    ]);
    cert.sign(privateKey, node_forge_1.md.sha256.create());
    return cert;
}
exports.generateSelfSignedCodeSigningCertificate = generateSelfSignedCodeSigningCertificate;
function arePublicKeysEqual(key1, key2) {
    return key1.n.equals(key2.n) && key1.e.equals(key2.e);
}
function doPrivateAndPublicKeysMatch(privateKey, publicKey) {
    return publicKey.n.equals(privateKey.n) && publicKey.e.equals(privateKey.e);
}
/**
 * Validate that a certificate and corresponding key pair can be used for expo-updates code signing.
 * @param certificate X.509 certificate
 * @param keyPair RSA key pair
 */
function validateSelfSignedCertificate(certificate, keyPair) {
    if (certificate.issuer.hash !== certificate.subject.hash) {
        throw new Error('Certificate issuer hash does not match subject hash, indicating certificate is not self-signed.');
    }
    const now = new Date();
    if (certificate.validity.notBefore > now || certificate.validity.notAfter < now) {
        throw new Error('Certificate validity expired');
    }
    const keyUsage = certificate.getExtension('keyUsage');
    const digitalSignature = keyUsage.digitalSignature;
    if (!keyUsage || !digitalSignature) {
        throw new Error('X509v3 Key Usage: Digital Signature not present');
    }
    const extKeyUsage = certificate.getExtension('extKeyUsage');
    const codeSigning = extKeyUsage.codeSigning;
    if (!extKeyUsage || !codeSigning) {
        throw new Error('X509v3 Extended Key Usage: Code Signing not present');
    }
    const isValid = certificate.verify(certificate);
    if (!isValid) {
        throw new Error('Certificate signature not valid');
    }
    const certificatePublicKey = certificate.publicKey;
    if (!arePublicKeysEqual(certificatePublicKey, keyPair.publicKey)) {
        throw new Error('Certificate pubic key does not match key pair public key');
    }
    if (!doPrivateAndPublicKeysMatch(keyPair.privateKey, keyPair.publicKey)) {
        throw new Error('keyPair key mismatch');
    }
}
exports.validateSelfSignedCertificate = validateSelfSignedCertificate;
/**
 * Sign a SHA-256 hash of the provided string with an RSA private key and verify that the signature
 * is valid for the RSA public key in the certificate. The verification part is most useful for
 * debugging, so while this may be used in server implementation for expo-updates code signing,
 * a similar method without verification can be created for efficiency for use in production.
 *
 * @param privateKey RSA private key
 * @param certificate X.509 certificate
 * @param bufferToSign buffer to hash, generate a signature for, and verify
 * @returns base64-encoded RSA signature
 */
function signBufferRSASHA256AndVerify(privateKey, certificate, bufferToSign) {
    const digest = node_forge_1.md.sha256.create().update(bufferToSign.toString('binary'));
    const digestSignature = privateKey.sign(digest);
    const isValidSignature = certificate.publicKey.verify(digest.digest().getBytes(), digestSignature);
    if (!isValidSignature) {
        throw new Error('Signature generated with private key not valid for certificate');
    }
    return node_forge_1.util.encode64(digestSignature);
}
exports.signBufferRSASHA256AndVerify = signBufferRSASHA256AndVerify;
/**
 * Generate a self-signed CSR for a given key pair. Most commonly used with {@link generateDevelopmentCertificateFromCSR}.
 * @param keyPair RSA key pair
 * @param commonName commonName attribute of the subject of the resulting certificate (human readable name of the certificate)
 * @returns CSR
 */
function generateCSR(keyPair, commonName) {
    const csr = node_forge_1.pki.createCertificationRequest();
    csr.publicKey = keyPair.publicKey;
    const attrs = [
        {
            name: 'commonName',
            value: commonName,
        },
    ];
    csr.setSubject(attrs);
    csr.sign(keyPair.privateKey, node_forge_1.md.sha256.create());
    return csr;
}
exports.generateCSR = generateCSR;
/**
 * For use by a server to generate a development certificate (good for 30 days) for a particular
 * appId and scopeKey (Expo project manifest fields verified by the client during certificate validation).
 *
 * Note that this function assumes the issuer is trusted, and that the user that created the CSR and issued
 * the request has permission to sign manifests for the appId and scopeKey. This constraint must be
 * verified on the server before calling this method.
 *
 * @param issuerPrivateKey private key to sign the resulting certificate with
 * @param issuerCertificate parent certificate (should be a CA) of the resulting certificate
 * @param csr certificate signing request containing the user's public key
 * @param appId app ID (UUID) of the app that the resulting certificate will sign the development manifest for
 * @param scopeKey scope key of the app that the resuting certificate will sign the development manifest for
 * @returns certificate to use to sign development manifests
 */
function generateDevelopmentCertificateFromCSR(issuerPrivateKey, issuerCertificate, csr, appId, scopeKey) {
    (0, assert_1.default)(csr.verify(csr), 'CSR not self-signed');
    const certificate = node_forge_1.pki.createCertificate();
    certificate.publicKey = csr.publicKey;
    certificate.serialNumber = (0, utils_1.toPositiveHex)(node_forge_1.util.bytesToHex(node_forge_1.random.getBytesSync(9)));
    // set certificate subject attrs from CSR
    certificate.setSubject(csr.subject.attributes);
    // 30 day validity into the future, 1 day in the past just in case of clock skew at callsite
    certificate.validity.notBefore = new Date();
    certificate.validity.notBefore.setDate(certificate.validity.notBefore.getDate() - 1);
    certificate.validity.notAfter = new Date();
    certificate.validity.notAfter.setDate(certificate.validity.notBefore.getDate() + 30);
    certificate.setIssuer(issuerCertificate.subject.attributes);
    certificate.setExtensions([
        {
            name: 'keyUsage',
            critical: true,
            keyCertSign: false,
            digitalSignature: true,
            nonRepudiation: false,
            keyEncipherment: false,
            dataEncipherment: false,
        },
        {
            name: 'extKeyUsage',
            critical: true,
            serverAuth: false,
            clientAuth: false,
            codeSigning: true,
            emailProtection: false,
            timeStamping: false,
        },
        {
            name: 'expoProjectInformation',
            id: exports.expoProjectInformationOID,
            // critical: true, // can't be critical since openssl verify doesn't know about this extension
            value: `${appId},${scopeKey}`,
        },
    ]);
    certificate.sign(issuerPrivateKey, node_forge_1.md.sha256.create());
    return certificate;
}
exports.generateDevelopmentCertificateFromCSR = generateDevelopmentCertificateFromCSR;
//# sourceMappingURL=main.js.map