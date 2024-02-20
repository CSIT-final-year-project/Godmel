import axiosInstance from "./axios.config";

class HttpService {
    headers;

    getHeader = (config)=>{
        this.headers = {}
        if(config && config.file){
            this.headers= {
                "Content-Type": "multipart/form-data"
            }
        }

        if(config && config.auth){
            const token = localStorage.getItem('_au');
            if(!token){
                throw new Error("Token not set")
            }
            this.headers = {
                ...this.headers,
                "Authorization": "Bearer "+token
            }
        }

    }

    getRequest = async(url, config=null)=>{
        try{
            this.getHeader(config);
            let response = await axiosInstance.get(url, {
                headers: this.headers
            })
            return response
        }
        catch(except){
            console.log("GetReq: ", except);
            throw except;
        }
    }
}

export default HttpService