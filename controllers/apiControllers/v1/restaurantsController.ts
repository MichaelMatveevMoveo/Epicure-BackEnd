import { Request, Response } from "express";

import {
  getRestaurants,
  addRestaurant,
  getRestaurantById,
  changeRestaurant,
  changeStatus,
  fullDeleteRestaurantById,
  getRestaurantWithDishesById,
  getRestaurantForChefByHisId,
} from "../../../handlers/apiHandlers/v1/restaurantsHandler";
import mongoose from "mongoose";

export async function getRestaurantsController(req: Request, res: Response) {
  try {
    const restaurants = await getRestaurants();
    return res.json(restaurants);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getRestaurantByIdController(req: Request, res: Response) {
  try {
    const restaurant = await getRestaurantById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (restaurant == null) return res.status(404).send("the chef not found");
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function addRestaurantController(req: Request, res: Response) {
  try {
    const restaurant = await addRestaurant(
      req.body.name,
      req.body.stars,
      req.body.image,
      req.body.chef
    );
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function changeRestaurantController(req: Request, res: Response) {
  try {
    const restaurant = await changeRestaurant(
      new mongoose.Types.ObjectId(req.params.id),
      req.body.name,
      req.body.stars,
      req.body.image,
      req.body.chef
    );
    if (restaurant == null) return res.status(404).send("the chef not found");
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function recoverRestaurantByIdController(
  req: Request,
  res: Response
) {
  try {
    const restaurant = await changeStatus(
      new mongoose.Types.ObjectId(req.params.id),
      true
    );
    if (restaurant == null) return res.status(404).send("the chef not found");
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteRestaurantByIdController(
  req: Request,
  res: Response
) {
  try {
    const restaurant = await changeStatus(
      new mongoose.Types.ObjectId(req.params.id),
      false
    );
    if (restaurant == null) return res.status(404).send("the chef not found");
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function fullDeleteRestaurantByIdController(
  req: Request,
  res: Response
) {
  try {
    const restaurant = await fullDeleteRestaurantById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (restaurant == null) return res.status(404).send("the chef not found");
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getRestaurantWithDishesByIdController(
  req: Request,
  res: Response
) {
  try {
    const restaurant = await getRestaurantWithDishesById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (restaurant == null) return res.status(404).send("the chef not found");
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getRestaurantForChefByHisIdController(
  req: Request,
  res: Response
) {
  try {
    return res.json(
      await getRestaurantForChefByHisId(
        new mongoose.Types.ObjectId(req.params.chefId)
      )
    );
  } catch (error) {
    return res.status(500).send(error);
  }
}
