const express = require("express");
const router = express.Router();
const Chef = require("../mongoDB/models/chef");

router.get("/", async (req, res) => {
  try {
    const chefs = await Chef.find();
    return res.json(chefs);
  } catch (error) {
    return res.send(500).json({ massage: error.massage });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);

    if (!chef) return res.status(404).send("the chef not found");

    return res.send(chef);
  } catch (error) {
    return res.send(500).json({ massage: error.massage });
  }
});

router.post("/", async (req, res) => {
  const chef = new Chef({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  });
  try {
    const newChef = await chef.save();
    res.status(201).json(newChef);
  } catch (error) {
    console.log(error.massage);
    console.log("pa");
    res.status(400).json({ massage: error.massage });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) return res.status(404).send("the course not found");

    if (req.body.name) chef.name = req.body.name;
    if (req.body.image) chef.image = req.body.image;
    if (req.body.description) chef.description = req.body.description;

    try {
      const updatedChef = await chef.save();
      return res.send(updatedChef);
    } catch (error) {
      return res.status(400).json({ massage: error.massage });
    }
  } catch (error) {
    return res.send(500).json({ massage: error.massage });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) return res.status(404).send("the course not found");
    try {
      await chef.deleteOne(chef);
      return res.send(chef);
    } catch (error) {
      return res.send(500).json({ massage: error.massage });
    }
  } catch (error) {
    return res.send(500).json({ massage: error.massage });
  }
});

module.exports = router;
