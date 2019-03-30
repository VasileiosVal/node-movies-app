require('express-async-errors');
let logger = require('./startup/logging');

const express = require("express");
const app = express();

process.on('uncaughtException', (ex) => {
    logger.error(ex.message, ex);
    process.exit(1);
})

process.on('unhandledRejection', (ex) => {
    logger.error(ex.message, ex);
    process.exit(1);
});


require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Listening on port: ${port}`)
});