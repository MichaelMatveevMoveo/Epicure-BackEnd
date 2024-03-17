import express, { Request, Response } from "express";

const router = express.Router();
import {
  getChefsController,
  addChefController,
  getChefByIdController,
  changeChefController,
  deleteChefByIdController,
  recoverChefByIdController,
  getChefWithResturantsController,
  chefWithResturntsAndDishesController,
  allChefsWithResturntsAndDishesController,
  setChefOfWeekController,
  getChefOfWeekController,
} from "../../../../controllers/apiControllers/v1/chefsController";

import { middlewareCheckChefExistControler } from "../../../../middlewares/middleware";
/**
 * @openapi
 * /api/v1/chefs:
 *  get:
 *    tags:
 *      - Chef
 *    description: Get all the chefs from the database
 *    responses:
 *      200:
 *        description: All the chefs with data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/chefSchema'
 *      500:
 *        description: Failed to process the query
 */

router.get("/", async (req: Request, res: Response) => {
  await getChefsController(req, res);
});

/**
 * @openapi
 * /api/v1/chefs/{id}:
 *   get:
 *     tags:
 *       - Chef
 *     summary: Get a Chef by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the chef
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/chefSchema'
 *       400:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */

router.get(
  "/:id",
  middlewareCheckChefExistControler,
  async (req: Request, res: Response) => {
    await getChefByIdController(req, res);
  }
);

/**
 * @openapi
 * /api/v1/chefs:
 *  post:
 *    tags:
 *      - Chef
 *    summary: Add a chef
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/CreatUpdateChef'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/chefSchema'
 *      500:
 *        description: fail to insert
 */
router.post("/", async (req: Request, res: Response) => {
  await addChefController(req, res);
});

/**
 * @openapi
 * /api/v1/chefs/{id}:
 *   patch:
 *     tags:
 *       - Chef
 *     summary: change exist chef using chef id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the chef
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/CreatUpdateChef'
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/chefSchema'
 *       404:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */

router.patch(
  "/:id",
  middlewareCheckChefExistControler,
  async (req: Request, res: Response) => {
    await changeChefController(req, res);
  }
);

/**
 * @openapi
 * /api/v1/chefs/recover/{id}:
 *   get:
 *     tags:
 *       - Chef
 *     summary: change chef status to active
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the chef
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/chefSchema'
 *       404:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */
router.get(
  "/recover/:id",
  middlewareCheckChefExistControler,
  async (req: Request, res: Response) => {
    await recoverChefByIdController(req, res);
  }
);

/**
 * @openapi
 * /api/v1/chefs/{id}:
 *   delete:
 *     tags:
 *       - Chef
 *     summary: change chef status to not active
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the chef
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/chefSchema'
 *       404:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */

router.delete(
  "/:id",
  middlewareCheckChefExistControler,
  async (req: Request, res: Response) => {
    await deleteChefByIdController(req, res);
  }
);

/**
 * @openapi
 * /api/v1/chefs/chefWithResturnts/{id}:
 *   get:
 *     tags:
 *       - Chef
 *     summary: Get a Chef with his returants
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the chef
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/chefWithRestaurants'
 *       400:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */

router.get(
  "/chefWithResturnts/:id",
  middlewareCheckChefExistControler,
  async (req: Request, res: Response) => {
    await getChefWithResturantsController(req, res);
  }
);

/**
 * @openapi
 * /api/v1/chefs/chefWithResturntsAndDishes/{id}:
 *   get:
 *     tags:
 *       - Chef
 *     summary: Get a Chef with his returants and dishes for each resturant
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the chef
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/chefWithRestaurantsWithDishes'
 *       400:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */

router.get(
  "/chefWithResturntsAndDishes/:id",
  middlewareCheckChefExistControler,
  async (req: Request, res: Response) => {
    await chefWithResturntsAndDishesController(req, res);
  }
);

/**
 * @openapi
 * /api/v1/chefs/all/chefWithRestAndDish:
 *   get:
 *     tags:
 *       - Chef
 *     summary: Get a Chef with his returants and dishes for each resturant
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/chefWithRestaurantsWithDishes'
 *       400:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/all/chefWithRestAndDish", async (req: Request, res: Response) => {
  console.log("stam");
  await allChefsWithResturntsAndDishesController(req, res);
});

/**
 * @openapi
 * /api/v1/chefs/set/ChefOfWeek/{id}:
 *   get:
 *     tags:
 *       - Chef
 *     summary: set the chef as chef of the week
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the chef
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/chefSchema'
 *       400:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */

router.get(
  "/set/ChefOfWeek/:id",
  middlewareCheckChefExistControler,
  async (req: Request, res: Response) => {
    await setChefOfWeekController(req, res);
  }
);

/**
 * @openapi
 * /api/v1/chefs/get/chefOfWeek:
 *   get:
 *     tags:
 *       - Chef
 *     summary: Get the chef of the week
 *     responses:
 *       200:
 *         description: Chef found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/chefSchema'
 *       400:
 *         description: Chef not found
 *       500:
 *         description: Failed to process the query
 */

router.get("/get/chefOfWeek", async (req: Request, res: Response) => {
  await getChefOfWeekController(req, res);
});

module.exports = router;
