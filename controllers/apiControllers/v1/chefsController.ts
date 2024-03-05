import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  getChefs,
  addChef,
  getChefById,
  changeChef,
  changeStatus,
  fullDeleteChefById,
} from "../../../handlers/apiHandlers/v1/chefsHandler";

export async function getChefsController(req: Request, res: Response) {
  try {
    const chefs = await getChefs();
    return res.json(chefs);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getChefByIdController(req: Request, res: Response) {
  try {
    const chef = await getChefById(new mongoose.Types.ObjectId(req.params.id));
    if (chef == null) return res.status(404).send("the chef not found");
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function addChefController(req: Request, res: Response) {
  try {
    const chef = await addChef(
      req.body.name,
      req.body.image,
      req.body.description
    );

    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function changeChefController(req: Request, res: Response) {
  try {
    const chef = await changeChef(
      new mongoose.Types.ObjectId(req.params.id),
      req.body.name,
      req.body.image,
      req.body.description
    );
    if (chef == null) return res.status(404).send("the chef not found");
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}
export async function recoverChefByIdController(req: Request, res: Response) {
  try {
    const chef = await changeStatus(
      new mongoose.Types.ObjectId(req.params.id),
      "Active"
    );
    if (chef == null) return res.status(404).send("the chef not found");
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteChefByIdController(req: Request, res: Response) {
  try {
    const chef = await changeStatus(
      new mongoose.Types.ObjectId(req.params.id),
      "notActive"
    );
    if (chef == null) return res.status(404).send("the chef not found");
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function fullDeleteChefByIdController(
  req: Request,
  res: Response
) {
  try {
    const chef = await fullDeleteChefById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (chef == null) return res.status(404).send("the chef not found");
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}
