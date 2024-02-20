import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server Timed Out",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

AxiosInstance.interceptors.response.use(
    (response)=>{
        return response.data;
    },
    (error)=>{
        if(error.response.status === 401){

        }
        throw error.response.data;
    }
)

export default AxiosInstance