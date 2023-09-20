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
exports.updateMessageStatusById = exports.getAllUsers = exports.getUserChats = exports.getUserMessages = exports.getUserId = exports.sendMessage = exports.decryptUserInfo = exports.signInUser = exports.signUpUser = void 0;
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../db"));
const result_1 = require("../lib/result");
function signUpUser(name, email, picture) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const setuser = yield db_1.default.query(`INSERT INTO public."User"
    (username, user_email, user_picture)
    VALUES('${name}', '${email}', '${picture}') RETURNING *`);
            return setuser.rows;
        }
        catch (err) {
            console.log("err in signing up the user", err);
        }
    });
}
exports.signUpUser = signUpUser;
exports.signInUser = (0, result_1.resultifyAsync)((email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailCheckQuery = yield db_1.default.query(` select * from public.
          "User" where user_email = $1 `, [email]);
    console.log("email exist in service", emailCheckQuery);
    return emailCheckQuery.rows[0];
}));
exports.decryptUserInfo = (0, result_1.resultifyAsync)((token) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
    const { name, email, picture } = ticket.data;
    const userInfo = { name, email, picture };
    console.log("user info in decryption in service", userInfo);
    return userInfo;
}));
// export async function decryptUserInfo(token: string) {
//   try {
//     const ticket = await axios.get(
//       `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
//     );
//     const { name, email, picture }: IUserInfo = ticket.data;
//     const userInfo = { name, email, picture };
//     return userInfo;
//   } catch (err: any) {
//     console.log("error in decrypting user info", err);
//     return null;
//   }
// }
function sendMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date, message, receipentid, senderid, status_type } = data;
            const messagetosend = yield db_1.default.query(`INSERT INTO public."messages" (senderid,receipentid,status_type,message,date)
        VALUES(${senderid},${receipentid},'${status_type}','${message}','${date}') RETURNING *`);
            return messagetosend.rows[0];
        }
        catch (err) {
            console.log("error in saving data", err);
        }
    });
}
exports.sendMessage = sendMessage;
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
// export const getUserId = resultifyAsync(async (email: string) => {
//       const res = await pool.query(
//       `SELECT id FROM public."User" WHERE user_email= $1`,
//       [email]
//     );
//     const userId = res.rows[0];
//     return userId;
// })
exports.getUserMessages = (0, result_1.resultifyAsync)((reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userMessages = yield db_1.default.query(`select * from public."messages" where (senderid=$1 AND receipentid=$2)  OR (senderid=$2 AND receipentid=$1) `, [reqId, userId]);
    return userMessages;
}));
exports.getUserChats = (0, result_1.resultifyAsync)((reqId) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.getAllUsers = (0, result_1.resultifyAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield db_1.default.query(`SELECT * FROM public."User"`);
    return res;
}));
exports.updateMessageStatusById = (0, result_1.resultifyAsync)(({ messageid, status_type }) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield db_1.default.query(`
      UPDATE public."messages"
      SET status_type = $1
      WHERE messageid = $2
     `, [status_type, messageid]);
    return res;
}));
// export async function getAllUsers() {
//   try {
//     const res = await pool.query(`SELECT * FROM public."User"`);
//     return res;
//   } catch (err: any) {
//     console.log("error in fetching all users", err);
//   }
// }
// export async function getUserChats(reqId: number) {
//   try {
//     const userChats = await pool.query(
//       `select
//             distinct on (display_id) display_id,
//             messageid,
//             message,
//             "date",
//             display_name,
//             display_email ,
//             display_picture
//         from
//         (select
//             m.messageid,
//             m."date",
//             m.message,
//             case
//                 when m.receipentid =${reqId}
//                 then s.user_email
//                 when m.senderid = ${reqId}
//                 then r.user_email
//                 else 'NA'
//             end as display_email,
//             case
//                 when m.receipentid = ${reqId}
//                 then s.username
//                 when m.senderid = ${reqId}
//                 then r.username
//                 else 'NA'
//             end as display_name,
//             case
//                 when m.receipentid = ${reqId}
//                 then s.user_picture
//                 when m.senderid = ${reqId}
//                 then r.user_picture
//                 else 'NA'
//             end as display_picture,
//             case
//                 when m.receipentid = ${reqId}
//                 then s.id
//                 when m.senderid = ${reqId}
//                 then r.id
//                 else -1
//             end as display_id
//         from public."messages" m inner join public."User" s on m.senderid = s.id inner join public."User" r on m.receipentid = r.id
//         where m.senderid = ${reqId} or m.receipentid = ${reqId}
//         order by "date" desc) t ;`
//     );
//     return userChats;
//   } catch (err: any) {
//     console.log("Error in fetching user Chats");
//   }
// }
// export async function signInUser(email: string) {
//   try {
//     const emailCheckQuery = await pool.query(
//       ` select * from public.
//     "User" where user_email = $1 `,
//       [email]
//     );
//     return emailCheckQuery;
//   } catch (err) {
//     console.log("error in signing in the user", err);
//   }
// }
