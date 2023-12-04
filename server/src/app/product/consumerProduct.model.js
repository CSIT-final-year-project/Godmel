const mongoose = require('mongoose');

const consumerProductReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true,
    },
    rating: {
        type: Number,
        requried: true,
    },
    comment: {
        type: String,
        requried: true,
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const consumerProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    prod_name: {
        type: String,
        required: true
    },
    seller_name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    prod_size: {
        type: String,
        required: true,
    },
    reviews: [consumerProductReviewSchema],
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const consumerProductModel = mongoose.model('consumerProduct', consumerProductSchema);

module.exports = consumerProductModel;