import axios from "axios";

export const error = "";
export const BACKEND_URL = "http://localhost:3000/";

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers:{
        "Content-Type":"application"
    }
})

export default apiClient;