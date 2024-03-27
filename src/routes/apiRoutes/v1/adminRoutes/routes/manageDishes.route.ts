import express, { Request, Response } from "express";

const router = express.Router();
import {
  addDishController,
  changeDishController,
  deleteDishByIdController,
} from "../../../../../controllers/apiControllers/v1/dishController";

/**
 * @openapi
 * /api/v1/admin/dishes:
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
 * /api/v1/admin/dishes/{id}:
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
 * /api/v1/admin/dishes/{id}:
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

module.exports = router;
