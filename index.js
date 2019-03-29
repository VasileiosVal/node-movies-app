require('express-async-errors');
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const gernes = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const auth = require("./routes/auth");
const error = require('./middleware/error');



if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/movieApp", {
    useNewUrlParser: true
  })
  .then(() => console.log("succesfully connected to mongodb"))
  .catch(err => console.log(err));

const app = express();
app.use(express.json());

app.use("/api/genres", gernes);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/auth", auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port);