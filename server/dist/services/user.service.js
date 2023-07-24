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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserChats = exports.getUserMessages = exports.getUserId = exports.decryptUserInfo = exports.sendMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../db"));
function sendMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date, message, receipentid, senderid, status_type } = data;
            console.log(status_type);
            const messagetoback = yield db_1.default.query(`INSERT INTO public."messages" (senderid,receipentid,status_type,message,date)
        VALUES(${senderid},${receipentid},'${status_type}','${message}','${date}') `);
            console.log("message stored", messagetoback);
        }
        catch (err) {
            console.log("error in saving data", err);
        }
    });
}
exports.sendMessage = sendMessage;
function decryptUserInfo(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ticket = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
            const { name, email, picture } = ticket.data;
            const userInfo = { name, email, picture };
            return userInfo;
        }
        catch (err) {
            console.log("error in decrypting user info", err);
            return null;
        }
    });
}
exports.decryptUserInfo = decryptUserInfo;
function getUserId(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield db_1.default.query(`SELECT id FROM public."User" WHERE user_email= $1`, [email]);
            const userId = res.rows[0];
            return userId;
        }
        catch (err) {
            console.log("error in fetching user Id ", err);
        }
    });
}
exports.getUserId = getUserId;
function getUserMessages(reqId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("GET USER MESSAGES", reqId, userId);
            const userMessages = yield db_1.default.query(`select * from public."messages" where (senderid=$1 AND receipentid=$2)  OR (senderid=$2 AND receipentid=$1) `, [reqId, userId]);
            return userMessages;
        }
        catch (err) {
            console.log("err in fetching message", err);
        }
    });
}
exports.getUserMessages = getUserMessages;
function getUserChats(reqId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userChats = yield db_1.default.query(`select 
            distinct on (display_id) display_id, 
            messageid,
            message,
            "date", 
            display_name, 
            display_email ,
            display_picture
        from 
        (select 
            m.messageid, 
            m."date", 
            m.message,
            case 
                when m.receipentid =${reqId}
                then s.user_email
                when m.senderid = ${reqId}
                then r.user_email
                else 'NA'
            end as display_email,
            case
                when m.receipentid = ${reqId}
                then s.username
                when m.senderid = ${reqId}
                then r.username
                else 'NA'
            end as display_name,
            case
                when m.receipentid = ${reqId}
                then s.user_picture
                when m.senderid = ${reqId}
                then r.user_picture
                else 'NA'		
            end as display_picture,	
            case
                when m.receipentid = ${reqId}
                then s.id
                when m.senderid = ${reqId}
                then r.id
                else -1
            end as display_id
        from public."messages" m inner join public."User" s on m.senderid = s.id inner join public."User" r on m.receipentid = r.id
        where m.senderid = ${reqId} or m.receipentid = ${reqId}
        order by "date" desc) t ;`);
            return userChats;
        }
        catch (err) {
            console.log("Error in fetching user Chats");
        }
    });
}
exports.getUserChats = getUserChats;
