const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please Provide Username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
    }
})

UserSchema.plugin(uniqueValidator)

//export model
UserSchema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;