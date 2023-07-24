import axios from "axios";
import pool from "../db";
import { ISenderData } from "../modals/interfaces";

export interface IUserInfo {
    name: string;
    email: string;
    picture: string;
}

export async function sendMessage(data: ISenderData) {
    try {
        const { date, message, receipentid, senderid, status_type } = data;
        console.log(status_type);

        const messagetoback =
            await pool.query(`INSERT INTO public."messages" (senderid,receipentid,status_type,message,date)
        VALUES(${senderid},${receipentid},'${status_type}','${message}','${date}') `);
        console.log("message stored", messagetoback);
    } catch (err) {
        console.log("error in saving data", err);
    }
}

export async function decryptUserInfo(token: string | undefined) {
    try {
        const ticket = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
        );

        const { name, email, picture }: IUserInfo = ticket.data;
        const userInfo = { name, email, picture };

        return userInfo;
    } catch (err: any) {
        console.log("error in decrypting user info", err);
        return null;
    }
}

export async function getUserId(email: string) {
    try {
        const res = await pool.query(
            `SELECT id FROM public."User" WHERE user_email= $1`,
            [email]
        );
        const userId = res.rows[0];
        return userId;
    } catch (err: any) {
        console.log("error in fetching user Id ", err);
    }
}
export async function getUserMessages(reqId: number, userId: string) {
    try {
        console.log("GET USER MESSAGES", reqId, userId);
        const userMessages = await pool.query(
            `select * from public."messages" where (senderid=$1 AND receipentid=$2)  OR (senderid=$2 AND receipentid=$1) `,
            [reqId, userId]
        );

        return userMessages;
    } catch (err: any) {
        console.log("err in fetching message", err);
    }
}

export async function getUserChats(reqId: number) {
    try {
        const userChats = await pool.query(
            `select 
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
        order by "date" desc) t ;`
        );

        return userChats;
    } catch (err: any) {
        console.log("Error in fetching user Chats");
    }
}
