import express, { Request, Response } from "express";

const router = express.Router();
const Chef = require("../../../mongoDB/models/chef");

router.get("/", async (req: Request, res: Response) => {
  try {
    const chefs = await Chef.find();
    return res.json(chefs);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const chef = await Chef.findById(req.params.id);

    if (!chef) return res.status(404).send("the chef not found");

    return res.send(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const chef = new Chef({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    restaurants: req.body.restaurants,
  });
  try {
    const newChef = await chef.save();
    res.status(201).json(newChef);
  } catch (error) {
    console.log("pa");
    return res.status(400).send(error);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) return res.status(404).send("the course not found");

    if (req.body.name) chef.name = req.body.name;
    if (req.body.image) chef.image = req.body.image;
    if (req.body.description) chef.description = req.body.description;
    if (req.body.restaurants) chef.restaurants = req.body.restaurants;

    try {
      const updatedChef = await chef.save();
      return res.send(updatedChef);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) return res.status(404).send("the course not found");
    try {
      await chef.deleteOne(chef);
      return res.send(chef);
    } catch (error) {
      return res.status(500).send(error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
