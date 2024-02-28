import axiosInstance from "./axios.config";

class HttpService {
    headers;

    getHeader = (config) => {
        this.headers = {}
        if(config && config.file) {
            this.headers ={
                ...this.headers, 
                "Content-Type": "multipart/form-data"
            }
        }

        // TODO: Auth token add
        if(config && config.auth) {
            const token = localStorage.getItem('_au');
            if(!token) {
                throw new Error("Token not set")
            }
            this.headers = {
                ...this.headers, 
                "Authorization": "Bearer "+token
            }
        }
    }


    putRequest = async (url,data={}, config=null) => {
        try {
            this.getHeader(config)
            let response = await axiosInstance.put(url, data, {
                headers: this.headers
            });
            // log here if post 
            return response;
        } catch(exception) {
            console.log("PutReq: ", exception)
            throw exception;
        }
    }
    patchRequest = async (url,data={}, config=null) => {
        try {
            this.getHeader(config)
            let response = await axiosInstance.patch(url, data, {
                headers: this.headers
            });
            // log here if post 
            return response;
        } catch(exception) {
            console.log("PatchReq: ", exception)
            throw exception;
        }
    }
    postRequest = async (url,data={}, config=null) => {
        try {
            this.getHeader(config)
            let response = await axiosInstance.post(url, data, {
                headers: this.headers
            });
            // log here if post 
            return response;
        } catch(exception) {
            console.log("PostReq: ", exception)
            throw exception;
        }
    }

    getRequest = async (url,config=null) => {
        try {
            this.getHeader(config)
            let response = await axiosInstance.get(url,{
                headers: this.headers
            });
            return response;
        } catch(exception) {
            console.log("GetReq: ", exception)
            throw exception;
        }
    }

    deleteRequest = async(url, config={}) => {
        try {
            this.getHeader(config)
            let response = await axiosInstance.delete(url,{
                headers: this.headers
            });
            return response;
        } catch(exception) {
            console.log("DeleteReq: ", exception)
            throw exception;
        }
    }
}

export default HttpService