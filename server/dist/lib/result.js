"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultifyAsync = exports.resultify = exports.intoResultAsync = exports.intoResult = void 0;
/**
 * Two approaces to get a Result type from a throwing function:
 * 1. HOF that invokes the function on your behalf and retruns a Result
 * 2. A factory function that returns another function, which when invoked returns a Result
 */
/**
 * Approach 1
 * Synchronous Version
 */
function intoResult(cb, ...args) {
    try {
        const res = cb(...args);
        return [res, null];
    }
    catch (e) {
        const err = e;
        return [null, err];
    }
}
exports.intoResult = intoResult;
/**
 * Approach 1
 * Asynchronous Version
 */
function intoResultAsync(cb, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = (yield cb(...args));
            return [res, null];
        }
        catch (e) {
            const err = e;
            return [null, err];
        }
    });
}
exports.intoResultAsync = intoResultAsync;
/**
 * Approach 2
 * Synchronous Version
 */
function resultify(cb) {
    return function (...args) {
        try {
            const res = cb(...args);
            return [res, null];
        }
        catch (e) {
            const err = e;
            return [null, err];
        }
    };
}
exports.resultify = resultify;
/**
 * Approach 2
 * Asynchronous Version
 */
function resultifyAsync(cb) {
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield cb(...args);
                return [res, null];
            }
            catch (e) {
                const err = e;
                return [null, err];
            }
        });
    };
}
exports.resultifyAsync = resultifyAsync;
