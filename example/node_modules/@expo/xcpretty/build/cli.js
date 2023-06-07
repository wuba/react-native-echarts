#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Runner_1 = require("./Runner");
const projectRoot = path_1.default.resolve(process.argv[2] || '.');
Runner_1.formatXcodeBuildPipeProcessAsync(projectRoot);
//# sourceMappingURL=cli.js.map