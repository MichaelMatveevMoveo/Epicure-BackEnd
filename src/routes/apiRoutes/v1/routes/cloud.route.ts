import exppres, { Request, Response } from "express";
import { getSignatureFromController } from "../../../../controllers/apiControllers/v1/cloudController";

const router = exppres.Router();

router.get("/get-signature", async (req: Request, res: Response) => {
  await getSignatureFromController(req, res);
});
module.exports = router;
