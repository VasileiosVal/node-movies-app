const Joi = require("joi");
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model("Movie", movieSchema);

const validate = arg => {
    const schema = {
        title: Joi.string()
            .required()
            .min(2)
            .max(100),
        genre: Joi.string().required(),
        numberInStock: Joi.number()
            .integer()
            .min(0)
            .max(255)
            .required(),
        dailyRentalRate: Joi.number()
            .integer()
            .min(0)
            .max(255)
            .required()
    };

    return Joi.validate(arg, schema, {
        stripUnknown: true
    });
};

module.exports = {
    Movie,
    validate
}