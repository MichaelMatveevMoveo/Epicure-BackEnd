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
  getRestaurantForChefByHisIdController,
  getpopularRestaurantsController,
  getpopularRestaurantsNameAndChefController,
  getSignatureDishAllController,
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

/**
 * @openapi
 * /api/v1/restaurants/{id}:
 *   get:
 *     tags:
 *       - Restaurant
 *     summary: Get a restaurant by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the restaurant
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: restaurant found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchemaOutPut'
 *       400:
 *         description: restaurant not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/:id", async (req: Request, res: Response) => {
  await getRestaurantByIdController(req, res);
});

/**
 * @openapi
 * /api/v1/restaurants:
 *  post:
 *    tags:
 *      - Restaurant
 *    summary: Add a restaurant
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/restaurantSchemaInPut'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/restaurantSchemaOutPut'
 *      500:
 *        description: fail to insert
 */

router.post("/", async (req: Request, res: Response) => {
  await addRestaurantController(req, res);
});

/**
 * @openapi
 * /api/v1/restaurants/{id}:
 *   patch:
 *     tags:
 *       - Restaurant
 *     summary: change exist restaurant using restaurant id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the restaurant
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchemaInPut'
 *     responses:
 *       200:
 *         description: restaurant found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchemaOutPut'
 *       404:
 *         description: restaurant not found
 *       500:
 *         description: Failed to process the query
 */

router.patch("/:id", async (req: Request, res: Response) => {
  await changeRestaurantController(req, res);
});

/**
 * @openapi
 * /api/v1/restaurants/recover/{id}:
 *   get:
 *     tags:
 *       - Restaurant
 *     summary: change restaurant status to active
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the restaurant
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: restaurant found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchemaOutPut'
 *       404:
 *         description: restaurant not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/recover/:id", async (req: Request, res: Response) => {
  await recoverRestaurantByIdController(req, res);
});

/**
 * @openapi
 * /api/v1/restaurants/{id}:
 *   delete:
 *     tags:
 *       - Restaurant
 *     summary: change restaurant status to not active
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the restaurant
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: restaurant found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchemaOutPut'
 *       404:
 *         description: restaurant not found
 *       500:
 *         description: Failed to process the query
 */

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteRestaurantByIdController(req, res);
});

/**
 * @openapi
 * /api/v1/restaurants/withDishes/{id}:
 *   get:
 *     tags:
 *       - Restaurant
 *     summary: Get a restaurant with his dishes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the restaurant
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: restaurant found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchemaOutPut'
 *       400:
 *         description: restaurant not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/withDishes/:id", async (req: Request, res: Response) => {
  await getRestaurantWithDishesByIdController(req, res);
});

router.get(
  "/restaurantsForChef/:chefId",
  async (req: Request, res: Response) => {
    await getRestaurantForChefByHisIdController(req, res);
  }
);

router.get("/popular/returants", async (req: Request, res: Response) => {
  await getpopularRestaurantsController(req, res);
});

router.get(
  "/popular/returants/resAndChefName",
  async (req: Request, res: Response) => {
    await getpopularRestaurantsNameAndChefController(req, res);
  }
);

router.get("/getSignatureDish/all", async (req: Request, res: Response) => {
  await getSignatureDishAllController(req, res);
});
module.exports = router;
