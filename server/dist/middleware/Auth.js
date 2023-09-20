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
exports.Auth = void 0;
const user_service_1 = require("../services/user.service");
function Auth(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const [result, error] = yield (0, user_service_1.decryptUserInfo)(token !== null && token !== void 0 ? token : "");
            if (result === null) {
                res.status(401).json({ message: "Unauthorized Access" });
            }
            else {
                const id = yield (0, user_service_1.getUserId)(result === null || result === void 0 ? void 0 : result.email);
                const userId = id.id;
                const user_email = result === null || result === void 0 ? void 0 : result.email;
                const userObj = { userId, user_email };
                req.user = userObj;
            }
            next();
        }
        catch (err) {
            console.log("err in Auth", err);
            res.status(500).json({ message: "Error in Auth" });
        }
    });
}
exports.Auth = Auth;
