const express = require("express");
const router = express.Router();
const {
  getDishes,
  addDish,
  getDishById,
  changeDish,
  deleteDishById,
} = require("../mongoDB/models/dish");

router.get("/", async (req, res) => {
  const { dishes, error } = await getDishes();
  if (error != null) return res.send(500).json({ massage: error });
  return res.json(dishes);
});

router.get("/:id", async (req, res) => {
  const { dish, error } = await getDishById(req.params.id);
  if (error != null) return res.send(500).json({ massage: error });
  if (!dish) return res.status(404).send("the chef not found");
  return res.json(dish);
});

router.post("/", async (req, res) => {
  const { dish, error } = await addDish(
    req.body.name,
    parseInt(req.body.price),
    req.body.Ingredients,
    req.body.tags,
    req.body.restaurant
  );

  if (error != null) return res.send(500).json({ massage: error });
  console.log("stam");
  return res.json(dish);
});

router.patch("/:id", async (req, res) => {
  const { dish, error } = await changeDish(
    req.params.id,
    req.body.name,
    parseInt(req.body.price),
    req.body.Ingredients,
    req.body.tags,
    req.body.restaurant
  );
  if (error != null) return res.send(500).json({ massage: error });
  if (!dish) return res.status(404).send("the chef not found");
  return res.json(dish);
});

router.delete("/:id", async (req, res) => {
  const { dish, error } = await deleteDishById(req.params.id);
  if (error != null) return res.send(500).json({ massage: error });
  if (!dish) return res.status(404).send("the chef not found");
  return res.json(dish);
});

module.exports = router;
