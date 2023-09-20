"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APISuccessResponse = void 0;
class APISuccessResponse {
    constructor(response, statusCode = 200) {
        this.statusCode = statusCode;
        this.response = response;
    }
}
exports.APISuccessResponse = APISuccessResponse;
