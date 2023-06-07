"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedirectServedPathMiddleware = void 0;
const path_1 = __importDefault(require("path"));
function createRedirectServedPathMiddleware(servedPath) {
    // remove end slash so user can land on `/test` instead of `/test/`
    servedPath = servedPath.slice(0, -1);
    return function redirectServedPathMiddleware(req, res, next) {
        if (servedPath === '' || req.url === servedPath || req.url.startsWith(servedPath)) {
            next();
        }
        else {
            const newPath = path_1.default.posix.join(servedPath, req.path !== '/' ? req.path : '');
            res.redirect(newPath);
        }
    };
}
exports.createRedirectServedPathMiddleware = createRedirectServedPathMiddleware;
//# sourceMappingURL=redirectServedPathMiddleware.js.map