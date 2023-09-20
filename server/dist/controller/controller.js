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
exports.getContactList = exports.getUserAllChats = exports.updateStatusByMessageId = exports.getUserMessageById = exports.googleSignIn = exports.googleSignUp = void 0;
const user_service_1 = require("../services/user.service");
const error_1 = require("../lib/error");
const success_1 = require("../lib/success");
const response_1 = require("../utils/response");
function googleSignUp(...[req, res]) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result, error] = yield (0, user_service_1.decryptUserInfo)(req.body.token);
            if (result) {
                // const { name, email, picture } = ticket;
                // const userDetails = await signUpUser(name, email, picture);
                // res.status(201).json(userDetails);
            }
        }
        catch (err) {
            console.log("error in google Signup ", err);
        }
    });
}
exports.googleSignUp = googleSignUp;
// export async function getContactList(...[req,res]:ControllerArgs<{}>){
//   const [result,error] = await getAllUsers<DefaultAPIError>();
//   if(error) return sendErrorResponse(res,new DefaultAPIError(500,`${error.message},${error.stack}`));
//   else return sendSucccessResponse(res,new APISuccessResponse(result.rows ?? []))
// } 
function googleSignIn(...[req, res]) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, error] = yield (0, user_service_1.decryptUserInfo)(req.body.token);
        if (result) {
            const { email } = result;
            const [emailExist, error] = yield (0, user_service_1.signInUser)(email);
            if (error)
                return (0, response_1.sendErrorResponse)(res, new error_1.DefaultAPIError(500, `${error.message},${error.stack}`));
            else
                return (0, response_1.sendSucccessResponse)(res, new success_1.APISuccessResponse(emailExist !== null && emailExist !== void 0 ? emailExist : []));
        }
    });
}
exports.googleSignIn = googleSignIn;
function getUserMessageById(...[req, res]) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, error] = yield (0, user_service_1.getUserMessages)(req.user.userId, req.params.id);
        if (error)
            return (0, response_1.sendErrorResponse)(res, new error_1.DefaultAPIError(500, `${error.message},${error.stack}`));
        else
            return (0, response_1.sendSucccessResponse)(res, new success_1.APISuccessResponse(result));
    });
}
exports.getUserMessageById = getUserMessageById;
function updateStatusByMessageId(...[req, res]) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, error] = yield (0, user_service_1.updateMessageStatusById)(req.body.message);
        console.log("result for  update Status by message id", result);
        if (error)
            return (0, response_1.sendErrorResponse)(res, new error_1.DefaultAPIError(500, `${error.message}, ${error.stack}`));
        else
            return (0, response_1.sendSucccessResponse)(res, new success_1.APISuccessResponse(result));
    });
}
exports.updateStatusByMessageId = updateStatusByMessageId;
function getUserAllChats(...[req, res]) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, error] = yield (0, user_service_1.getUserChats)(req.user.userId);
        if (error)
            return (0, response_1.sendErrorResponse)(res, new error_1.DefaultAPIError(500, `${error.message}, ${error.stack}`));
        else
            return (0, response_1.sendSucccessResponse)(res, new success_1.APISuccessResponse(result));
    });
}
exports.getUserAllChats = getUserAllChats;
function getContactList(...[req, res]) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const [result, error] = yield (0, user_service_1.getAllUsers)();
        if (error)
            return (0, response_1.sendErrorResponse)(res, new error_1.DefaultAPIError(500, `${error.message},${error.stack}`));
        else
            return (0, response_1.sendSucccessResponse)(res, new success_1.APISuccessResponse((_a = result.rows) !== null && _a !== void 0 ? _a : []));
    });
}
exports.getContactList = getContactList;
