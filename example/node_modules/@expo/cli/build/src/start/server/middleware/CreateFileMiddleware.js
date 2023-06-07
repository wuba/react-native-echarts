"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _expoMiddleware = require("./ExpoMiddleware");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:server:middleware:createFile");
class CreateFileMiddleware extends _expoMiddleware.ExpoMiddleware {
    constructor(projectRoot){
        super(projectRoot, [
            "/_expo/touch"
        ]);
        this.projectRoot = projectRoot;
    }
    resolvePath(inputPath) {
        let resolvedPath = _path.default.join(this.projectRoot, inputPath);
        const extension = _path.default.extname(resolvedPath);
        if (extension === ".js") {
            // Automatically convert JS files to TS files when added to a project
            // with TypeScript.
            const tsconfigPath = _path.default.join(this.projectRoot, "tsconfig.json");
            if (_fs.default.existsSync(tsconfigPath)) {
                resolvedPath = resolvedPath.replace(/\.js$/, ".tsx");
            }
        }
        return resolvedPath;
    }
    async parseRawBody(req) {
        const rawBody = await new Promise((resolve, reject)=>{
            let body = "";
            req.on("data", (chunk)=>{
                body += chunk.toString();
            });
            req.on("end", ()=>{
                resolve(body);
            });
            req.on("error", (err)=>{
                reject(err);
            });
        });
        const properties = JSON.parse(rawBody);
        this.assertTouchFileBody(properties);
        return properties;
    }
    assertTouchFileBody(body) {
        if (typeof body !== "object" || body == null) {
            throw new Error("Expected object");
        }
        if (typeof body.path !== "string") {
            throw new Error('Expected "path" in body to be string');
        }
        if (typeof body.contents !== "string") {
            throw new Error('Expected "contents" in body to be string');
        }
    }
    async handleRequestAsync(req, res) {
        if (req.method !== "POST") {
            res.statusCode = 405;
            res.end("Method Not Allowed");
            return;
        }
        let properties;
        try {
            properties = await this.parseRawBody(req);
        } catch (e) {
            debug("Error parsing request body", e);
            res.statusCode = 400;
            res.end("Bad Request");
            return;
        }
        debug(`Requested: %O`, properties);
        const resolvedPath = this.resolvePath(properties.path);
        if (_fs.default.existsSync(resolvedPath)) {
            res.statusCode = 409;
            res.end("File already exists.");
            return;
        }
        debug(`Resolved path:`, resolvedPath);
        try {
            await _fs.default.promises.mkdir(_path.default.dirname(resolvedPath), {
                recursive: true
            });
            await _fs.default.promises.writeFile(resolvedPath, properties.contents, "utf8");
        } catch (e1) {
            debug("Error writing file", e1);
            res.statusCode = 500;
            res.end("Error writing file.");
            return;
        }
        debug(`File created`);
        res.statusCode = 200;
        res.end("OK");
    }
}
exports.CreateFileMiddleware = CreateFileMiddleware;

//# sourceMappingURL=CreateFileMiddleware.js.map