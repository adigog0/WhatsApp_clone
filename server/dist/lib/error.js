"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAPIError = void 0;
const ErrorCodeToStatusMap = {
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '418': "I'm a Teapot",
    '415': 'Unsupported Media Type',
    '416': 'Range Not Satisfiable',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
};
class DefaultAPIError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = ErrorCodeToStatusMap[statusCode];
        this.message = message;
    }
    get [Symbol.toStringTag]() {
        return JSON.stringify(this);
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.DefaultAPIError = DefaultAPIError;
