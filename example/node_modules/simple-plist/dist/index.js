var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "bplist-creator", "bplist-parser", "./parse", "./readFile", "./readFileSync", "./stringify", "./writeBinaryFile", "./writeBinaryFileSync", "./writeFile", "./writeFileSync"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var bplist_creator_1 = __importDefault(require("bplist-creator"));
    var bplist_parser_1 = __importDefault(require("bplist-parser"));
    var parse_1 = require("./parse");
    var readFile_1 = require("./readFile");
    var readFileSync_1 = require("./readFileSync");
    var stringify_1 = require("./stringify");
    var writeBinaryFile_1 = require("./writeBinaryFile");
    var writeBinaryFileSync_1 = require("./writeBinaryFileSync");
    var writeFile_1 = require("./writeFile");
    var writeFileSync_1 = require("./writeFileSync");
    // "modern" named exports
    var SimplePlist = {
        bplistCreator: bplist_creator_1.default,
        bplistParser: bplist_parser_1.default,
        parse: parse_1.parse,
        readFile: readFile_1.readFile,
        readFileSync: readFileSync_1.readFileSync,
        stringify: stringify_1.stringify,
        writeBinaryFile: writeBinaryFile_1.writeBinaryFile,
        writeBinaryFileSync: writeBinaryFileSync_1.writeBinaryFileSync,
        writeFile: writeFile_1.writeFile,
        writeFileSync: writeFileSync_1.writeFileSync,
    };
    exports.default = SimplePlist;
    // preserve backwards compatibility
    module.exports = SimplePlist;
});
