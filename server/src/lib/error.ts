type HttpErrorCodes = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 408 | 409 | 410 | 411 | 415 | 416 | 418 | 500 | 501 | 502 | 503 | 504;
type IErrorCodeToStatusMapping = {
    [key in HttpErrorCodes]: string;
};

const ErrorCodeToStatusMap: IErrorCodeToStatusMapping = {
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

export class DefaultAPIError extends Error {
    statusCode: HttpErrorCodes;
    status: string;
    message: string;

    constructor(statusCode: HttpErrorCodes, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.status = ErrorCodeToStatusMap[statusCode];
        this.message = message;
    }

    get [Symbol.toStringTag]() {
        return JSON.stringify(this)
    }

    toString() {
        return JSON.stringify(this)
    }
}