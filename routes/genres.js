const express = require('express');
const router = express.Router();


const validate = (arg) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(arg, schema);
}

let genres = [{
    id: 1,
    name: 'thriler'
}, {
    id: 2,
    name: 'comedy'
}, {
    id: 3,
    name: 'crime'
}]

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('No genre found with the given ID.')
    res.send(genre);
});

router.post('/', (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message)

    let genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);

    res.send(genre);
});

router.patch('/:id', (req, res) => {
    let genre = genres.find(gen => gen.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('No genre found with the given ID.')

    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message)

    genre = {
        ...genre,
        ...req.body
    };

    genres = genres.map(gen => {
        if (gen.id === genre.id) return {
            ...gen,
            ...genre
        };
        else return gen;
    })

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('No genre found with the given ID.')

    genres = genres.filter(gen => gen.id !== genre.id)

    res.send(genre);
});

module.exports = router;