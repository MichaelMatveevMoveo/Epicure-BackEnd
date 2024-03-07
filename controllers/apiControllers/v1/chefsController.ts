import { Request, Response, NextFunction } from "express";

import {
  getChefs,
  addChef,
  getChefById,
  changeExistChef,
  changeStatus,
  fullDeleteChefById,
  checkChefExist,
  getChefWithResturants,
  getChefWithResturantsAgr,
  chefWithResturntsAndDishes,
  chefWithResturntsAndDishesAgr,
  allChefsWithResturntsAndDishes,
  allChefsWithResturntsAndDishesAgr,
} from "../../../handlers/apiHandlers/v1/chefsHandler";

export async function checkChefExistControler(
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
    const chef = await getChefById(req.params.id);
    // if (chef == null) return res.status(404).send("the chef not found");
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
    const chef = await changeExistChef({
      id: req.params.id,
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
    });
    if (chef == null) return res.status(404).send("the chef not found");
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}
export async function recoverChefByIdController(req: Request, res: Response) {
  try {
    const chef = await changeStatus(req.params.id, "Active");
    if (chef == null) return res.status(404).send("the chef not found");
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteChefByIdController(req: Request, res: Response) {
  try {
    const chef = await changeStatus(req.params.id, "notActive");
    // if (chef == null) return res.status(404).send("the chef not found");
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
    const chef = await fullDeleteChefById(req.params.id);
    // if (chef == null) return res.status(404).send("the chef not found");
    return res.json(chef);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getChefWithResturantsController(
  req: Request,
  res: Response
) {
  try {
    const chefWithResturant = await getChefWithResturantsAgr(req.params.id);
    // const chefWithResturant = await getChefWithResturants(req.params.id);
    return res.json(chefWithResturant);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function chefWithResturntsAndDishesController(
  req: Request,
  res: Response
) {
  try {
    res.json(await chefWithResturntsAndDishesAgr(req.params.id));
    // res.json(await chefWithResturntsAndDishes(req.params.id));
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function allChefsWithResturntsAndDishesController(
  req: Request,
  res: Response
) {
  try {
    res.json(await allChefsWithResturntsAndDishesAgr());
    // res.json(await allChefsWithResturntsAndDishes());
  } catch (error) {
    return res.status(500).send(error);
  }
}
