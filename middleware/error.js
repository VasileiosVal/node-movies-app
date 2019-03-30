let logger = require('../startup/logging');

const error = (err, req, res, next) => {

    logger.error(
        err.message, err
    );

    res.status(500).send('Something failed');
}

module.exports = error;