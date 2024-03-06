import exppres, { Request, Response } from "express";
import { getChefsRestAndDishStartWithController } from "../../../../controllers/apiControllers/v1/searchController";
const router = exppres.Router();

router.get("/nameStartWith/:start", async (req: Request, res: Response) => {
  console.log(req.params.start);
  await getChefsRestAndDishStartWithController(req, res);
});

module.exports = router;
