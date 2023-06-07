#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const _1 = require(".");
const HTML_1 = require("./HTML");
const update_1 = __importDefault(require("./update"));
const packageJson = () => require('../package.json');
const program = new commander_1.Command(packageJson().name).version(packageJson().version);
const validateSourceArgument = (src, command) => {
    if (!src) {
        console.error(chalk_1.default.black.bgRed(`You must supply a valid image path or remote URL. Example:`));
        console.error(`\n   $ expo-pwa ${command} -i ./assets/icon.png`);
        console.error();
        process.exit(-1);
    }
};
function outputCommand(name, examples = []) {
    return program
        .command(`${name} [project-root]`)
        .option('-i, --input <file>', 'Input file to process')
        .option('-o, --output <path>', 'Output directory. Default: <project-root/>web')
        .option('-p, --public <path>', 'Public folder. Default: <output>')
        .on('--help', () => {
        if (!examples.length)
            return;
        console.log();
        console.log('Examples:');
        console.log();
        for (const example of examples) {
            console.log(`  $ expo-pwa ${name} ${example}`);
        }
        console.log();
    });
}
function assetCommand(name, examples = []) {
    return outputCommand(name, examples)
        .option('-r, --resize', 'Resize mode to use [contain, cover]', 'contain')
        .option('-c, --color', 'CSS background color for to use for the images (should be opaque).');
}
assetCommand('icon', ['--platform safari -i ./icon.png', '--platform chrome -i ./icon.png'])
    .description('Generate the home screen icons for a PWA')
    .option('--platform [string]', 'Platform to generate for: safari, chrome')
    .action(async (inputProjectRoot, options) => {
    var _a;
    validateSourceArgument(options.input, 'favicon');
    const projectRoot = inputProjectRoot !== null && inputProjectRoot !== void 0 ? inputProjectRoot : process.cwd();
    const output = (_a = options.output) !== null && _a !== void 0 ? _a : (0, path_1.join)(projectRoot, 'web');
    try {
        await generateAssets(projectRoot, options.platform + '-icon', {
            src: options.input,
            output,
            publicPath: options.public || output,
            resizeMode: options.resize,
            color: options.color || 'transparent',
        });
        await (0, update_1.default)();
    }
    catch (error) {
        await commandDidThrowAsync(error);
    }
});
assetCommand('favicon', ['-i ./icon.png'])
    .description('Generate the favicons for a website')
    .action(async (inputProjectRoot, options) => {
    var _a;
    validateSourceArgument(options.input, 'favicon');
    const projectRoot = inputProjectRoot !== null && inputProjectRoot !== void 0 ? inputProjectRoot : process.cwd();
    const output = (_a = options.output) !== null && _a !== void 0 ? _a : (0, path_1.join)(projectRoot, 'web');
    try {
        await generateAssets(projectRoot, 'favicon', {
            src: options.input,
            output,
            publicPath: options.public || output,
            resizeMode: options.resize,
            color: options.color || 'transparent',
        });
        await (0, update_1.default)();
    }
    catch (error) {
        await commandDidThrowAsync(error);
    }
});
assetCommand('splash', ['--color blue --resize cover -i ./splash.png'])
    .description('Generate the Safari splash screens for a PWA')
    .action(async (inputProjectRoot, options) => {
    var _a;
    validateSourceArgument(options.input, 'favicon');
    const projectRoot = inputProjectRoot !== null && inputProjectRoot !== void 0 ? inputProjectRoot : process.cwd();
    const output = (_a = options.output) !== null && _a !== void 0 ? _a : (0, path_1.join)(projectRoot, 'web');
    try {
        await generateAssets(projectRoot, 'splash', {
            src: options.input,
            output,
            publicPath: options.public || output,
            resizeMode: options.resize,
            color: options.color || 'white',
        });
        await (0, update_1.default)();
    }
    catch (error) {
        await commandDidThrowAsync(error);
    }
});
outputCommand('manifest', ['-i ./random.config.js'])
    .description('Generate the PWA manifest from an Expo project config')
    .action(async (inputProjectRoot, options) => {
    var _a, _b;
    const projectRoot = (0, path_1.resolve)(inputProjectRoot !== null && inputProjectRoot !== void 0 ? inputProjectRoot : process.cwd());
    const output = (_a = options.output) !== null && _a !== void 0 ? _a : (0, path_1.join)(projectRoot, 'web');
    const publicPath = (0, path_1.resolve)((_b = options.public) !== null && _b !== void 0 ? _b : output);
    const outputPath = (0, path_1.resolve)(output);
    try {
        const items = await (0, _1.generateManifestAsync)({
            projectRoot: (0, path_1.resolve)(projectRoot),
            publicPath,
        }, options.input ? (0, path_1.resolve)(options.input) : undefined);
        await resolveOutputAsync(publicPath, outputPath, items);
        await (0, update_1.default)();
    }
    catch (error) {
        await commandDidThrowAsync(error);
    }
});
program.parse(process.argv);
async function generateAssets(projectRoot, type, { src, output, publicPath, color: backgroundColor, resizeMode = 'contain' }) {
    if (!isResizeMode(resizeMode)) {
        console.error(chalk_1.default.black.bgRed(`The provided resizeMode "${resizeMode}" is invalid. Please use one of [cover, contain]`));
        process.exit(-1);
    }
    const items = await (0, _1.generateAsync)(type, { projectRoot: (0, path_1.resolve)(projectRoot || process.cwd()), publicPath: (0, path_1.resolve)(publicPath) }, { src, backgroundColor, resizeMode });
    const outputPath = (0, path_1.resolve)(output);
    await resolveOutputAsync(publicPath, outputPath, items);
}
async function resolveOutputAsync(publicPath, outputPath, items) {
    var _a, _b, _c, _d, _e;
    fs_1.default.mkdirSync(outputPath, { recursive: true });
    const meta = [];
    const manifest = {};
    for (const item of items) {
        if (item.tag) {
            if ((_b = (_a = item.tag) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.href) {
                item.tag.attributes.href = '/' + (0, path_1.relative)(publicPath, (_d = (_c = item.tag) === null || _c === void 0 ? void 0 : _c.attributes) === null || _d === void 0 ? void 0 : _d.href);
            }
            // Write HTML
            meta.push((0, HTML_1.htmlTagObjectToString)(item.tag));
        }
        if (item.manifest) {
            // Write Manifest
            if (!Array.isArray(manifest.icons))
                manifest.icons = [];
            if ((_e = item.manifest) === null || _e === void 0 ? void 0 : _e.src) {
                item.manifest.src = '/' + (0, path_1.relative)(publicPath, item.manifest.src);
            }
            manifest.icons.push(item.manifest);
        }
        // Write image
        const assetPath = (0, path_1.resolve)(outputPath, item.asset.path);
        fs_1.default.mkdirSync((0, path_1.dirname)(assetPath), { recursive: true });
        fs_1.default.writeFileSync(assetPath, item.asset.source);
    }
    if (meta.length) {
        logMeta(meta);
    }
    if (Object.keys(manifest).length) {
        logManifest(manifest);
    }
}
function logManifest(manifest) {
    if (!Object.keys(manifest).length)
        return;
    console.log();
    console.log(chalk_1.default.magenta('\u203A Copy the following lines into your PWA `manifest.json` to link the new assets.'));
    console.log();
    console.log(JSON.stringify(manifest, null, 2));
    console.log();
}
function logMeta(meta) {
    if (!meta.length)
        return;
    console.log();
    console.log(chalk_1.default.magenta('\u203A Copy the following lines into your HTML <head/> to link the new assets.'));
    console.log();
    for (const metaLine of meta) {
        console.log(metaLine);
    }
    console.log();
}
function isResizeMode(input) {
    return input && ['contain', 'cover', 'fill', 'inside', 'outside'].includes(input);
}
async function commandDidThrowAsync(reason) {
    console.log();
    console.log('Aborting run');
    if (reason.command) {
        console.log(`  ${chalk_1.default.magenta(reason.command)} has failed.`);
    }
    else {
        console.log(chalk_1.default.black.bgRed `An unexpected error was encountered. Please report it as a bug:`);
        console.log(reason);
    }
    console.log();
    await (0, update_1.default)();
    process.exit(1);
}
//# sourceMappingURL=cli.js.map