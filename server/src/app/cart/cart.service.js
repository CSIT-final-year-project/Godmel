const CartModel = require("./cart.model");
const OrderModel = require("./order.model");

class CartService{

    checkCart = async (productId, buyer) => {
        try {
            let cart = await CartModel.findOne({
                productId: productId, 
                buyerId: buyer,
                orderId: null
            });
            return cart;
        } catch(exception) {
            throw exception;
        }
    }

    upsertCart = async (existingCart, updateBody) => {
        try {
            let cart = null 
            if(existingCart) {
                updateBody.qty += existingCart.qty;
                updateBody.amount = updateBody.qty*updateBody.rate;
                cart = await CartModel.findByIdAndUpdate({
                    _id: existingCart?._id
                }, {
                    $set: updateBody
                })
            } else {
                cart = new CartModel(updateBody)
                cart = await cart.save()
            }
            
            return cart;
        } catch(exception) {
            throw exception;
        }
    }

    getByFilter = async(filter) => {
        try {
            console.log(filter)
            const cartDetail = await CartModel.find(filter)
                .populate("buyerId", ['_id','name', 'email'])
                // .populate("seller", ['_id','name'])
                .populate("orderId", ['_id','deliveryAddress'])
                // console.log("cartDetail", cartDetail)
            return cartDetail
        } catch(exception) {
            throw exception
        }
    }

    getById = async(id) => {
        try {
            const cartDetail = await CartModel.findById(id)
            return cartDetail;
        } catch(exception) {
            throw exception;
        }
    } 
    deleteCartById = async(id) => {
        try {
            const cartDetail = await CartModel.findByIdAndDelete(id)
            if(cartDetail) {
                return cartDetail
            } else {
                throw {code: 400, message: "Cart does not exists"}
            }
        } catch(exception) {
            throw exception;
        }
    }

    getBillNo = async() => {
        try {
            let lastOrder = await OrderModel.findOne()
                .sort({_id: "desc"})
            if(!lastOrder) {
                return 1;
            } else {
                return (+lastOrder.billNo+1)
            }
        } catch(exception) {
            throw exception
        }
    }
    createOrder = async(orderData, cartIds) => {
        try {
            let order = new OrderModel(orderData)
            let orderObj = await order.save()

            let cartUpdated = await CartModel.updateMany({
                _id: {$in: cartIds}
            }, {
                $set: {
                    orderId: order._id
                }
            })
            return {orderObj, cartUpdated}
        } catch(exception) {
            throw exception;
        }
    }
}

const cartSvc  = new CartService()
module.exports = cartSvc;