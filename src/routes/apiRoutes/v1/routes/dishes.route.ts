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
} from "../../../../controllers/apiControllers/v1/dishController";

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
 * /api/v1/dishes:
 *  post:
 *    tags:
 *      - Dish
 *    summary: Add a dish
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/CreatUpdateDish'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/dishSchema'
 *      500:
 *        description: fail to insert
 */

router.post("/", async (req: Request, res: Response) => {
  await addDishController(req, res);
});

/**
 * @openapi
 * /api/v1/dishes/{id}:
 *   patch:
 *     tags:
 *       - Dish
 *     summary: change exist dish using dish id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the dish
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/CreatUpdateDish'
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

router.patch("/:id", async (req: Request, res: Response) => {
  await changeDishController(req, res);
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

/**
 * @openapi
 * /api/v1/dishes/{id}:
 *   delete:
 *     tags:
 *       - Dish
 *     summary: change dish status to not active
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

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteDishByIdController(req, res);
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

module.exports = router;
