const express = require('express');
const {
    Customer,
    validate
} = require('../models/customer')

const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers)
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('No customer found with the given ID')
    res.send(customer);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let customer = new Customer({
        ...result.value
    });
    customer = await customer.save();
    res.send(customer);
});

router.patch('/:id', async (req, res) => {
    let customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('No customer found with the given ID');

    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    customer.set({
        ...result.value
    })

    customer = await customer.save()
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) res.status(404).send('No customer found with the given ID')
    res.send(customer);
});





module.exports = router;