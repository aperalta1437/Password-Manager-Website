const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Double, ObjectID } = require('mongodb')

const customerSchema = new mongoose.Schema({
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
    customer_data: {
        type: Array
    }
}, { timestamps: true, versionKey: false })

//password hashing the salt is 10
customerSchema.virtual('password')
    .set(function (password) {
        this.hashPassword = bcrypt.hashSync(password, 10);
    });

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer;