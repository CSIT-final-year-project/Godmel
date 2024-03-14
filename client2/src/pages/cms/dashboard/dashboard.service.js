import HttpService from "../../../repository/http.service";

class DashboardService extends HttpService{
    adminDash = async ()=>{
        try{
            const response = await this.getRequest(
                "/v1/dashboard/admin-dashboard", 
                { auth: true }
            )
            return response
        }
        catch(except){
            throw except;
        }
    }
    farmerDash = async ()=>{
        try{
            const response = await this.getRequest(
                "/v1/dashboard/admin-dashboard", 
                { auth: true }
            )
            return response
        }
        catch(except){
            throw except;
        }
    }
}

const dashboardSvc = new DashboardService();
export default dashboardSvc