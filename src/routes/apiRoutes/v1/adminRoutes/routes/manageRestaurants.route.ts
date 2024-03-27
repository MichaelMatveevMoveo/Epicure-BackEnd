import express, { Request, Response } from "express";
const router = express.Router();
import {
  addRestaurantController,
  changeRestaurantController,
  deleteRestaurantByIdController,
} from "../../../../../controllers/apiControllers/v1/restaurantsController";

/**
 * @openapi
 * /api/v1/admin/restaurants:
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
 * /api/v1/admin/restaurants/{id}:
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
 * /api/v1/admin/restaurants/{id}:
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

module.exports = router;
