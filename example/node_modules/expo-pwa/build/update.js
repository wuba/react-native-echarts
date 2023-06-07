"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const update_check_1 = __importDefault(require("update-check"));
async function shouldUpdate() {
    const packageJson = () => require('../package.json');
    const update = (0, update_check_1.default)(packageJson()).catch(() => null);
    try {
        const res = await update;
        if (res && res.latest) {
            const _packageJson = packageJson();
            console.log();
            console.log(chalk_1.default.yellow.bold(`A new version of \`${_packageJson.name}\` is available`));
            console.log('You can update by running: ' + chalk_1.default.cyan(`npm i -g ${_packageJson.name}`));
            console.log();
        }
    }
    catch {
        // ignore error
    }
}
exports.default = shouldUpdate;
//# sourceMappingURL=update.js.map