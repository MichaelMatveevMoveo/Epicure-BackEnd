import exppres, { Request, Response } from "express";
import { getChefsRestAndDishStartWithController } from "../../../../controllers/apiControllers/v1/searchController";
const router = exppres.Router();

/**
 * @openapi
 * /api/v1/search/nameStartWith/{start}:
 *  get:
 *    tags:
 *      - Search
 *    summary: Get all the chefs, resturants and dishes start with the given prefix
 *    parameters:
 *       - name: start
 *         in: path
 *         description: The prefix you want to get for
 *         required: true
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: all the chefs, resturants and dishes start with the given prefix
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                chefs:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/chefSchemaOutPut'
 *                restaurants:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/restaurantSchemaOutPut'
 *                dishes:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/dishSchemaOutPut'
 *
 *      500:
 *        description: Failed to process the query
 */
router.get("/nameStartWith/:start", async (req: Request, res: Response) => {
  console.log(req.params.start);
  await getChefsRestAndDishStartWithController(req, res);
});

module.exports = router;
