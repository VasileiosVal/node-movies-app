const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 4,
        maxlength: 50,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 6,
        maxLength: 15,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


userSchema.methods.generateJwtToken = function () {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'))
    return token;
}

const User = mongoose.model('User', userSchema);



const validateRegister = (arg) => {

    const schema = {
        name: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().min(4).max(50).required(),
        password: Joi.string().min(6).max(15).required(),
        isAdmin: Joi.boolean()
    };

    return Joi.validate(arg, schema, {
        stripUnknown: true
    })
};

const validateLogin = (arg) => {

    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    };

    return Joi.validate(arg, schema, {
        stripUnknown: true
    })
}

module.exports = {
    User,
    validateRegister,
    validateLogin
}