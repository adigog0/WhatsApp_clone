import { atom } from "recoil";
import { IUsers } from "../Interface/Interface";

export const INITCHAT ={
  user_id: "",
    user_email: "",
    user_name: "",
    user_picture: undefined,
    message: "",
    date: "",
}

export const selectedChatUser = atom<IUsers>({
  key: "selectedChatUser",
  default: INITCHAT,
});
