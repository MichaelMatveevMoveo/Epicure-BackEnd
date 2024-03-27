import express, { Request, Response } from "express";

const router = express.Router();
import {
  addChefController,
  changeChefController,
  deleteChefByIdController,
} from "../../../../../controllers/apiControllers/v1/chefsController";

import { middlewareCheckChefExistControler } from "../../../../../middlewares/middleware";

/**
 * @openapi
 * /api/v1/admin/chefs:
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
 * /api/v1/admin/chefs/{id}:
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
 * /api/v1/admin/chefs/{id}:
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

module.exports = router;
