"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDevServer = void 0;
const assert_1 = __importDefault(require("assert"));
const chalk_1 = __importDefault(require("chalk"));
const crypto_1 = __importDefault(require("crypto"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const env_1 = require("../env");
const defaults_1 = require("../env/defaults");
const evalSourceMapMiddleware_1 = require("../utils/evalSourceMapMiddleware");
const ignoredFiles_1 = require("../utils/ignoredFiles");
const noopServiceWorkerMiddleware_1 = require("../utils/noopServiceWorkerMiddleware");
const redirectServedPathMiddleware_1 = require("../utils/redirectServedPathMiddleware");
// Ensure the certificate and key provided are valid and if not
// throw an easy to debug error
function validateKeyAndCerts({ cert, key, keyFile, crtFile }) {
    let encrypted;
    try {
        // publicEncrypt will throw an error with an invalid cert
        encrypted = crypto_1.default.publicEncrypt(cert, Buffer.from('test'));
    }
    catch {
        return false;
    }
    try {
        // privateDecrypt will throw an error with an invalid key
        crypto_1.default.privateDecrypt(key, encrypted);
    }
    catch {
        return false;
    }
    return true;
}
// Read file and throw an error if it doesn't exist
function readEnvFile(file, type) {
    if (!fs_extra_1.default.existsSync(file)) {
        throw new Error(`You specified ${chalk_1.default.cyan(type)} in your env, but the file "${chalk_1.default.yellow(file)}" can't be found.`);
    }
    return fs_extra_1.default.readFileSync(file);
}
// Get the https config
// Return cert files if provided in env, otherwise just true or false
function getHttpsConfig(projectRoot, isHttps) {
    const { SSL_CRT_FILE, SSL_KEY_FILE } = process.env;
    if (isHttps && SSL_CRT_FILE && SSL_KEY_FILE) {
        const crtFile = path.resolve(projectRoot, SSL_CRT_FILE);
        const keyFile = path.resolve(projectRoot, SSL_KEY_FILE);
        const config = {
            cert: readEnvFile(crtFile, 'SSL_CRT_FILE'),
            key: readEnvFile(keyFile, 'SSL_KEY_FILE'),
        };
        if (validateKeyAndCerts({ ...config, keyFile, crtFile })) {
            return config;
        }
        else {
            console.log(chalk_1.default.yellow(`\u203A Failed to self-sign SSL certificates for HTTPS. Falling back to insecure https. You can re run with \`--no-https\` to disable HTTPS, or delete the \`.expo\` folder and try again.`));
            return true;
        }
    }
    return isHttps;
}
/**
 * Add a valid dev server to the provided Webpack config.
 *
 * @param webpackConfig Existing Webpack config to modify.
 * @param env locations, projectRoot, and https options.
 * @param options Configure how the dev server is setup.
 * @category addons
 */
function withDevServer(webpackConfig, env, options = {}) {
    webpackConfig.devServer = createDevServer(env, options);
    return webpackConfig;
}
exports.default = withDevServer;
/**
 * Create a valid Webpack dev server config.
 *
 * @param env locations, projectRoot, and https options.
 * @param options Configure how the dev server is setup.
 * @internal
 */
function createDevServer(env, { allowedHost, proxy } = {}) {
    const { https = false } = env;
    const locations = env.locations || (0, env_1.getPaths)(env.projectRoot, env);
    const { publicPath: publicUrlOrPath } = (0, env_1.getPublicPaths)(env);
    const disableFirewall = !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';
    // Attempt to keep this as close to create-react-native app as possible.
    // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js
    return {
        // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
        // websites from potentially accessing local content through DNS rebinding:
        // https://github.com/webpack/webpack-dev-server/issues/887
        // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
        // However, it made several existing use cases such as development in cloud
        // environment or subdomains in development significantly more complicated:
        // https://github.com/facebook/create-react-app/issues/2271
        // https://github.com/facebook/create-react-app/issues/2233
        // While we're investigating better solutions, for now we will take a
        // compromise. Since our WDS configuration only serves files in the `public`
        // folder we won't consider accessing them a vulnerability. However, if you
        // use the `proxy` feature, it gets more dangerous because it can expose
        // remote code execution vulnerabilities in backends like Django and Rails.
        // So we will disable the host check normally, but enable it if you have
        // specified the `proxy` setting. Finally, we let you override it if you
        // really know what you're doing with a special environment variable.
        // Note: ["localhost", ".localhost"] will support subdomains - but we might
        // want to allow setting the allowedHosts manually for more complex setups
        allowedHosts: disableFirewall ? ['all'] : [allowedHost].filter(Boolean),
        // Enable gzip compression of generated files.
        compress: true,
        static: {
            // By default WebpackDevServer serves physical files from current directory
            // in addition to all the virtual build products that it serves from memory.
            // This is confusing because those files won’t automatically be available in
            // production build folder unless we copy them. However, copying the whole
            // project directory is dangerous because we may expose sensitive files.
            // Instead, we establish a convention that only files in `public` directory
            // get served. Our build script will copy `public` into the `build` folder.
            // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
            // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
            // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
            // Note that we only recommend to use `public` folder as an escape hatch
            // for files like `favicon.ico`, `manifest.json`, and libraries that are
            // for some reason broken when imported through webpack. If you just want to
            // use an image, put it in `src` and `import` it from JavaScript instead.
            directory: locations.template.folder,
            publicPath: [publicUrlOrPath],
            // By default files from `contentBase` will not trigger a page reload.
            watch: {
                // Reportedly, this avoids CPU overload on some systems.
                // https://github.com/facebook/create-react-app/issues/293
                // src/node_modules is not ignored to support absolute imports
                // https://github.com/facebook/create-react-app/issues/1065
                ignored: (0, ignoredFiles_1.ignoredFiles)(locations.root),
            },
        },
        client: {
            webSocketURL: {
                // Enable custom sockjs pathname for websocket connection to hot reloading server.
                // Enable custom sockjs hostname, pathname and port for websocket connection
                // to hot reloading server.
                hostname: defaults_1.sockHost,
                pathname: defaults_1.sockPath,
                port: defaults_1.sockPort,
            },
            // overlay: true,
            overlay: false,
            // TODO: This is nonstandard, prevents logging in the browser
            // logging: 'none',
        },
        webSocketServer: {
            type: 'ws',
            options: {
                host: defaults_1.sockHost,
                port: defaults_1.sockPort,
                path: defaults_1.sockPath,
            },
        },
        devMiddleware: {
            index: true,
            // It is important to tell WebpackDevServer to use the same "publicPath" path as
            // we specified in the webpack config. When homepage is '.', default to serving
            // from the root.
            // remove last slash so user can land on `/test` instead of `/test/`
            publicPath: publicUrlOrPath.slice(0, -1),
        },
        https: getHttpsConfig(env.projectRoot, https),
        host: defaults_1.host,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebook/create-react-app/issues/387.
            disableDotRule: true,
            index: publicUrlOrPath,
        },
        // `proxy` is run between `before` and `after` `webpack-dev-server` hooks
        proxy,
        setupMiddlewares(middlewares, devServer) {
            (0, assert_1.default)(devServer, 'webpack-dev-server is not defined');
            middlewares.unshift(
            // Keep `evalSourceMapMiddleware`
            // middlewares before `redirectServedPath` otherwise will not have any effect
            // This lets us fetch source contents from webpack for the error overlay
            (0, evalSourceMapMiddleware_1.createEvalSourceMapMiddleware)(devServer), 
            // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
            (0, redirectServedPathMiddleware_1.createRedirectServedPathMiddleware)(publicUrlOrPath), 
            // This service worker file is effectively a 'no-op' that will reset any
            // previous service worker registered for the same host:port combination.
            // We do this in development to avoid hitting the production cache if
            // it used the same host and port.
            // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
            (0, noopServiceWorkerMiddleware_1.createNoopServiceWorkerMiddleware)(publicUrlOrPath));
            return middlewares;
        },
    };
}
exports.createDevServer = createDevServer;
//# sourceMappingURL=withDevServer.js.map