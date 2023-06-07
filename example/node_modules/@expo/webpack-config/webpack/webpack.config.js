"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const crypto_1 = require("crypto");
const expo_pwa_1 = require("expo-pwa");
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = require("fs-extra");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const node_html_parser_1 = require("node-html-parser");
const path_1 = __importDefault(require("path"));
const resolve_from_1 = __importDefault(require("resolve-from"));
const webpack_manifest_plugin_1 = require("webpack-manifest-plugin");
const addons_1 = require("./addons");
const env_1 = require("./env");
const defaults_1 = require("./env/defaults");
const loaders_1 = require("./loaders");
const plugins_1 = require("./plugins");
const ModuleNotFoundPlugin_1 = require("./plugins/ModuleNotFoundPlugin");
function getDevtool({ production, development }, { devtool }) {
    if (production) {
        // string or false
        if (devtool !== undefined) {
            // When big assets are involved sources maps can become expensive and cause your process to run out of memory.
            return devtool;
        }
        return defaults_1.shouldUseSourceMap ? 'source-map' : false;
    }
    if (development) {
        return 'cheap-module-source-map';
    }
    return false;
}
function getOutput(locations, mode, publicPath, platform, port = 8081) {
    const commonOutput = {
        // We inferred the "public path" (such as / or /my-project) from homepage.
        // We use "/" in development.
        publicPath,
        // Build folder (default `web-build`)
        path: locations.production.folder,
        assetModuleFilename: 'static/media/[name].[hash][ext]',
        // Prevent chunk naming collision across platforms since
        // they're all coming from the same dev server.
        uniqueName: platform,
    };
    if (mode === 'production') {
        commonOutput.filename = 'static/js/[name].[contenthash:8].js';
        // There are also additional JS chunk files if you use code splitting.
        commonOutput.chunkFilename = 'static/js/[name].[contenthash:8].chunk.js';
        // Point sourcemap entries to original disk location (format as URL on Windows)
        commonOutput.devtoolModuleFilenameTemplate = (info) => path_1.default.relative(locations.root, info.absoluteResourcePath).replace(/\\/g, '/');
    }
    else {
        // Add comments that describe the file import/exports.
        // This will make it easier to debug.
        commonOutput.pathinfo = true;
        // Give the output bundle a constant name to prevent caching.
        // Also there are no actual files generated in dev.
        commonOutput.filename = 'static/js/bundle.js';
        // There are also additional JS chunk files if you use code splitting.
        commonOutput.chunkFilename = 'static/js/[name].chunk.js';
        // Point sourcemap entries to original disk location (format as URL on Windows)
        commonOutput.devtoolModuleFilenameTemplate = (info
        // TODO: revisit for web
        ) => path_1.default.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
    }
    return commonOutput;
}
function getPlatformsExtensions(platform) {
    return (0, env_1.getModuleFileExtensions)(platform);
}
function createEnvironmentHash(env) {
    return (0, crypto_1.createHash)('md5').update(JSON.stringify(env)).digest('hex');
}
async function default_1(env, argv = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if ('report' in env) {
        console.warn(chalk_1.default.bgRed.black(`The \`report\` property of \`@expo/webpack-config\` is now deprecated.\nhttps://expo.fyi/webpack-report-property-is-deprecated`));
    }
    const config = (0, env_1.getConfig)(env);
    const mode = (0, env_1.getMode)(env);
    const isDev = mode === 'development';
    const isProd = mode === 'production';
    const locations = env.locations || (await (0, env_1.getPathsAsync)(env.projectRoot));
    const { publicPath, publicUrl } = (0, env_1.getPublicPaths)(env);
    const { build: buildConfig = {} } = config.web || {};
    const devtool = getDevtool({ production: isProd, development: isDev }, buildConfig);
    const appEntry = [];
    // In solutions like Gatsby the main entry point doesn't need to be known.
    if (locations.appMain) {
        appEntry.push(locations.appMain);
    }
    // Add a loose requirement on the ResizeObserver polyfill if it's installed...
    const resizeObserverPolyfill = resolve_from_1.default.silent(env.projectRoot, 'resize-observer-polyfill/dist/ResizeObserver.global');
    if (resizeObserverPolyfill) {
        appEntry.unshift(resizeObserverPolyfill);
    }
    let generatePWAImageAssets = !isDev;
    if (!isDev && typeof env.pwa !== 'undefined') {
        generatePWAImageAssets = env.pwa;
    }
    const filesToCopy = [
        {
            from: locations.template.folder,
            to: locations.production.folder,
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
                dot: true,
                // We generate new versions of these based on the templates
                ignore: [
                    // '**/serve.json',
                    '**/index.html',
                    '**/icon.png',
                ],
            },
        },
        {
            from: locations.template.serveJson,
            to: locations.production.serveJson,
        },
    ];
    const templateIndex = (0, node_html_parser_1.parse)((0, fs_extra_1.readFileSync)(locations.template.indexHtml, { encoding: 'utf8' }));
    // @ts-ignore
    const templateLinks = templateIndex.querySelectorAll('link');
    const links = templateLinks.map((value) => ({
        rel: value.getAttribute('rel'),
        media: value.getAttribute('media'),
        href: value.getAttribute('href'),
        sizes: value.getAttribute('sizes'),
        node: value,
    }));
    // @ts-ignore
    const templateMeta = templateIndex.querySelectorAll('meta');
    const meta = templateMeta.map((value) => ({
        name: value.getAttribute('name'),
        content: value.getAttribute('content'),
        node: value,
    }));
    const [manifestLink] = links.filter(link => typeof link.rel === 'string' && link.rel.split(' ').includes('manifest'));
    let templateManifest = locations.template.manifest;
    // Only inject a manifest tag if the template is missing one.
    // This enables users to disable tag injection.
    const shouldInjectManifestTag = !manifestLink;
    if (manifestLink === null || manifestLink === void 0 ? void 0 : manifestLink.href) {
        // Often the manifest will be referenced as `/manifest.json` (to support public paths).
        // We've detected that the user has manually added a manifest tag to their template index.html which according
        // to our docs means they want to use a custom manifest.json instead of having a new one generated.
        //
        // Normalize the link (removing the beginning slash) so it can be resolved relative to the user's static folder.
        // Ref: https://docs.expo.dev/guides/progressive-web-apps/#manual-setup
        if (manifestLink.href.startsWith('/')) {
            manifestLink.href = manifestLink.href.substring(1);
        }
        templateManifest = locations.template.get(manifestLink.href);
    }
    const ensureSourceAbsolute = (input) => {
        if (!input)
            return input;
        return {
            ...input,
            src: locations.absolute(input.src),
        };
    };
    const emacsLockfilePattern = '**/.#*';
    const allLoaders = (0, loaders_1.createAllLoaders)(env);
    let webpackConfig = {
        // Used to identify the compiler.
        name: env.platform,
        target: ['web'],
        watchOptions: {
            aggregateTimeout: 5,
            ignored: [
                '**/.git/**',
                '**/node_modules/**',
                '**/.expo/**',
                '**/.expo-shared/**',
                '**/web-build/**',
                // can be removed after https://github.com/paulmillr/chokidar/issues/955 is released
                emacsLockfilePattern,
            ],
        },
        mode,
        entry: appEntry,
        // https://webpack.js.org/configuration/other-options/#bail
        // Fail out on the first error instead of tolerating it.
        bail: isProd,
        devtool,
        // This must point to the project root (where the webpack.config.js would normally be located).
        // If this is anywhere else, the source maps and errors won't show correct paths.
        context: (_a = env.projectRoot) !== null && _a !== void 0 ? _a : __dirname,
        // configures where the build ends up
        output: getOutput(locations, mode, publicPath, env.platform, env.port),
        // Disable file info logs.
        stats: defaults_1.EXPO_DEBUG ? 'detailed' : 'errors-warnings',
        cache: {
            type: 'filesystem',
            version: createEnvironmentHash(process.env),
            cacheDirectory: path_1.default.join(env.locations.appWebpackCache, env.platform),
            store: 'pack',
            buildDependencies: {
                defaultWebpack: [path_1.default.join(path_1.default.dirname(require.resolve('webpack/package.json')), 'lib/')],
                config: [__filename],
                tsconfig: [env.locations.appTsConfig, env.locations.appJsConfig].filter(f => fs_1.default.existsSync(f)),
            },
        },
        infrastructureLogging: {
            debug: defaults_1.EXPO_DEBUG,
            level: defaults_1.EXPO_DEBUG ? 'verbose' : 'none',
        },
        plugins: [
            // Delete the build folder
            isProd &&
                new clean_webpack_plugin_1.CleanWebpackPlugin({
                    dangerouslyAllowCleanPatternsOutsideProject: true,
                    cleanOnceBeforeBuildPatterns: [locations.production.folder],
                    dry: false,
                    verbose: false,
                }),
            // Copy the template files over
            isProd && new copy_webpack_plugin_1.default({ patterns: filesToCopy }),
            // Generate the `index.html`
            new plugins_1.ExpoHtmlWebpackPlugin(env, templateIndex),
            plugins_1.ExpoInterpolateHtmlPlugin.fromEnv(env, plugins_1.ExpoHtmlWebpackPlugin),
            env.pwa &&
                new plugins_1.ExpoPwaManifestWebpackPlugin({
                    template: templateManifest,
                    path: 'manifest.json',
                    publicPath,
                    inject: shouldInjectManifestTag,
                }, config),
            new plugins_1.FaviconWebpackPlugin({
                projectRoot: env.projectRoot,
                publicPath,
                links,
            }, ensureSourceAbsolute((0, expo_pwa_1.getFaviconIconConfig)(config))),
            generatePWAImageAssets &&
                new plugins_1.ApplePwaWebpackPlugin({
                    projectRoot: env.projectRoot,
                    publicPath,
                    links,
                    meta,
                }, {
                    name: (_b = env.config.web) === null || _b === void 0 ? void 0 : _b.shortName,
                    isFullScreen: (_e = (_d = (_c = env.config.web) === null || _c === void 0 ? void 0 : _c.meta) === null || _d === void 0 ? void 0 : _d.apple) === null || _e === void 0 ? void 0 : _e.touchFullscreen,
                    isWebAppCapable: !!((_h = (_g = (_f = env.config.web) === null || _f === void 0 ? void 0 : _f.meta) === null || _g === void 0 ? void 0 : _g.apple) === null || _h === void 0 ? void 0 : _h.mobileWebAppCapable),
                    barStyle: (_l = (_k = (_j = env.config.web) === null || _j === void 0 ? void 0 : _j.meta) === null || _k === void 0 ? void 0 : _k.apple) === null || _l === void 0 ? void 0 : _l.barStyle,
                }, ensureSourceAbsolute((0, expo_pwa_1.getSafariIconConfig)(env.config)), ensureSourceAbsolute((0, expo_pwa_1.getSafariStartupImageConfig)(env.config))),
            generatePWAImageAssets &&
                new plugins_1.ChromeIconsWebpackPlugin({
                    projectRoot: env.projectRoot,
                    publicPath,
                }, ensureSourceAbsolute((0, expo_pwa_1.getChromeIconConfig)(config))),
            // This gives some necessary context to module not found errors, such as
            // the requesting resource.
            new ModuleNotFoundPlugin_1.ModuleNotFoundPlugin(locations.root),
            new plugins_1.ExpoDefinePlugin({
                mode,
                publicUrl,
                config,
                // @ts-ignore
                platform: env.platform,
            }),
            isProd &&
                new mini_css_extract_plugin_1.default({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: 'static/css/[name].[contenthash:8].css',
                    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                }),
            // Generate an asset manifest file with the following content:
            // - "files" key: Mapping of all asset filenames to their corresponding
            //   output file so that tools can pick it up without having to parse
            //   `index.html`
            // - "entrypoints" key: Array of files which are included in `index.html`,
            //   can be used to reconstruct the HTML if necessary
            new webpack_manifest_plugin_1.WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath,
                filter: ({ path }) => {
                    if (path.match(/(apple-touch-startup-image|apple-touch-icon|chrome-icon|precache-manifest)/)) {
                        return false;
                    }
                    // Remove compressed versions and service workers
                    return !(path.endsWith('.gz') || path.endsWith('worker.js'));
                },
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = files.reduce((manifest, file) => {
                        if (file.name) {
                            manifest[file.name] = file.path;
                        }
                        return manifest;
                    }, seed);
                    const entrypointFiles = entrypoints.main.filter(fileName => !fileName.endsWith('.map'));
                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    };
                },
            }),
            // TODO: Drop
            new plugins_1.ExpectedErrorsPlugin(),
            // Skip using a progress bar in CI
            env.logger &&
                new plugins_1.ExpoProgressBarPlugin({
                    logger: env.logger,
                    nonInteractive: defaults_1.isCI,
                    bundleDetails: {
                        bundleType: 'bundle',
                        platform: env.platform,
                        entryFile: locations.appMain,
                        dev: isDev !== null && isDev !== void 0 ? isDev : false,
                        minify: isProd !== null && isProd !== void 0 ? isProd : false,
                    },
                }),
        ].filter(Boolean),
        module: {
            strictExportPresence: false,
            // @ts-ignore
            rules: [
                // Handle node_modules packages that contain sourcemaps
                defaults_1.shouldUseSourceMap && {
                    enforce: 'pre',
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    test: /\.(js|mjs|jsx|ts|tsx|css)$/,
                    use: require.resolve('source-map-loader'),
                    resolve: {
                        fullySpecified: false,
                    },
                },
                {
                    oneOf: allLoaders,
                },
            ].filter(Boolean),
        },
        resolve: {
            // modules: ['node_modules'],
            mainFields: ['browser', 'module', 'main'],
            aliasFields: ['browser', 'module', 'main'],
            extensions: getPlatformsExtensions(env.platform),
            symlinks: false,
        },
        // Turn off performance processing because we utilize
        // our own (CRA) hints via the FileSizeReporter
        // TODO: Bacon: Remove this higher value
        performance: defaults_1.isCI ? false : { maxAssetSize: 600000, maxEntrypointSize: 600000 },
    };
    if (isProd) {
        webpackConfig = (0, addons_1.withOptimizations)(webpackConfig);
    }
    else {
        webpackConfig = (0, addons_1.withDevServer)(webpackConfig, env, {
            allowedHost: argv.allowedHost,
            proxy: argv.proxy,
        });
    }
    webpackConfig = (0, addons_1.withAlias)(webpackConfig, (0, env_1.getAliases)(env.projectRoot));
    return webpackConfig;
}
exports.default = default_1;
//# sourceMappingURL=webpack.config.js.map