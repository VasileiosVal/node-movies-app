const Joi = require('joi');
const config = require('config');
const express = require('express');
const gernes = require('./routes/genres')

const app = express();
app.use(express.json());


if (process.env.NODE_ENV === 'development') {
    console.log(config.get('name'))
}


app.use('/api/genres', gernes);

const port = process.env.PORT || 3000;
app.listen(port);