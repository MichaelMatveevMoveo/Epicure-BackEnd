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
  getCollectionSizeController,
  getPartOfItemsController,
  getRestaurantsWithChefNameAndsignatureDishNameController,
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
 *                $ref: '#/components/schemas/restaurantSchema'
 *      500:
 *        description: Failed to process the query
 */

router.get("/", async (req: Request, res: Response) => {
  await getRestaurantsController(req, res);
});

router.get(
  "/chefNameAndsignatureDishName/:offset/:limit",
  async (req: Request, res: Response) => {
    await getRestaurantsWithChefNameAndsignatureDishNameController(req, res);
  }
);

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
 *              $ref: '#/components/schemas/restaurantSchema'
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
 *            $ref: '#/definitions/CreatUpdateRestaurant'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/restaurantSchema'
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
 *              $ref: '#/definitions/CreatUpdateRestaurant'
 *     responses:
 *       200:
 *         description: restaurant found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchema'
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
 *              $ref: '#/components/schemas/restaurantSchema'
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
 *              $ref: '#/components/schemas/restaurantSchema'
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
 *              $ref: '#/definitions/restaurantsWithDishes'
 *       400:
 *         description: restaurant not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/withDishes/:id", async (req: Request, res: Response) => {
  await getRestaurantWithDishesByIdController(req, res);
});

/**
 * @openapi
 * /api/v1/restaurants/restaurantsForChef/{chefId}:
 *   get:
 *     tags:
 *       - Restaurant
 *     summary: Get a restaurants for a chef by his id
 *     parameters:
 *       - name: chefId
 *         in: path
 *         description: The ID of the chef
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: restaurant found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchema'
 *       400:
 *         description: restaurant not found
 *       500:
 *         description: Failed to process the query
 */
router.get(
  "/restaurantsForChef/:chefId",
  async (req: Request, res: Response) => {
    await getRestaurantForChefByHisIdController(req, res);
  }
);
/**
 * @openapi
 * /api/v1/restaurants/popular/returants:
 *   get:
 *     tags:
 *       - Restaurant
 *     summary: Get all the popular resturants
 *     responses:
 *       200:
 *         description: restaurant found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/restaurantSchema'
 *       400:
 *         description: restaurant not found
 *       500:
 *         description: Failed to process the query
 */
router.get("/popular/returants", async (req: Request, res: Response) => {
  await getpopularRestaurantsController(req, res);
});
/**
 * @openapi
 * /api/v1/restaurants/popular/returants/resAndChefName:
 *   get:
 *     tags:
 *       - Restaurant
 *     summary: Get the all the popular returants and the name of the chef of each resturant
 *     responses:
 *       200:
 *         description: Restaurant found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   default: res1
 *                 stars:
 *                   type: number
 *                   default: 0
 *                 image:
 *                   type: string
 *                   default: imageurl
 *                 chef:
 *                   type: string
 *                   default: yossi
 *                 id:
 *                   type: string
 *                   default: 65e9b3dcb63431b6e2e418a2
 *       400:
 *         description: Restaurant not found
 *       500:
 *         description: Failed to process the query
 */

router.get(
  "/popular/returants/resAndChefName",
  async (req: Request, res: Response) => {
    await getpopularRestaurantsNameAndChefController(req, res);
  }
);
/**
 * @openapi
 * /api/v1/restaurants/getSignatureDish/all:
 *   get:
 *     tags:
 *       - Restaurant
 *     summary: get all the signature dishes of all the resturants
 *     responses:
 *       200:
 *         description: Restaurant found
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/dishSchema'
 *       400:
 *         description: Restaurant not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/getSignatureDish/all", async (req: Request, res: Response) => {
  await getSignatureDishAllController(req, res);
});

router.get("/collection/size", async (req: Request, res: Response) => {
  await getCollectionSizeController(req, res);
});

router.get(
  "/getPartOfItems/:offset/:limit",
  async (req: Request, res: Response) => {
    await getPartOfItemsController(req, res);
  }
);
module.exports = router;
