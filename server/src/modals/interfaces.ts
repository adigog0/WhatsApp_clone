import { MESSAGE_STATUS_TYPE } from "./types";

export interface ISenderData {
  messageid: number | string;
  receipentid: number | string;
  senderid:  number | string;
  message: string;
  status_type: MESSAGE_STATUS_TYPE;
  date: Date | string;
 
}
