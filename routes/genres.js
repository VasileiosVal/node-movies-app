const express = require("express");
const {
  Genre,
  validate
} = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/", async (req, res) => {
  let genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {

  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("No genre found with the given ID.");
  res.send(genre);
});

router.post("/", [auth, admin], async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);
  // } catch (err) {
  //   for (let val in err.errors) {
  //       console.log(err.errors[val].message)
  //   }
  //   res.status(400).send(err.message);
  // }
});

router.patch("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);


  const genre = await Genre.updateOne({
    _id: req.params.id
  }, {
    name: req.body.name
  });
  if (!genre)
    return res.status(404).send("No genre found with the given ID.");
  res.send(genre);
});

router.delete("/:id", async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("No genre found with the given ID.");
  res.send(genre);
});

module.exports = router;