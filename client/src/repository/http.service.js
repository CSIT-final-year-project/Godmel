import AxiosInstance from "./axios.config";

class HttpService{
    headers;
    getHeader = (config)=>{
        this.headers = {};
        if(config&&config.file){
            this.headers = {
                ...this.headers,
                "Content-type": "multipart/form-data"
            }
        }
    }

    postRequest = async(url, data={}, config=null)=>{
        try{
            this.getHeader(config);
            let response = await AxiosInstance.post(url, data, {
                headers: this.headers
            });
            return response;
        }
        catch(except){
            console.log("PostReq: ", except);
            throw except
        }
    }

    getRequest = async(url, config=null)=>{
        try{
            this.getHeader(config);
            let response = await AxiosInstance.get(url, {
                headers: this.headers
            });
            return response;
        }
        catch(except){
            console.log("GetReq: ", except);
            throw except
        }
    }
}

export default HttpService;