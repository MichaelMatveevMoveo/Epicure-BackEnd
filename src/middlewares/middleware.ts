import { Request, Response, NextFunction } from "express";

import { checkChefExist } from "../handlers/apiHandlers/v1/chefsHandler";
export async function middlewareCheckChefExistControler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!(await checkChefExist(req.params.id))) {
      return res.status(404).send("the chef not found");
    }
    next();
  } catch (error) {
    return res.status(500).send(error);
  }
}
