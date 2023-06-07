"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReactDevToolsEndpoint = void 0;
var _promises = require("fs/promises");
var _path = _interopRequireDefault(require("path"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
var _expoMiddleware = require("./ExpoMiddleware");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ReactDevToolsEndpoint = "/_expo/react-devtools";
exports.ReactDevToolsEndpoint = ReactDevToolsEndpoint;
class ReactDevToolsPageMiddleware extends _expoMiddleware.ExpoMiddleware {
    constructor(projectRoot){
        super(projectRoot, [
            ReactDevToolsEndpoint
        ]);
    }
    async handleRequestAsync(req, res) {
        var // Production: This will resolve when installed in the project.
        ref;
        const templatePath = (ref = _resolveFrom.default.silent(this.projectRoot, "expo/static/react-devtools-page/index.html")) != null ? ref : // Development: This will resolve when testing locally.
        _path.default.resolve(__dirname, "../../../../../static/react-devtools-page/index.html");
        const content = (await (0, _promises).readFile(templatePath)).toString("utf-8");
        res.setHeader("Content-Type", "text/html");
        res.end(content);
    }
}
exports.ReactDevToolsPageMiddleware = ReactDevToolsPageMiddleware;

//# sourceMappingURL=ReactDevToolsPageMiddleware.js.map