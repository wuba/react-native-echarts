"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleNotFoundPlugin = void 0;
/**
 * Copyright (c) 2022 Expo, Inc.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/facebook/create-react-app/blob/f0a837c/packages/react-dev-utils/ModuleNotFoundPlugin.js
 * But with Node LTS support and removed support for CaseSensitivePathsPlugin which we don't implement due to performance concerns.
 */
const chalk_1 = __importDefault(require("chalk"));
const find_up_1 = require("find-up");
const path_1 = __importDefault(require("path"));
function isModuleNotFoundError(error) {
    return (error === null || error === void 0 ? void 0 : error.name) === 'ModuleNotFoundError';
}
class ModuleNotFoundPlugin {
    constructor(appPath, yarnLockFile) {
        this.appPath = appPath;
        this.yarnLockFile = yarnLockFile;
        this.useYarnCommand = this.useYarnCommand.bind(this);
        this.getRelativePath = this.getRelativePath.bind(this);
        this.prettierError = this.prettierError.bind(this);
    }
    useYarnCommand() {
        try {
            return (0, find_up_1.sync)('yarn.lock', { cwd: this.appPath }) != null;
        }
        catch {
            return false;
        }
    }
    getRelativePath(_file) {
        let file = path_1.default.relative(this.appPath, _file);
        if (file.startsWith('..')) {
            file = _file;
        }
        else if (!file.startsWith('.')) {
            file = '.' + path_1.default.sep + file;
        }
        return file;
    }
    prettierError(err) {
        var _a;
        const { details: _details = '', origin } = err;
        if (origin == null) {
            const caseSensitivity = err.message && /\[CaseSensitivePathsPlugin\] `(.*?)` .* `(.*?)`/.exec(err.message);
            if (caseSensitivity) {
                const [, incorrectPath, actualName] = caseSensitivity;
                const actualFile = this.getRelativePath(path_1.default.join(path_1.default.dirname(incorrectPath), actualName));
                const incorrectName = path_1.default.basename(incorrectPath);
                err.message = `Cannot find file: '${incorrectName}' does not match the corresponding name on disk: '${actualFile}'.`;
            }
            return err;
        }
        const file = this.getRelativePath(origin.resource);
        // TODO: This looks like a type error...
        let details = _details.split('\n');
        const request = /resolve '(.*?)' in '(.*?)'/.exec(details);
        if (request) {
            const isModule = details[1] && details[1].includes('module');
            const isFile = details[1] && details[1].includes('file');
            let [, target, context] = request;
            context = this.getRelativePath(context);
            if (isModule) {
                const isYarn = this.useYarnCommand();
                details = [
                    `Cannot find module: '${target}'. Make sure this package is installed.`,
                    '',
                    'You can install this package by running: ' +
                        (isYarn ? chalk_1.default.bold(`yarn add ${target}`) : chalk_1.default.bold(`npm install ${target}`)) +
                        '.',
                ];
            }
            else if (isFile) {
                details = [`Cannot find file '${target}' in '${context}'.`];
            }
            else {
                details = [err.message];
            }
        }
        else {
            details = [err.message];
        }
        err.message = [file, ...details].join('\n').replace('Error: ', '');
        const isModuleScopePluginError = (_a = err.error) === null || _a === void 0 ? void 0 : _a.__module_scope_plugin;
        if (isModuleScopePluginError) {
            err.message = err.message.replace('Module not found: ', '');
        }
        return err;
    }
    apply(compiler) {
        const { prettierError } = this;
        compiler.hooks.make.intercept({
            register(tap) {
                if (!(tap.name === 'MultiEntryPlugin' || tap.name === 'EntryPlugin')) {
                    return tap;
                }
                return Object.assign({}, tap, {
                    fn: (compilation, callback) => {
                        tap.fn(compilation, (err, ...args) => {
                            if (isModuleNotFoundError(err)) {
                                err = prettierError(err);
                            }
                            callback(err, ...args);
                        });
                    },
                });
            },
        });
    }
}
exports.ModuleNotFoundPlugin = ModuleNotFoundPlugin;
//# sourceMappingURL=ModuleNotFoundPlugin.js.map