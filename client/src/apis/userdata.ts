import axios from "./axios.global";

const baseURL = "http://localhost:3001";

export const googleSignUp = async (token: string) => {
    let response = await axios.post(`${baseURL}/google-sign-up`, {
        token: token,
    });
    return response;
};

export const googleLogIn = async(token:string)=>{
    let response = await axios.post(`${baseURL}/google/sign-in`, {
        token: token,
    });
    return response;
}

export const getAllChats = async()=>{
    let response = await axios.get(`${baseURL}/chats`);
    console.log("get all chats",response);
    return response;
}

export const getUserMessages = (id:string)=>{
    return async function() {
        let response = await axios.get(`${baseURL}/user-messages/${id}`);
        return response;

    }
}
