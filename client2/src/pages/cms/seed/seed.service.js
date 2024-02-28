import HttpService from "../../../repository/http.service";

class SeedService extends HttpService {
    seedLists = async({page=1,limit=10,search=""}) => {
        try {
            let data = await this.getRequest(
                '/v1/seed?page='+page+'&limit='+limit+'&search='+search,
                {auth: true}
            )
            return data;
        } catch(exception) {
            throw exception;
        }
    }

    storeSeed = async(data) => {
        try {
            let response = await this.postRequest(
                '/v1/seed',
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
                '/v1/seed/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    updateSeed = async(id, data) => {
        try {
            let response = await this.putRequest(
                '/v1/seed/'+id,
                data,
                {file: true, auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getSeedById = async(id) => {
        try{
            let response = await this.getRequest(
                '/v1/seed/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getSeedForHome = async() => {
        try {
            let result = await this.getRequest("/v1/seed/home")
            return result;
        } catch(exception) {
            throw exception
        }
    }

    getSeedBySlug = async(slug)=>{
        try{
            let result = await this.getRequest(
                '/v1/seed/'+slug+"/slug"
                );
            return result;
        }
        catch(except){
            throw except;
        }
    }
}

const seedSvc = new SeedService()
export default seedSvc