const mongoose = require('mongoose');

const patSchemaDef = new mongoose.Schema({
    user: {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            require: true
        },
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
    },
    token: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const PATModel = mongoose.model("Pat", patSchemaDef);

module.exports = PATModel;