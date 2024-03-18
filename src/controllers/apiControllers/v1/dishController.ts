import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  getDishes,
  addDish,
  getDishById,
  changeDish,
  changeStatus,
  fullDeleteDishById,
  getDishesContainIngredients,
  getCollectionSize,
  getPartOfItems,
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
      req.body.image,
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
      req.body.image,
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

export async function recoverDishByIdController(req: Request, res: Response) {
  try {
    const dish = await changeStatus(
      new mongoose.Types.ObjectId(req.params.id),
      true
    );
    if (dish == null) return res.status(404).send("the chef not found");
    return res.json(dish);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteDishByIdController(req: Request, res: Response) {
  try {
    const dish = await changeStatus(
      new mongoose.Types.ObjectId(req.params.id),
      false
    );
    // if (dish == null) return res.status(404).send("the dish not found");
    return res.json(dish);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function fullDeleteDishByIdController(
  req: Request,
  res: Response
) {
  try {
    const dish = await fullDeleteDishById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (dish == null) return res.status(404).send("the chef not found");
    return res.json(dish);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getDishesContainIngredientsController(
  req: Request,
  res: Response
) {
  try {
    return res.json(await getDishesContainIngredients(req.params.ingredient));
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getCollectionSizeController(req: Request, res: Response) {
  try {
    return res.json(await getCollectionSize());
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getPartOfItemsController(req: Request, res: Response) {
  try {
    return res.json(
      await getPartOfItems(
        parseInt(req.params.offset),
        parseInt(req.params.limit)
      )
    );
  } catch (error) {
    return res.status(500).send(error);
  }
}
