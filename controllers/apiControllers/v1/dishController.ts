import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  getDishes,
  addDish,
  getDishById,
  changeDish,
  deleteDishById,
} from "../../../handlers/apiHandlers/v1/dishHandler";

export async function getDishesController(req: Request, res: Response) {
  try {
    const dishes = await getDishes();
    return res.json(dishes);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getDishByIdController(req: Request, res: Response) {
  try {
    const dish = await getDishById(new mongoose.Types.ObjectId(req.params.id));
    if (dish == null) return res.status(404).send("the chef not found");
    return res.json(dish);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function addDishController(req: Request, res: Response) {
  try {
    const dish = await addDish(
      req.body.name,
      parseInt(req.body.price),
      req.body.Ingredients,
      req.body.tags,
      req.body.restaurant
    );

    return res.json(dish);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function changeDishController(req: Request, res: Response) {
  try {
    const dish = await changeDish(
      new mongoose.Types.ObjectId(req.params.id),
      req.body.name,
      parseInt(req.body.price),
      req.body.Ingredients,
      req.body.tags,
      req.body.restaurant
    );
    if (dish == null) return res.status(404).send("the chef not found");
    return res.json(dish);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteDishByIdController(req: Request, res: Response) {
  try {
    const dish = await deleteDishById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (dish == null) return res.status(404).send("the chef not found");
    return res.json(dish);
  } catch (error) {
    return res.status(500).send(error);
  }
}
