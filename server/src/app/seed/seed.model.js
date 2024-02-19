const mongoose = require('mongoose');
const AttributeSchema = new mongoose.Schema({
    key: String,
    value: [String]
})

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const SeedSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 2
    },
    slug: {
        type: String,
        unique: true,
    },
    summary: String,
    price: {
        type: Number,
        min: 1,
        required: true
    },
    discount: {
        type: Number,
        min: 0
    },
    afterDiscount: {
        type: Number,
        min: 1
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    images: [String],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
});

const SeedModel = mongoose.model('Seed', SeedSchema);
module.exports = SeedModel;