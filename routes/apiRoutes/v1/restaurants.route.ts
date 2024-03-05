import express, { Request, Response } from "express";
const router = express.Router();
const {
  getRestaurants,
  addRestaurant,
  getRestaurantById,
  changeRestaurant,
  deleteRestaurantById,
  addDishToRestaurant,
  RemoveDishFromRestaurant,
} = require("../../../mongoDB/models/restaurant");

router.get("/", async (req: Request, res: Response) => {
  const { restaurants, error } = await getRestaurants();
  if (error != null) return res.status(500).send(error);
  return res.json(restaurants);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { restaurant, error } = await getRestaurantById(req.params.id);
  if (error != null) return res.status(500).send(error);
  if (!restaurant) return res.status(404).send("the chef not found");
  return res.json(restaurant);
});

router.post("/", async (req: Request, res: Response) => {
  const { restaurant, error } = await addRestaurant(
    req.body.name,
    req.body.image,
    req.body.chef,
    req.body.dishes
  );

  if (error != null) return res.status(500).send(error);
  console.log("stam");
  return res.json(restaurant);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { restaurant, error } = await changeRestaurant(
    req.params.id,
    req.body.name,
    req.body.image,
    req.body.chef,
    req.body.dishes
  );
  if (error != null) return res.status(500).send(error);
  if (!restaurant) return res.status(404).send("the chef not found");
  return res.json(restaurant);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { restaurant, error } = await deleteRestaurantById(req.params.id);
  if (error != null) return res.status(500).send(error);
  if (!restaurant) return res.status(404).send("the chef not found");
  return res.json(restaurant);
});

router.get(
  "/addDish/:restaurantId/:dishId",
  async (req: Request, res: Response) => {
    const { restaurant, error } = await addDishToRestaurant(
      req.params.restaurantId,
      req.params.dishId
    );
    if (error != null) return res.status(500).send(error);
    if (!restaurant) return res.status(404).send("the chef not found");
    return res.json(restaurant);
  }
);

router.get(
  "/removeDish/:restaurantId/:dishId",
  async (req: Request, res: Response) => {
    const { restaurant, error } = await RemoveDishFromRestaurant(
      req.params.restaurantId,
      req.params.dishId
    );
    if (error != null) return res.status(404).send(error);
    if (!restaurant) return res.status(404).send("the chef not found");
    return res.json(restaurant);
  }
);

module.exports = router;
