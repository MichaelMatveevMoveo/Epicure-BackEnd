import express, { Request, Response } from "express";

const router = express.Router();
import {
  getChefsController,
  addChefController,
  getChefByIdController,
  changeChefController,
  deleteChefByIdController,
} from "../../../controllers/apiControllers/v1/chefsController";

router.get("/", async (req: Request, res: Response) => {
  await getChefsController(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await getChefByIdController(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await addChefController(req, res);
});

router.patch("/:id", async (req: Request, res: Response) => {
  await changeChefController(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteChefByIdController(req, res);
});

module.exports = router;
