import HttpService from "../../repository/http.service";

class CartService extends HttpService{
    cartLists = async()=>{
        try{
            const response = await this.getRequest(
                "/v1/cart/list",
                {auth: true}
            )
            return response
        }
        catch(except){
            throw except
        }
    }

    deleteById = async(id)=>{
        try{
            const response = await this.deleteRequest(
                "/v1/cart/delete/" + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            throw except
        }
    }

    order = async(data)=>{
        try{
            const response = await this.postRequest(
                "/v1/cart/order", data,
                {auth: true}
            )
            return response
        }
        catch(except){
            throw except
        }
    }
}

const cartSvc = new CartService();
export default cartSvc;