const express = require('express');
const {
    Genre,
    validate
} = require('../models/genre')

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let genres = await Genre.find().sort('name');
        res.send(genres);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

router.get('/:id', async (req, res) => {

    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('No genre found with the given ID.')
        res.send(genre);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message)

    let genre = new Genre({
        name: req.body.name
    });

    try {
        genre = await genre.save();
        res.send(genre);

    } catch (err) {
        // for (let val in err.errors) {
        //     console.log(err.errors[val].message)
        // }
        res.status(400).send(err.message)
    }
});

router.patch('/:id', async (req, res) => {

    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message)

    try {
        const genre = await Genre.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name
        });
        if (!genre) return res.status(404).send('No genre found with the given ID.')
        res.send(genre);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) return res.status(404).send('No genre found with the given ID.')
        res.send(genre);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

module.exports = router;