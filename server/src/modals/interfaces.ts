import { MESSAGE_STATUS_TYPE } from "./types";

export interface ISenderData{
        date: Date,
        status_type: MESSAGE_STATUS_TYPE,
        message: string,
        senderid: number,
        receipentid: number      
}