const mongoose = require('mongoose');

const CategorySchemaDef = new mongoose.Schema({
    cropType: {
        type: String,
        required: true,
        min: 2,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        nullable: true,
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const CategoryModel = mongoose.model('Category', CategorySchemaDef);

module.exports = CategoryModel