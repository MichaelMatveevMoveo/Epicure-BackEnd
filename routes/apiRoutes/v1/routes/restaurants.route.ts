import express, { Request, Response } from "express";
const router = express.Router();
import {
  getRestaurantsController,
  addRestaurantController,
  getRestaurantByIdController,
  changeRestaurantController,
  deleteRestaurantByIdController,
  recoverRestaurantByIdController,
  getRestaurantWithDishesByIdController,
} from "../../../../controllers/apiControllers/v1/restaurantsController";

/**
 * @openapi
 * /api/v1/restaurants:
 *  get:
 *    tags:
 *      - Restaurant
 *    description: Get all the restaurants from the database
 *    responses:
 *      200:
 *        description: All the Restaurants with data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/restaurantSchemaOutPut'
 *      500:
 *        description: Failed to process the query
 */

router.get("/", async (req: Request, res: Response) => {
  await getRestaurantsController(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getRestaurantByIdController(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await addRestaurantController(req, res);
});

router.patch("/:id", async (req: Request, res: Response) => {
  await changeRestaurantController(req, res);
});

router.get("/recover/:id", async (req: Request, res: Response) => {
  await recoverRestaurantByIdController(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteRestaurantByIdController(req, res);
});

router.get("/withDishes/:id", async (req: Request, res: Response) => {
  await getRestaurantWithDishesByIdController(req, res);
});
module.exports = router;
