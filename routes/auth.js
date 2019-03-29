const express = require("express");
const bcrypt = require('bcrypt');
const _ = require("lodash");
const {
    User,
    validateLogin,
    validateRegister
} = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
    const result = validateRegister(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({
        email: result.value.email
    });
    if (user) return res.status(400).send("Email exists");

    user = new User({
        ...result.value
    });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    res.send(_.pick(user, ["id", "name", "email"]));
});

router.post('/login', async (req, res) => {
    const result = validateLogin(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const user = await User.findOne({
        email: result.value.email
    })
    if (!user) return res.status(400).send('Invalid username or password')

    const validPass = await bcrypt.compare(result.value.password, user.password);
    if (!validPass) return res.status(400).send('Invalid username or password')

    const token = user.generateJwtToken();

    res.send(token)
});

module.exports = router;