import HttpService from "../../../repository/http.service";

class UserService extends HttpService {
    userLists = async({page=1,limit=10,search=""}) => {
        try {
            let data = await this.getRequest(
                '/v1/user/users?page='+page+'&limit='+limit+'&search='+search,
                {auth: true}
            )
            return data;
        } catch(exception) {
            throw exception;
        }
    }

    storeUser = async(data) => {
        try {
            let response = await this.postRequest(
                '/v1/user/createAdmin',
                data,
                {file: true, auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    deleteById = async(id) => {
        try{
            let response = await this.deleteRequest(
                '/v1/user/users/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    updateUser = async(id, data) => {
        try {
            let response = await this.putRequest(
                '/v1/user/users/'+id,
                data,
                {file: true, auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getUserById = async(id) => {
        try{
            let response = await this.getRequest(
                '/v1/user/users/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    changePassword = async(data) => {
        try{
            let response = await this.putRequest(
                '/v1/user/change-password', data, 
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }
    

}

const userSvc = new UserService()
export default userSvc