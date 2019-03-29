const mongoose = require("mongoose");

module.exports = () => {
    mongoose
        .connect("mongodb://localhost/movieApp", {
            useNewUrlParser: true
        })
        .then(() => console.log("succesfully connected to mongodb"))
}