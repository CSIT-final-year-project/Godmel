import HttpService from "../../../repository/http.service";

class BannerService extends HttpService{
    getBannerForHome = async()=>{
        try{
            let result = await this.getRequest('/v1/banner/home');
            return result;
        }
        catch(except){
            throw except
        }
    }
}

const bannerSvc = new BannerService();
export default bannerSvc