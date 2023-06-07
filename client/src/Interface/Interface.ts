export interface IMessageObj{
    sender:string;
    receiver:string;
    message:string;
    date:Date;
    delivered:boolean;

}

export interface IReceiverObj{
    receiverName :string;
    receiverDp?:File;
    receiverChat:string[];
}

export interface IChatData{
    id:string;
    date:string;
    chat:string;
    sendTime:string;
    userName:string;
}