import exppres, { Request, Response } from "express";
import {
  addUserController,
  // addUserController,
  loginController,
} from "../../../../controllers/apiControllers/v1/usersController";
const router = exppres.Router();

router.post("/addUser", async (req: Request, res: Response) => {
  await addUserController(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  await loginController(req, res);
});

module.exports = router;
