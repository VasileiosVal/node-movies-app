const mongoose = require('mongoose');
const Joi = require('joi');


const rentalSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        required: true,
        min: 0
    }

});

rentalSchema.index({
    customer: 1,
    movie: 1
}, {
    unique: true
})

const Rental = mongoose.model('Rental', rentalSchema);

const validate = (arg) => {

    const schema = {
        customer: Joi.objectId().required(),
        movie: Joi.objectId().required(),
        dateOut: Joi.date(),
        dateReturned: Joi.date(),
        rentalFee: Joi.number().min(0).required()
    };

    return Joi.validate(arg, schema, {
        stripUnknown: true
    })
}

module.exports = {
    Rental,
    validate
}