const express = require('express');
const {
    Movie,
    validate
} = require('../models/movie');
const {
    Genre
} = require('../models/genre');
const router = express.Router();


router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title').select('-__v').populate('genre', '-__v');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('No movie found with the given ID');
    res.send(movie);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(404).send(result.error.details[0].message);

    const genre = await Genre.findById(result.value.genre);
    if (!genre) return res.status(400).send('Invalid genre');

    let movie = new Movie({
        ...result.value
    })

    movie = await movie.save();

    res.send(movie);
});

router.patch('/:id', async (req, res) => {
    let movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('No movie found with the given ID');

    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    if (movie.genre !== result.value.genre) {
        const genre = await Genre.findById(result.value.genre);
        if (!genre) return res.status(400).send('Invalid genre');
    }

    movie.set({
        ...result.value
    });

    movie = await movie.save();

    res.send(movie);

});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('No movie found with the given ID')
    res.send(movie);
});



module.exports = router;