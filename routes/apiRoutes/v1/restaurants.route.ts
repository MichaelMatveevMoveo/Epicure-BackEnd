import express, { Request, Response } from "express";
const router = express.Router();
import {
  getRestaurantsController,
  addRestaurantController,
  getRestaurantByIdController,
  changeRestaurantController,
  deleteRestaurantByIdController,
  recoverRestaurantByIdController,
} from "../../../controllers/apiControllers/v1/restaurantsController";

router.get("/", async (req: Request, res: Response) => {
  await getRestaurantsController(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getRestaurantByIdController(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await addRestaurantController(req, res);
});

router.patch("/:id", async (req: Request, res: Response) => {
  await changeRestaurantController(req, res);
});

router.get("/recover/:id", async (req: Request, res: Response) => {
  await recoverRestaurantByIdController(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteRestaurantByIdController(req, res);
});

module.exports = router;
