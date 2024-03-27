import express, { Request, Response } from "express";

const router = express.Router();
import {
  getDishesController,
  addDishController,
  getDishByIdController,
  changeDishController,
  deleteDishByIdController,
  recoverDishByIdController,
  getDishesContainIngredientsController,
  getCollectionSizeController,
  getPartOfItemsController,
  getDishesWithRestaurantNameController,
  getDishesForRestaurantController,
} from "../../../../controllers/apiControllers/v1/dishController";
import { middlewareCheckTokenJWT } from "../../../../middlewares/authorization.middleware";

/**
 * @openapi
 * /api/v1/dishes:
 *  get:
 *    tags:
 *      - Dish
 *    description: Get all the dishes from the database
 *    responses:
 *      200:
 *        description: All the dishes with data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/dishSchema'
 *      500:
 *        description: Failed to process the query
 */
router.get("/", async (req: Request, res: Response) => {
  await getDishesController(req, res);
});

router.get(
  "/dishesWithRestaurantName/:offset/:limit",
  async (req: Request, res: Response) => {
    await getDishesWithRestaurantNameController(req, res);
  }
);
/**
 * @openapi
 * /api/v1/dishes/{id}:
 *   get:
 *     tags:
 *       - Dish
 *     summary: Get a dish by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the dish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: dish found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/dishSchema'
 *       400:
 *         description: dish not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/:id", async (req: Request, res: Response) => {
  await getDishByIdController(req, res);
});

/**
 * @openapi
 * /api/v1/dishes/recover/{id}:
 *   get:
 *     tags:
 *       - Dish
 *     summary: change dish status to active
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the dish
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: dish found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/dishSchema'
 *       404:
 *         description: dish not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/recover/:id", async (req: Request, res: Response) => {
  await recoverDishByIdController(req, res);
});

router.get(
  "/getname/containingredient/:ingredient",
  async (req: Request, res: Response) => {
    await getDishesContainIngredientsController(req, res);
  }
);
router.get("/collection/size", async (req: Request, res: Response) => {
  await getCollectionSizeController(req, res);
});

router.get(
  "/getPartOfItems/:offset/:limit",
  async (req: Request, res: Response) => {
    await getPartOfItemsController(req, res);
  }
);

router.get("/forRestaurant/:restId", async (req: Request, res: Response) => {
  await getDishesForRestaurantController(req, res);
});
module.exports = router;
