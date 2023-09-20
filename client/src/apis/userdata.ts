import { IChats } from "../Interface/Interface";
import axios from "./axios.global";

const baseURL = "http://localhost:3001";

export const googleSignUp = async (token: string) => {
  let response = await axios.post(`${baseURL}/google-sign-up`,{
    token: token,
  });
  return response;
};

export const googleLogIn = async (token: string) => {
  let response = await axios.post(`${baseURL}/google/sign-in`, {
    token: token,
  });
  return response;
};

export const getAllChats = async () => {
  let response = await axios.get(`${baseURL}/chats`);
  console.log("response for getting all chats",response);
  return response;
};

export const getUserMessages = async (id: string) => {
  let response = await axios.get(`${baseURL}/user-messages/${id}`);
  console.log("get user messages",response);
  return response;
};

export const getAllUsers = async () => {
  let response = await axios.get(`${baseURL}/user-list`);
  return response;
};

export const updateMessageStatus = async (message:IChats) =>{
  console.log("message data receive from mutate",message);
  let response = await axios.patch(`${baseURL}/update-message-status/${message.messageid}`,{
    message:message
  });
  return response;

};

