import exppres, { Request, Response } from "express";
import { getChefsRestAndDishStartWithController } from "../../../../controllers/apiControllers/v1/searchController";
const router = exppres.Router();

/**
 * @openapi
 * /api/v1/search/nameStartWith/{start}:
 *  get:
 *    tags:
 *      - Search
 *    summary: Get all the chefs, restaurants, and dishes starting with the given prefix
 *    parameters:
 *       - name: start
 *         in: path
 *         description: The prefix you want to search for
 *         required: true
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: All the chefs, restaurants, and dishes starting with the given prefix
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                oneOf:
 *                  - $ref: '#/components/schemas/chefSchema'
 *                  - $ref: '#/components/schemas/restaurantSchema'
 *                  - $ref: '#/components/schemas/dishSchema'
 *      500:
 *        description: Failed to process the query
 */

router.get("/nameStartWith/:start", async (req: Request, res: Response) => {
  await getChefsRestAndDishStartWithController(req, res);
});

module.exports = router;
