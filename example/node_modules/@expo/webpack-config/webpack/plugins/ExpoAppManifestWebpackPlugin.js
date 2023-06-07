"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PwaManifestWebpackPlugin_1 = __importDefault(require("./PwaManifestWebpackPlugin"));
class ExpoAppManifestWebpackPlugin extends PwaManifestWebpackPlugin_1.default {
    constructor(pwaOptions, config) {
        super(pwaOptions, config);
        this.rel = 'expo';
    }
}
exports.default = ExpoAppManifestWebpackPlugin;
//# sourceMappingURL=ExpoAppManifestWebpackPlugin.js.map