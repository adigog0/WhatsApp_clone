import { format } from "date-fns";

export function extractTime(date:string | Date){
   return format(new Date(date),'hh:mm a');
}