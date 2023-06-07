"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sanitizeNpmPackageName = sanitizeNpmPackageName;
exports.npmViewAsync = npmViewAsync;
exports.getNpmUrlAsync = getNpmUrlAsync;
exports.downloadAndExtractNpmModuleAsync = downloadAndExtractNpmModuleAsync;
exports.extractLocalNpmTarballAsync = extractLocalNpmTarballAsync;
exports.extractNpmTarballFromUrlAsync = extractNpmTarballFromUrlAsync;
exports.extractNpmTarballAsync = extractNpmTarballAsync;
var _spawnAsync = _interopRequireDefault(require("@expo/spawn-async"));
var _assert = _interopRequireDefault(require("assert"));
var _fs = _interopRequireDefault(require("fs"));
var _slugify = _interopRequireDefault(require("slugify"));
var _stream = require("stream");
var _tar = _interopRequireDefault(require("tar"));
var _util = require("util");
var _client = require("../api/rest/client");
var _createFileTransform = require("./createFileTransform");
var _dir = require("./dir");
var _errors = require("./errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:utils:npm");
const cachedFetch = (0, _client).createCachedFetch({
    cacheDirectory: "template-cache"
});
function sanitizeNpmPackageName(name) {
    // https://github.com/npm/validate-npm-package-name/#naming-rules
    return applyKnownNpmPackageNameRules(name) || applyKnownNpmPackageNameRules((0, _slugify).default(name)) || // If nothing is left use 'app' like we do in Xcode projects.
    "app";
}
function applyKnownNpmPackageNameRules(name) {
    // https://github.com/npm/validate-npm-package-name/#naming-rules
    // package name cannot start with '.' or '_'.
    while(/^(\.|_)/.test(name)){
        name = name.substring(1);
    }
    name = name.toLowerCase().replace(/[^a-zA-Z._\-/@]/g, "");
    return name// .replace(/![a-z0-9-._~]+/g, '')
    // Remove special characters
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") || null;
}
async function npmViewAsync(...props) {
    var ref;
    const cmd = [
        "view",
        ...props,
        "--json"
    ];
    const results = (ref = (await (0, _spawnAsync).default("npm", cmd)).stdout) == null ? void 0 : ref.trim();
    const cmdString = `npm ${cmd.join(" ")}`;
    debug("Run:", cmdString);
    if (!results) {
        return null;
    }
    try {
        return JSON.parse(results);
    } catch (error) {
        throw new Error(`Could not parse JSON returned from "${cmdString}".\n\n${results}\n\nError: ${error.message}`);
    }
}
async function getNpmUrlAsync(packageName) {
    const results = await npmViewAsync(packageName, "dist.tarball");
    (0, _assert).default(results, `Could not get npm url for package "${packageName}"`);
    // Fully qualified url returns a string.
    // Example:
    // 𝝠 npm view expo-template-bare-minimum@sdk-33 dist.tarball --json
    if (typeof results === "string") {
        return results;
    }
    // When the tag is arbitrary, the tarball url is an array, return the last value as it's the most recent.
    // Example:
    // 𝝠 npm view expo-template-bare-minimum@33 dist.tarball --json
    if (Array.isArray(results)) {
        return results[results.length - 1];
    }
    throw new _errors.CommandError("Expected results of `npm view ...` to be an array or string. Instead found: " + results);
}
// @ts-ignore
const pipeline = (0, _util).promisify(_stream.Stream.pipeline);
async function downloadAndExtractNpmModuleAsync(npmName, props) {
    const url = await getNpmUrlAsync(npmName);
    debug("Fetch from URL:", url);
    await extractNpmTarballFromUrlAsync(url, props);
}
async function extractLocalNpmTarballAsync(tarFilePath, props) {
    const readStream = _fs.default.createReadStream(tarFilePath);
    await extractNpmTarballAsync(readStream, props);
}
async function createUrlStreamAsync(url) {
    const response = await cachedFetch(url);
    if (!response.ok) {
        throw new Error(`Unexpected response: ${response.statusText}. From url: ${url}`);
    }
    return response.body;
}
async function extractNpmTarballFromUrlAsync(url, props) {
    await extractNpmTarballAsync(await createUrlStreamAsync(url), props);
}
async function extractNpmTarballAsync(stream, props) {
    const { cwd , strip , name , fileList =[]  } = props;
    await (0, _dir).ensureDirectoryAsync(cwd);
    await pipeline(stream, _tar.default.extract({
        cwd,
        transform: (0, _createFileTransform).createFileTransform(name),
        onentry: (0, _createFileTransform).createEntryResolver(name),
        strip: strip != null ? strip : 1
    }, fileList));
}

//# sourceMappingURL=npm.js.map