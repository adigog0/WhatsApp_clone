"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSucccessResponse = exports.sendErrorResponse = void 0;
const object_1 = require("../utils/object");
function sendErrorResponse(res, error) {
    res.status(error.statusCode).json((0, object_1.pick)(error, ['message', 'status']));
}
exports.sendErrorResponse = sendErrorResponse;
function sendSucccessResponse(res, apiResp) {
    typeof apiResp.response === 'string' ? res.status(apiResp.statusCode).send(apiResp.response) : res.status(apiResp.statusCode).json(apiResp.response);
}
exports.sendSucccessResponse = sendSucccessResponse;
