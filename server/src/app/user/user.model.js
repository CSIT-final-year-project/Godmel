const mongoose = require('mongoose');

const userSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    role: {
        type: String,
        enum: ['admin', 'supplier', 'rider', 'farmer', 'consumer'],
        default: "customer"
    },
    token: {
        type: String,
        default: null
    },
    image: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    password: {
        type: String,
        default: null
    },
    resetToken: {
        type: String,
        default: null
    },
    resetExpiry: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const UserModel = mongoose.model("User", userSchemaDef)

//exports
module.exports = UserModel