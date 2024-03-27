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
  getDishesWithRestaurantName,
  getDishesForRestaurant,
} from "../../../handlers/apiHandlers/v1/dishHandler";
import {
  checkImageCorrect,
  getUrlForImage,
} from "../../../handlers/apiHandlers/v1/cloudHandler";

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
    if (
      !(await checkImageCorrect(
        req.body.image,
        req.body.version,
        req.body.signature
      ))
    ) {
      return res.status(400).send("bad image upload data");
    }
    const dish = await addDish(
      req.body.name,
      parseInt(req.body.price),
      getUrlForImage(req.body.image),
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
      getUrlForImage(req.body.image),
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

export async function getDishesWithRestaurantNameController(
  req: Request,
  res: Response
) {
  try {
    return res.json(
      await getDishesWithRestaurantName(
        parseInt(req.params.offset),
        parseInt(req.params.limit)
      )
    );
  } catch (error) {
    return res.status(500).send(error);
  }
}
getDishesForRestaurantController;

export async function getDishesForRestaurantController(
  req: Request,
  res: Response
) {
  try {
    return res.json(await getDishesForRestaurant(req.params.restId));
  } catch (error) {
    return res.status(500).send(error);
  }
}
