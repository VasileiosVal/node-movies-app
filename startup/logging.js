const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'process.log',
            level: 'info'
        }),
        new winston.transports.MongoDB({
            db: 'mongodb://localhost/movieApp',
            level: 'error'
        }),
    ]
});;

module.exports = logger;