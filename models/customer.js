const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 50,
        trim: true
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        validate: {
            validator: (val) => Number.isInteger(Number(val.trim())),
            message: '{VALUE} is not an integer value'
        }
    }
});

const Customer = mongoose.model('Customer', customerSchema);


const validate = (arg) => {

    const schema = {
        name: Joi.string().min(3).max(15).required(),
        email: Joi.string().email().min(4).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(4).max(20).required()
    }

    return Joi.validate(arg, schema, {
        stripUnknown: true
    });

}

module.exports = {
    Customer,
    validate
}