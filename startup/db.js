const mongoose = require("mongoose");
const logger = require('./logging');

module.exports = () => {
    mongoose
        .connect("mongodb://localhost/movieApp", {
            useNewUrlParser: true
        })
        .then(() => logger.info("succesfully connected to mongodb"))
}