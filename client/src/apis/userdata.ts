import axios from "./axios.global";

const baseURL = "http://localhost:3001";

export const googleLogin = async (payload: string) => {
    let response = await axios.post(`${baseURL}/googlelogin`, {
        token: payload,
    });
    return response;
};
