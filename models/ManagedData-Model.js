const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Double, ObjectID } = require('mongodb')
const customerDataSchema = new mongoose.Schema({
    websiteURL: {
        type: String,
        required: true,
        trim: true,       
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },

    hashedPassword: {
        type: String,
        required: true

    },
    
}, { timestamps: true, versionKey: false })

//password hashing the salt is 10
customerDataSchema.virtual('password')
    .set(function (password) {
        this.hashPassword = bcrypt.hashSync(password, 10);
    });

const CustomerData = mongoose.model('CustomerData', customerDataSchema)
module.exports = CustomerData;