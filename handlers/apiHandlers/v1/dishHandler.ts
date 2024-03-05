import mongoose from "mongoose";

import Dish from "../../../mongoDB/models/dish";

export async function getDishById(id: mongoose.Types.ObjectId) {
  const dish = await Dish.findById(id);
  return dish;
}

export async function getDishes() {
  const dishes = await Dish.find();
  return dishes;
}

export async function addDish(
  name: string,
  price: number,
  Ingredients: [string],
  tags: [string],
  restaurant: mongoose.Types.ObjectId
) {
  const dish = new Dish({
    name: name,
    price: price,
    Ingredients: Ingredients,
    tags: tags,
    restaurant: restaurant,
  });
  const newDish = await dish.save();
  return newDish;
}

export async function changeDish(
  id: mongoose.Types.ObjectId,
  name: string,
  price: number,
  Ingredients: [string],
  tags: [string],
  restaurant: mongoose.Types.ObjectId
) {
  const dish = await getDishById(id);

  if (dish == null) return null;

  dish.name = name;
  dish.price = price;
  dish.Ingredients = Ingredients;
  dish.tags = tags;
  dish.restaurant = restaurant;

  const updatedDish = await dish.save();
  return updatedDish;
}

export async function deleteDishById(id: mongoose.Types.ObjectId) {
  const dish = await getDishById(id);

  if (dish == null) return null;

  await dish.deleteOne({ _id: dish.id });
  return dish;
}
