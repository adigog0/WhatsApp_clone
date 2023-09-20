"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = exports.pick = void 0;
function pick(obj, fields) {
    const newObj = {};
    for (const key in obj)
        if (fields.includes(key))
            newObj[key] = obj[key];
    return newObj;
}
exports.pick = pick;
function omit(obj, fields) {
    const newObj = {};
    for (const key in obj)
        if (!fields.includes(key))
            newObj[key] = obj[key];
    return newObj;
}
exports.omit = omit;
