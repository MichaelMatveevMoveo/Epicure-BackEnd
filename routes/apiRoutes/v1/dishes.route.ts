import express, { Request, Response } from "express";

const router = express.Router();
import {
  getDishesController,
  addDishController,
  getDishByIdController,
  changeDishController,
  deleteDishByIdController,
} from "../../../controllers/apiControllers/v1/dishController";

router.get("/", async (req: Request, res: Response) => {
  await getDishesController(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getDishByIdController(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await addDishController(req, res);
});

router.patch("/:id", async (req: Request, res: Response) => {
  await changeDishController(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteDishByIdController(req, res);
});

module.exports = router;
