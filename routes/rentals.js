const epxress = require('express');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const {
    Rental,
    validate
} = require('../models/rental');
const {
    Customer
} = require('../models/customer');
const {
    Movie
} = require('../models/movie');
const auth = require('../middleware/auth')

const router = epxress.Router();
Fawn.init(mongoose);


router.get('/', async (req, res) => {
    const rentals = await Rental.find().populate('customer', '-__v').populate('movie', '-__v');
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let movie = await Movie.findById(result.value.movie);
    if (!movie) return res.status(400).send('Invalid movie');

    const customer = await Customer.findById(result.value.customer);
    if (!customer) return res.status(400).send('Invalid customer');

    if (!movie.numberInStock) return res.status(400).send('Movie out of stock')

    let rental = new Rental({
        ...result.value
    });

    try {

        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {
                _id: movie._id
            }, {
                numberInStock: movie.numberInStock - 1
            })
            .run()

        res.send(rental);

    } catch (err) {
        res.status(500).send('Something failed')
    }

});



module.exports = router;