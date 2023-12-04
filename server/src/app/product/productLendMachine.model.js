const mongoose = require('mongoose');

const machineReviewSchema = new mongoose.Schema({
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

const productLendMachineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }, 
    target_plant: {
        type: String,
        required: true
    },
    reviews: [machineReviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    machine_power: {
        type: String,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
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

const LendMachineModel = mongoose.model('LendMachine', productLendMachineSchema);

module.exports = LendMachineModel;