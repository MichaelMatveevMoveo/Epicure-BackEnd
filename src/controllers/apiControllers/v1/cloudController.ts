import { Request, Response } from "express";
import { getSignatureFrom } from "../../../handlers/apiHandlers/v1/cloudHandler";

export async function getSignatureFromController(req: Request, res: Response) {
  try {
    res.json(await getSignatureFrom());
  } catch (error) {
    return res.status(500).send(error);
  }
}
