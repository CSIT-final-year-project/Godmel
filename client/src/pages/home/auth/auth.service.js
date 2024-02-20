import HttpService from "../../../repository/http.service";

class AuthService extends HttpService{
    register = async(data)=>{
        try{
            let response = await this.postRequest(
                'v1/auth/register',
                data,
                {file:true}
            )
            return response
        }
        catch(except){
            throw except;
        }
    }

    getActivationTokenVerify = async(token)=>{
        try{
            let response = await this.getRequest(
                'v1/auth/verify-token/' + token
            )
            return response
        }
        catch(except){
            throw except
        }
    }

    setPassword = async(token, data)=>{
        try{
            let response = await this.postRequest(
                'v1/auth/set-password/'+token,
                data
            )
            return response
        }
        catch(except){
            throw except
        }
    }

    login = async(data)=>{
        try{
            let response = await this.postRequest(
                'v1/auth/login',
                data
            )
            localStorage.setItem("RESTRO_token", response.result.token);
            localStorage.setItem("RESTRO_reftoken", response.result.refreshToken);
            return response
        }
        catch(except){
            throw except
        }
    }
}

const authSvc = new AuthService();
export default authSvc