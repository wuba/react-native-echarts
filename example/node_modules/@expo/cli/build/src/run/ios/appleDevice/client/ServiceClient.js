"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _errors = require("../../../../utils/errors");
class ServiceClient {
    constructor(socket, protocolClient){
        this.socket = socket;
        this.protocolClient = protocolClient;
    }
}
exports.ServiceClient = ServiceClient;
class ResponseError extends _errors.CommandError {
    constructor(msg, response){
        super(msg);
        this.response = response;
    }
}
exports.ResponseError = ResponseError;

//# sourceMappingURL=ServiceClient.js.map