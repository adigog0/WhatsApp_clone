import { MESSAGE_STATUS_TYPE } from "../constants/constants";

// type IMessageStatus = typeof MESSAGE_STATUS_TYPE [keyof typeof MESSAGE_STATUS_TYPE];
export interface IMessageObj {
    sender: string;
    receipentId: string;
    message: string;
    date: Date;
    status_type: MESSAGE_STATUS_TYPE;
}

// export interface IChatUserObj {
//     userId: string;
//     userName: string;
//     user_email:string;
//     user_picture: string | undefined;
//     user_chats: string[];
// }

export interface IUsers {
    display_id: string;
    display_email: string;
    display_name: string;
    display_picture: string | undefined;
    message:string;
    date:string;
}

export interface IChatData {
    id: string;
    date: string;
    chat: string;
    sendTime: string;
    userName: string;
}

export interface IChats{
    messageid?:string;
    senderid:string;
    receipentid:string;
    status_type:MESSAGE_STATUS_TYPE;
    message:string;
    date:string | Date;
}

export interface IlocalStorageData{
    id:string | null;
    user_email:string | null;
    user_picture:string | null;
    username:string | null;
};