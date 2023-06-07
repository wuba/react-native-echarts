"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const node_forge_1 = require("node-forge");
const path_1 = __importDefault(require("path"));
const main_1 = require("../main");
describe(main_1.generateKeyPair, () => {
    it('generates a key pair', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        expect(keyPair.privateKey).toBeTruthy();
        expect(keyPair.publicKey).toBeTruthy();
        expect(keyPair.publicKey.n.bitLength()).toEqual(2048);
        const digest = node_forge_1.md.sha256.create().update('hello');
        expect(keyPair.publicKey.verify(digest.digest().getBytes(), keyPair.privateKey.sign(digest))).toBeTruthy();
    });
});
describe(main_1.convertKeyPairToPEM, () => {
    it('converts key pair to PEM', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const keyPairPEM = (0, main_1.convertKeyPairToPEM)(keyPair);
        expect(keyPairPEM.privateKeyPEM).toBeTruthy();
        expect(keyPairPEM.publicKeyPEM).toBeTruthy();
    });
});
describe(main_1.convertCertificateToCertificatePEM, () => {
    it('converts certificate to PEM', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        validityNotAfter.setFullYear(validityNotAfter.getFullYear() + 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: new Date(),
            commonName: 'test',
        });
        expect((0, main_1.convertCertificateToCertificatePEM)(certificate)).toBeTruthy();
    });
});
describe(main_1.convertKeyPairPEMToKeyPair, () => {
    it('converts key pair PEM to key pair', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const keyPairPEM = (0, main_1.convertKeyPairToPEM)(keyPair);
        expect((0, main_1.convertKeyPairPEMToKeyPair)(keyPairPEM)).toBeTruthy();
    });
});
describe(main_1.convertCertificatePEMToCertificate, () => {
    it('converts certificate PEM to certificate', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        validityNotAfter.setFullYear(validityNotAfter.getFullYear() + 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: new Date(),
            commonName: 'test',
        });
        expect((0, main_1.convertCertificatePEMToCertificate)((0, main_1.convertCertificateToCertificatePEM)(certificate))).toBeTruthy();
    });
});
describe(main_1.generateSelfSignedCodeSigningCertificate, () => {
    it('generates certificate with correct data', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        validityNotAfter.setFullYear(validityNotAfter.getFullYear() + 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: new Date(),
            commonName: 'Test',
        });
        // check self-signed
        expect(certificate.verify(certificate)).toBe(true);
        // check extensions
        expect(certificate.getExtension('keyUsage')).toMatchObject({
            critical: true,
            dataEncipherment: false,
            digitalSignature: true,
            id: '2.5.29.15',
            keyCertSign: false,
            keyEncipherment: false,
            name: 'keyUsage',
            nonRepudiation: false,
        });
        expect(certificate.getExtension('extKeyUsage')).toMatchObject({
            clientAuth: false,
            codeSigning: true,
            critical: true,
            emailProtection: false,
            id: '2.5.29.37',
            name: 'extKeyUsage',
            serverAuth: false,
            timeStamping: false,
        });
    });
});
describe(main_1.validateSelfSignedCertificate, () => {
    it('does not throw for certificate generated with generateSelfSignedCodeSigningCertificate', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        validityNotAfter.setFullYear(validityNotAfter.getFullYear() + 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: new Date(),
            commonName: 'Test',
        });
        expect(() => (0, main_1.validateSelfSignedCertificate)(certificate, keyPair)).not.toThrow();
    });
    it('throws when certificate is expired', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        const validity = new Date();
        validity.setFullYear(validity.getFullYear() - 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: validity,
            commonName: 'Test',
        });
        expect(() => (0, main_1.validateSelfSignedCertificate)(certificate, keyPair)).toThrow('Certificate validity expired');
    });
    it('throws when missing keyUsage', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        validityNotAfter.setFullYear(validityNotAfter.getFullYear() + 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: new Date(),
            commonName: 'Test',
        });
        certificate.setExtensions([
            {
                name: 'keyUsage',
                critical: true,
                keyCertSign: false,
                digitalSignature: false,
                nonRepudiation: false,
                keyEncipherment: false,
                dataEncipherment: false,
            },
        ]);
        expect(() => (0, main_1.validateSelfSignedCertificate)(certificate, keyPair)).toThrow('X509v3 Key Usage: Digital Signature not present');
    });
    it('throws when missing extKeyUsage', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        validityNotAfter.setFullYear(validityNotAfter.getFullYear() + 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: new Date(),
            commonName: 'Test',
        });
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
                codeSigning: false,
                emailProtection: false,
                timeStamping: false,
            },
        ]);
        expect(() => (0, main_1.validateSelfSignedCertificate)(certificate, keyPair)).toThrow('X509v3 Extended Key Usage: Code Signing not present');
    });
    it('throws when certificate public key does not match key pair', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const keyPair2 = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        validityNotAfter.setFullYear(validityNotAfter.getFullYear() + 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: new Date(),
            commonName: 'Test',
        });
        expect(() => (0, main_1.validateSelfSignedCertificate)(certificate, keyPair2)).toThrow('Certificate pubic key does not match key pair public key');
    });
    it('throws when private key does not match public key', () => {
        const keyPair = (0, main_1.generateKeyPair)();
        const keyPair2 = (0, main_1.generateKeyPair)();
        const validityNotAfter = new Date();
        validityNotAfter.setFullYear(validityNotAfter.getFullYear() + 1);
        const certificate = (0, main_1.generateSelfSignedCodeSigningCertificate)({
            keyPair,
            validityNotAfter,
            validityNotBefore: new Date(),
            commonName: 'Test',
        });
        const keyPairManual = {
            publicKey: keyPair.publicKey,
            privateKey: keyPair2.privateKey,
        };
        expect(() => (0, main_1.validateSelfSignedCertificate)(certificate, keyPairManual)).toThrow('keyPair key mismatch');
    });
});
describe(main_1.signBufferRSASHA256AndVerify, () => {
    it('signs and verifies', async () => {
        const [privateKeyPEM, certificatePEM] = await Promise.all([
            fs_1.promises.readFile(path_1.default.join(__dirname, './fixtures/test-private-key.pem'), 'utf8'),
            fs_1.promises.readFile(path_1.default.join(__dirname, './fixtures/test-certificate.pem'), 'utf8'),
        ]);
        const privateKey = (0, main_1.convertPrivateKeyPEMToPrivateKey)(privateKeyPEM);
        const certificate = (0, main_1.convertCertificatePEMToCertificate)(certificatePEM);
        const signature = (0, main_1.signBufferRSASHA256AndVerify)(privateKey, certificate, Buffer.from('hello', 'utf-8'));
        expect(signature).toMatchSnapshot();
    });
    test.each([['a', 'öäå']])('encoding assumption about node-forge: case %p', (input) => {
        expect(Buffer.from(input).toString('binary')).toEqual(node_forge_1.util.encodeUtf8(input));
        expect(Buffer.from(input, 'utf-8').toString('binary')).toEqual(node_forge_1.util.encodeUtf8(input));
    });
});
describe('CSR generation and certificate generation from CA + CSR', () => {
    it('generates a development certificate', async () => {
        const [issuerPrivateKeyPEM, issuerCertificatePEM] = await Promise.all([
            fs_1.promises.readFile(path_1.default.join(__dirname, './fixtures/test-private-key.pem'), 'utf8'),
            fs_1.promises.readFile(path_1.default.join(__dirname, './fixtures/test-certificate.pem'), 'utf8'),
        ]);
        const issuerPrivateKey = (0, main_1.convertPrivateKeyPEMToPrivateKey)(issuerPrivateKeyPEM);
        const issuerCertificate = (0, main_1.convertCertificatePEMToCertificate)(issuerCertificatePEM);
        const keyPair = (0, main_1.generateKeyPair)();
        const csr1 = (0, main_1.generateCSR)(keyPair, 'Test common name');
        const csrPEM = (0, main_1.convertCSRToCSRPEM)(csr1);
        const csr = (0, main_1.convertCSRPEMToCSR)(csrPEM);
        const certificate = (0, main_1.generateDevelopmentCertificateFromCSR)(issuerPrivateKey, issuerCertificate, csr, 'testApp', 'testScopeKey');
        // check signed by issuer
        expect(issuerCertificate.verify(certificate)).toBe(true);
        // check subject attributes are transferred
        expect(certificate.subject.getField('CN').value).toEqual('Test common name');
        // check extensions
        expect(certificate.getExtension('keyUsage')).toMatchObject({
            critical: true,
            dataEncipherment: false,
            digitalSignature: true,
            id: '2.5.29.15',
            keyCertSign: false,
            keyEncipherment: false,
            name: 'keyUsage',
            nonRepudiation: false,
        });
        expect(certificate.getExtension('extKeyUsage')).toMatchObject({
            clientAuth: false,
            codeSigning: true,
            critical: true,
            emailProtection: false,
            id: '2.5.29.37',
            name: 'extKeyUsage',
            serverAuth: false,
            timeStamping: false,
        });
        expect(certificate.getExtension('expoProjectInformation')).toMatchObject({
            name: 'expoProjectInformation',
            id: main_1.expoProjectInformationOID,
            value: 'testApp,testScopeKey',
        });
        expect(certificate.validity.notBefore.getTime()).toBeLessThanOrEqual(Date.now());
        const expectedNotAfter = certificate.validity.notBefore;
        expectedNotAfter.setDate(expectedNotAfter.getDate() + 30);
        expect(certificate.validity.notAfter.getTime()).toEqual(expectedNotAfter.getTime());
    });
});
//# sourceMappingURL=main-test.js.map