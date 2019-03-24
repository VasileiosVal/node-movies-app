const config = require("config");
const mongoose = require('mongoose');
const express = require("express");
const gernes = require("./routes/genres");

mongoose.connect('mongodb://localhost/movieApp', {
        useNewUrlParser: true
    })
    .then(() => console.log('succesfully connected to mongodb'))
    .catch(err => console.log(err))



const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    console.log(config.get("name"));
}

app.use("/api/genres", gernes);

const port = process.env.PORT || 3000;
app.listen(port);