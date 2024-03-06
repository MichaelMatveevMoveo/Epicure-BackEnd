import mongoose from "mongoose";
import Restaurant from "../../../mongoDB/models/restaurant";

export async function getRestaurantById(id: mongoose.Types.ObjectId) {
  const restaurant = await Restaurant.findById(id);
  return restaurant;
}

export async function getRestaurants() {
  const restaurants = await Restaurant.find({ status: "Active" });
  return restaurants;
}

export async function addRestaurant(
  name: string,
  image: string,
  chef: mongoose.Types.ObjectId
) {
  const restaurant = new Restaurant({
    name: name,
    image: image,
    chef: chef,
  });

  const newRestaurant = await restaurant.save();
  return newRestaurant;
}

export async function changeRestaurant(
  id: mongoose.Types.ObjectId,
  name: string,
  image: string,
  chef: mongoose.Types.ObjectId
) {
  const restaurant = await getRestaurantById(id);

  if (restaurant == null) return null;

  restaurant.name = name;
  restaurant.image = image;
  restaurant.chef = chef;

  const updatedRestaurant = await restaurant.save();
  return updatedRestaurant;
}
export async function changeStatus(
  id: mongoose.Types.ObjectId,
  status: string
) {
  const restaurant = await getRestaurantById(id);

  if (restaurant == null) return null;
  restaurant.status = status;
  const updatedRestaurant = await restaurant.save();
  return updatedRestaurant;
}

export async function fullDeleteRestaurantById(id: mongoose.Types.ObjectId) {
  const restaurant = await getRestaurantById(id);

  if (restaurant == null) return null;

  await restaurant.deleteOne({ _id: restaurant.id });
  return restaurant;
}

export async function getRestaurantWithDishesById(id: mongoose.Types.ObjectId) {
  const restaurant = await Restaurant.findById(id).populate("dishes");
  return restaurant;
}

export async function getRestaurantsRejexInName(regex: RegExp) {
  return await Restaurant.find({ name: regex });
}
