/// <reference types="node" />
import { pki as PKI } from 'node-forge';
/**
 * Custom X.509 extension that stores information about the Expo project that a code signing certificate is valid for.
 * Used to prevent spoofing of scoping identifiers in Expo Go.
 *
 * Note: Generated with oidgen script. Resides in the Microsoft OID space. Could apply for Expo space but would take time: https://pen.iana.org/pen/PenApplication.page
 */
export declare const expoProjectInformationOID = "1.2.840.113556.1.8000.2554.43437.254.128.102.157.7894389.20439.2.1";
/**
 * Generate a public and private RSA key pair.
 * @returns RSA key pair
 */
export declare function generateKeyPair(): PKI.rsa.KeyPair;
/**
 * Convert a key RSA key pair generated using {@link generateKeyPair} to PEM strings.
 * @param keyPair RSA key pair
 * @returns PEM formatted key pair
 */
export declare function convertKeyPairToPEM(keyPair: PKI.rsa.KeyPair): {
    privateKeyPEM: string;
    publicKeyPEM: string;
};
/**
 * Convert a X.509 certificate generated using {@link generateSelfSignedCodeSigningCertificate} to a PEM string.
 * @param certificate X.509 certificate
 * @returns
 */
export declare function convertCertificateToCertificatePEM(certificate: PKI.Certificate): string;
/**
 * Convert a PEM-formatted RSA key pair to a key pair for use with this library.
 * @param keyPair PEM-formatted private key and public key
 * @returns RSA key pair
 */
export declare function convertKeyPairPEMToKeyPair({ privateKeyPEM, publicKeyPEM, }: {
    privateKeyPEM: string;
    publicKeyPEM: string;
}): PKI.rsa.KeyPair;
/**
 * Convert a PEM-formatted RSA public key to a public key for use with this library.
 * @param publicKeyPEM PEM formatted public key
 * @returns RSA public key
 */
export declare function convertPublicKeyPEMToPublicKey(publicKeyPEM: string): PKI.rsa.PublicKey;
/**
 * Convert a PEM-formatted RSA private key to a private key for use with this library.
 * @param privateKeyPEM PEM formatted private key
 * @returns RSA private key
 */
export declare function convertPrivateKeyPEMToPrivateKey(privateKeyPEM: string): PKI.rsa.PrivateKey;
/**
 * Convert a PEM-formatted X.509 certificate to a certificate for use with this library.
 * @param certificatePEM PEM formatted X.509 certificate
 * @returns  X.509 Certificate
 */
export declare function convertCertificatePEMToCertificate(certificatePEM: string): PKI.Certificate;
/**
 * Convert a CSR to PEM-formatted X.509 CSR
 * @param csr CSR
 * @returns X.509 CSR
 */
export declare function convertCSRToCSRPEM(csr: PKI.CertificateRequest): string;
/**
 * Convert a PEM-formatted X.509 CSR to a CSR
 * @param CSRPEM PEM-formatted X.509 CSR
 * @returns CSR
 */
export declare function convertCSRPEMToCSR(CSRPEM: string): PKI.CertificateRequest;
declare type GenerateParameters = {
    /**
     * Public/private key pair generated via {@link generateKeyPair}.
     */
    keyPair: PKI.rsa.KeyPair;
    /**
     * Certificate validity range start.
     */
    validityNotBefore: Date;
    /**
     * Certificate validity range end.
     */
    validityNotAfter: Date;
    /**
     * CN issuer and subject Distinguished Name (DN).
     * Used for both issuer and subject in the case of self-signed certificates.
     */
    commonName: string;
};
/**
 * Generate a self-signed (root) code-signing certificate valid for use with expo-updates.
 *
 * @returns PKI.Certificate valid for expo-updates code signing
 */
export declare function generateSelfSignedCodeSigningCertificate({ keyPair: { publicKey, privateKey }, validityNotBefore, validityNotAfter, commonName, }: GenerateParameters): PKI.Certificate;
/**
 * Validate that a certificate and corresponding key pair can be used for expo-updates code signing.
 * @param certificate X.509 certificate
 * @param keyPair RSA key pair
 */
export declare function validateSelfSignedCertificate(certificate: PKI.Certificate, keyPair: PKI.rsa.KeyPair): void;
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
export declare function signBufferRSASHA256AndVerify(privateKey: PKI.rsa.PrivateKey, certificate: PKI.Certificate, bufferToSign: Buffer): string;
/**
 * Generate a self-signed CSR for a given key pair. Most commonly used with {@link generateDevelopmentCertificateFromCSR}.
 * @param keyPair RSA key pair
 * @param commonName commonName attribute of the subject of the resulting certificate (human readable name of the certificate)
 * @returns CSR
 */
export declare function generateCSR(keyPair: PKI.rsa.KeyPair, commonName: string): PKI.CertificateRequest;
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
export declare function generateDevelopmentCertificateFromCSR(issuerPrivateKey: PKI.rsa.PrivateKey, issuerCertificate: PKI.Certificate, csr: PKI.CertificateRequest, appId: string, scopeKey: string): PKI.Certificate;
export {};
