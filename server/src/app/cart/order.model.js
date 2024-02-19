const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    billNo: {
        type: Number, 
        required: true
    },
    buyer: {
        type: mongoose.Types.ObjectId, 
        ref: "User",
        required: true
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: false
    },
    subTotal: {
        type: Number, 
        required: true, 
        min: 1
    },
    discount: {
        type: Number,  
        min: 0
    },
    vatAmt: {
        type: Number
    },
    serviceCharge: {
        type: Number
    },
    amount: {
        type: Number
    },
    status: {
        type: String, 
        enum: ['new', 'dispatched'],
        default: "new"
    }
}, {
    timestamps: true, 
    autoCreate: true, 
    autoIndex: true
})
const OrderModel = mongoose.model("Order", OrderSchema)
module.exports = OrderModel;