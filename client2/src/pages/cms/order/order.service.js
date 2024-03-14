import HttpService from "../../../repository/http.service";

class OrderService extends HttpService {
    orderLists = async() => {
        try {
            const data = await this.getRequest(
                '/v1/cart/incoming-order',
                {auth: true}
            )
            console.log(data)
            return data;
        } catch(exception) {
            console.log(exception)
            throw exception;
        }
    }

    transactionLists = async() => {
        try {
            const data = await this.getRequest(
                '/v1/cart/completed-order',
                {auth: true}
            )
            console.log(data)
            return data;
        } catch(exception) {
            console.log(exception)
            throw exception;
        }
    }

    markDispatched = async(id, data)=>{
        try {
            let res = await this.putRequest(
                '/v1/cart/dispatched/' + id, data,
                {auth: true}
            )
            return res;
        } 
        catch(exception) {
            throw exception;
        }
    }

    deleteById = async(id) => {
        try{
            let response = await this.deleteRequest(
                '/v1/cart/delete'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getOrderById = async(id) => {
        try{
            let response = await this.getRequest(
                '/v1/order/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

}

const orderSvc = new OrderService()
export default orderSvc