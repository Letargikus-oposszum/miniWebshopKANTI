import axios from "axios";

export const BACKEND_URL = "http://localhost:3002/";

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

export default apiClient;