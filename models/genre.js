const mongoose = require('mongoose');
const Joi = require('joi');


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 10,
        trim: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);



const validate = arg => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(arg, schema);
}

module.exports = {
    Genre,
    validate
}