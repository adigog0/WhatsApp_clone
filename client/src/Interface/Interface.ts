import { MESSAGE_STATUS_TYPE } from "../constants/constants";

// type IMessageStatus = typeof MESSAGE_STATUS_TYPE [keyof typeof MESSAGE_STATUS_TYPE];
export interface IMessageObj {
    sender: string;
    receipentId: string;
    message: string;
    date: Date;
    status_type: MESSAGE_STATUS_TYPE;
}

export interface IUsers {
    user_id: string;
    user_email: string;
    user_name: string;
    user_picture: string | undefined;
    message?:string;
    date?:string | Date;
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
    senderid:string | number;
    receipentid:string | number;
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