import Axios from "axios";

const URL = "http://localhost:3001/"

let axios = Axios.create({
  baseURL:URL ,
});

axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("access_token");
  console.log("token in axios.global.ts",token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 

export default axios;
