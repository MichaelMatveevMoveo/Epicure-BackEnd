import express, { Request, Response } from "express";

const router = express.Router();
import {
  getChefsController,
  addChefController,
  getChefByIdController,
  changeChefController,
  deleteChefByIdController,
  recoverChefByIdController,
  checkChefExistControler,
  getChefWithResturantsController,
  chefWithResturntsAndDishesController,
  allChefsWithResturntsAndDishesController,
} from "../../../../controllers/apiControllers/v1/chefsController";

router.get("/", async (req: Request, res: Response) => {
  await getChefsController(req, res);
});

router.get(
  "/:id",
  checkChefExistControler,
  async (req: Request, res: Response) => {
    await getChefByIdController(req, res);
  }
);

router.post("/", async (req: Request, res: Response) => {
  await addChefController(req, res);
});

router.patch(
  "/:id",
  checkChefExistControler,
  async (req: Request, res: Response) => {
    await changeChefController(req, res);
  }
);

router.get(
  "/recover/:id",
  checkChefExistControler,
  async (req: Request, res: Response) => {
    await recoverChefByIdController(req, res);
  }
);

router.delete(
  "/:id",
  checkChefExistControler,
  async (req: Request, res: Response) => {
    await deleteChefByIdController(req, res);
  }
);

router.get(
  "/chefWithResturnts/:id",
  checkChefExistControler,
  async (req: Request, res: Response) => {
    await getChefWithResturantsController(req, res);
  }
);

router.get(
  "/chefWithResturntsAndDishes/:id",
  checkChefExistControler,
  async (req: Request, res: Response) => {
    await chefWithResturntsAndDishesController(req, res);
  }
);

router.get("/all/chefWithRestAndDish", async (req: Request, res: Response) => {
  console.log("stam");
  await allChefsWithResturntsAndDishesController(req, res);
});

module.exports = router;
