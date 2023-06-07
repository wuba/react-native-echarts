"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const expo_pwa_1 = require("expo-pwa");
const fs_1 = __importDefault(require("fs"));
const PwaManifestWebpackPlugin_1 = __importDefault(require("./PwaManifestWebpackPlugin"));
class ExpoPwaManifestWebpackPlugin extends PwaManifestWebpackPlugin_1.default {
    constructor(pwaOptions, config) {
        let inputJson;
        try {
            if (fs_1.default.existsSync(pwaOptions.template)) {
                inputJson = JSON.parse(fs_1.default.readFileSync(pwaOptions.template, { encoding: 'utf8' }));
            }
        }
        catch ({ message }) {
            console.log(chalk_1.default.yellow(`\u203A PWA manifest: failed to use template file: ${message}`));
        }
        if (!inputJson)
            inputJson = (0, expo_pwa_1.generateManifestJson)({}, config);
        super(pwaOptions, inputJson);
    }
}
exports.default = ExpoPwaManifestWebpackPlugin;
//# sourceMappingURL=ExpoPwaManifestWebpackPlugin.js.map