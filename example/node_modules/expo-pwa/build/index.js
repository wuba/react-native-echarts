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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChromeIconConfig = exports.getFaviconIconConfig = exports.getSafariIconConfig = exports.getSafariStartupImageConfig = exports.getConfigForPWA = exports.generateManifestJson = exports.generateManifestAsync = exports.generateFaviconAsync = exports.generateChromeIconAsync = exports.generateAppleIconAsync = exports.generateSplashAsync = exports.generateAsync = exports.joinUrlPath = void 0;
const config_1 = require("@expo/config");
const Image = __importStar(require("@expo/image-utils"));
const path = __importStar(require("path"));
const url_1 = require("url");
const Manifest_1 = require("./Manifest");
Object.defineProperty(exports, "getConfigForPWA", { enumerable: true, get: function () { return Manifest_1.getConfigForPWA; } });
const Splash_1 = require("./Splash");
/**
 * Joins a url protocol + host to path segments, falls back to path.join
 * if result is not a valid url.
 */
function joinUrlPath(publicPath, ...toJoin) {
    const segments = path.join(...toJoin);
    try {
        // Throws if publicPath is not a valid protocol+host
        return new url_1.URL(segments, publicPath).href;
    }
    catch {
        return path.join(publicPath, segments);
    }
}
exports.joinUrlPath = joinUrlPath;
async function generateAsync(type, options, icon) {
    switch (type) {
        case 'splash':
            return generateSplashAsync(options, icon);
        case 'safari-icon':
            return generateAppleIconAsync(options, icon, {});
        case 'chrome-icon':
            return generateChromeIconAsync(options, icon, {});
        case 'favicon':
            return generateFaviconAsync(options, icon);
    }
    throw new Error(`Invalid command type: ${type}`);
}
exports.generateAsync = generateAsync;
async function generateSplashAsync({ projectRoot, publicPath }, icon) {
    const cacheType = 'apple-touch-startup-image';
    // You cannot lock iOS PWA orientation, we should produce every splash screen
    // orientation. We don't however because in iOS 13 it's far more rare to see landscape splash screens.
    const devices = (0, Splash_1.getDevices)();
    const icons = Array.isArray(icon) ? icon : [];
    if (!Array.isArray(icon)) {
        for (const device of devices) {
            for (const orientation of device.orientations) {
                let width = 0;
                let height = 0;
                if (orientation !== 'portrait') {
                    width = device.height;
                    height = device.width;
                }
                else {
                    height = device.height;
                    width = device.width;
                }
                const name = `apple-touch-startup-image-${width}x${height}.png`;
                icons.push({
                    ...icon,
                    name,
                    width,
                    height,
                    media: (0, Splash_1.assembleOrientationMedia)(device.width, device.height, device.scale, orientation),
                });
            }
        }
    }
    const data = await Promise.all(icons.map(async (icon) => {
        // Ensure the default `splash.resizeMode` is used here:
        // https://docs.expo.dev/versions/latest/config/app/#splash
        if (!icon.resizeMode) {
            icon.resizeMode = 'contain';
        }
        const { source, name } = await Image.generateImageAsync({ projectRoot, cacheType }, icon);
        const href = `pwa/apple-touch-startup-image/${name}`;
        return {
            asset: {
                source,
                path: href,
            },
            tag: {
                tagName: 'link',
                attributes: {
                    rel: 'apple-touch-startup-image',
                    media: icon.media,
                    // TODO(Bacon): Use sizes to query splash screens better
                    // sizes: `${icon.width}x${icon.height}`,
                    href: joinUrlPath(publicPath, href),
                },
            },
        };
    }));
    await Image.Cache.clearUnusedCachesAsync(projectRoot, cacheType);
    return data;
}
exports.generateSplashAsync = generateSplashAsync;
async function generateAppleIconAsync({ projectRoot, publicPath }, icon, { sizes = [180] }) {
    const cacheType = 'apple-touch-icon';
    const data = await Promise.all(sizes.map(async (size) => {
        const rel = 'apple-touch-icon';
        const { source, name } = await Image.generateImageAsync({ projectRoot, cacheType }, { ...icon, width: size, height: size, name: `${rel}-${size}.png` });
        const href = `pwa/${rel}/${name}`;
        return {
            asset: {
                source,
                path: href,
            },
            tag: {
                tagName: 'link',
                attributes: {
                    rel,
                    sizes: `${size}x${size}`,
                    href: joinUrlPath(publicPath, href),
                },
            },
        };
    }));
    // Don't clear the caches if no generation was performed.
    if (!sizes.length) {
        await Image.Cache.clearUnusedCachesAsync(projectRoot, cacheType);
    }
    return data;
}
exports.generateAppleIconAsync = generateAppleIconAsync;
async function generateChromeIconAsync({ projectRoot, publicPath }, icon, { sizes = [144, 192, 512] }) {
    const cacheType = 'chrome-icon';
    const data = await Promise.all(sizes.map(async (size) => {
        const rel = 'chrome-icon';
        const { source, name } = await Image.generateImageAsync({ projectRoot, cacheType }, { ...icon, width: size, height: size, name: `${rel}-${size}.png` });
        const href = `pwa/${rel}/${name}`;
        return {
            asset: {
                source,
                path: href,
            },
            manifest: {
                src: joinUrlPath(publicPath, href),
                sizes: `${size}x${size}`,
                type: 'image/png',
            },
        };
    }));
    // Don't clear the caches if no generation was performed.
    if (!sizes.length) {
        await Image.Cache.clearUnusedCachesAsync(projectRoot, cacheType);
    }
    return data;
}
exports.generateChromeIconAsync = generateChromeIconAsync;
async function generateFaviconAsync({ projectRoot, publicPath }, icon) {
    const cacheType = 'favicon';
    const dimensions = [16, 32, 48];
    const data = await Promise.all(dimensions.map(async (size) => {
        const rel = 'icon';
        const { source, name } = await Image.generateImageAsync({ projectRoot, cacheType }, {
            ...icon,
            backgroundColor: icon.backgroundColor || 'transparent',
            width: size,
            height: size,
            name: `favicon-${size}.png`,
        });
        const href = `${name}`;
        return {
            asset: {
                source,
                path: href,
            },
            tag: {
                tagName: 'link',
                attributes: {
                    rel,
                    type: 'image/png',
                    sizes: `${size}x${size}`,
                    href: joinUrlPath(publicPath, href),
                },
            },
        };
    }));
    const faviconUrl = joinUrlPath(publicPath, 'favicon.ico');
    const largestImageBuffer = data[data.length - 1].asset.source;
    const faviconBuffer = await Image.generateFaviconAsync(largestImageBuffer, dimensions);
    await Image.Cache.clearUnusedCachesAsync(projectRoot, cacheType);
    return [
        data[0],
        data[1],
        {
            asset: { source: faviconBuffer, path: 'favicon.ico' },
            tag: {
                tagName: 'link',
                attributes: { rel: 'shortcut icon', href: faviconUrl },
            },
        },
    ];
}
exports.generateFaviconAsync = generateFaviconAsync;
async function generateManifestAsync(options, configPath, config) {
    if (configPath) {
        (0, config_1.setCustomConfigPath)(options.projectRoot, configPath);
    }
    const manifest = generateManifestJson(options, config);
    return [
        {
            // TODO: Bacon: Make the types more flexible
            asset: { source: JSON.stringify(manifest, null, 2), path: 'manifest.json' },
            tag: {
                tagName: 'link',
                attributes: { rel: 'manifest', href: joinUrlPath(options.publicPath, 'manifest.json') },
            },
        },
    ];
}
exports.generateManifestAsync = generateManifestAsync;
function generateManifestJson({ projectRoot }, config) {
    if (!config) {
        if (!projectRoot)
            throw new Error('You must either define projectRoot or config');
        config = (0, Manifest_1.getConfigForPWA)(projectRoot);
    }
    return (0, Manifest_1.createPWAManifestFromWebConfig)(config.web);
}
exports.generateManifestJson = generateManifestJson;
var Manifest_2 = require("./Manifest");
Object.defineProperty(exports, "getSafariStartupImageConfig", { enumerable: true, get: function () { return Manifest_2.getSafariStartupImageConfig; } });
Object.defineProperty(exports, "getSafariIconConfig", { enumerable: true, get: function () { return Manifest_2.getSafariIconConfig; } });
Object.defineProperty(exports, "getFaviconIconConfig", { enumerable: true, get: function () { return Manifest_2.getFaviconIconConfig; } });
Object.defineProperty(exports, "getChromeIconConfig", { enumerable: true, get: function () { return Manifest_2.getChromeIconConfig; } });
//# sourceMappingURL=index.js.map