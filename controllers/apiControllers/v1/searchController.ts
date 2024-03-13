import { Request, Response } from "express";

import {
  getChefsRestAndDishStartWith,
  getChefsRestAndDishStartWithagr,
} from "../../../handlers/apiHandlers/v1/searchHandler";

export async function getChefsRestAndDishStartWithController(
  req: Request,
  res: Response
) {
  try {
    res.send(await getChefsRestAndDishStartWithagr(req.params.start));
  } catch (error) {
    res.status(500).send(error);
  }
}
