"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const expo_pwa_1 = require("expo-pwa");
const webpack_1 = require("webpack");
const ModifyHtmlWebpackPlugin_1 = __importDefault(require("./ModifyHtmlWebpackPlugin"));
class ApplePwaWebpackPlugin extends ModifyHtmlWebpackPlugin_1.default {
    constructor(pwaOptions, meta, icon, startupImage) {
        super();
        this.pwaOptions = pwaOptions;
        this.meta = meta;
        this.icon = icon;
        this.startupImage = startupImage;
    }
    async modifyAsync(compiler, compilation, data) {
        // Meta
        var _a, _b;
        const hasMetaTagWithName = (name) => {
            return this.pwaOptions.meta.some(v => v.name === name);
        };
        if (this.meta.isWebAppCapable) {
            if (!hasMetaTagWithName('mobile-web-app-capable')) {
                data.assetTags.meta.push(metaTag('mobile-web-app-capable', 'yes'));
            }
            if (!hasMetaTagWithName('apple-mobile-web-app-capable')) {
                data.assetTags.meta.push(metaTag('apple-mobile-web-app-capable', 'yes'));
            }
        }
        if (this.meta.isFullScreen && !hasMetaTagWithName('apple-touch-fullscreen')) {
            data.assetTags.meta.push(metaTag('apple-touch-fullscreen', 'yes'));
        }
        if (this.meta.name && !hasMetaTagWithName('apple-mobile-web-app-title')) {
            data.assetTags.meta.push(metaTag('apple-mobile-web-app-title', this.meta.name));
        }
        if (this.meta.barStyle && !hasMetaTagWithName('apple-mobile-web-app-status-bar-style')) {
            data.assetTags.meta.push(metaTag('apple-mobile-web-app-status-bar-style', this.meta.barStyle));
        }
        const logger = compiler.getInfrastructureLogger('apple-pwa-plugin');
        function logNotice(type, message) {
            logger.log(chalk_1.default.magenta(`\u203A ${type}: ${chalk_1.default.gray(message)}`));
        }
        function logWarning(type, message) {
            logger.warn(chalk_1.default.yellow(`\u203A ${type}: ${chalk_1.default.gray(message)}`));
        }
        // App Icon
        if (this.icon) {
            const links = this.pwaOptions.links
                .filter(v => v.rel === 'apple-touch-icon')
                .map(v => v.sizes);
            const targetSizes = [180];
            const requiredSizes = [];
            for (const size of targetSizes) {
                const sizes = `${size}x${size}`;
                if (links.includes(sizes)) {
                    logNotice('Safari Icons', `Using custom <link rel="apple-touch-icon" sizes="${sizes}" .../>`);
                }
                else {
                    requiredSizes.push(size);
                }
            }
            const iconAssets = await (0, expo_pwa_1.generateAppleIconAsync)(this.pwaOptions, this.icon, {
                sizes: requiredSizes,
            });
            for (const asset of iconAssets) {
                const size = (_a = asset.tag) === null || _a === void 0 ? void 0 : _a.attributes.sizes;
                if (size && links.includes(size)) {
                    logNotice('Safari Icons', `Using custom <link rel="apple-touch-icon" sizes="${size}" .../>`);
                }
                else {
                    compilation.emitAsset(asset.asset.path, new webpack_1.sources.RawSource(asset.asset.source));
                    data.assetTags.meta.push(asset.tag);
                }
            }
        }
        else {
            logWarning('Safari Icons', `No template image found, skipping auto generation...`);
        }
        // Splash screens
        if (this.startupImage) {
            const assets = await (0, expo_pwa_1.generateSplashAsync)(this.pwaOptions, this.startupImage);
            const links = this.pwaOptions.links
                .filter(v => v.rel === 'apple-touch-startup-image')
                .map(v => v.media);
            for (const asset of assets) {
                const media = (_b = asset.tag) === null || _b === void 0 ? void 0 : _b.attributes.media;
                if (media && links.includes(media)) {
                    logNotice('Safari Splash Screens', `Using custom <link rel="apple-touch-startup-image" media="${media}" ... />`);
                }
                else {
                    compilation.emitAsset(asset.asset.path, new webpack_1.sources.RawSource(asset.asset.source));
                    data.assetTags.meta.push(asset.tag);
                }
            }
        }
        else {
            logWarning('Safari Splash Screens', `No template image found, skipping auto generation...`);
        }
        return data;
    }
}
exports.default = ApplePwaWebpackPlugin;
function metaTag(name, content) {
    return {
        tagName: 'meta',
        voidTag: true,
        attributes: {
            name,
            content,
        },
    };
}
//# sourceMappingURL=ApplePwaWebpackPlugin.js.map